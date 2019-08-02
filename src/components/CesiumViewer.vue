<template>
  <div class="hs-container">
    <div id="cesiumContainer" class="cesium-container"></div>
  </div>
</template>

<script>
import buildJson from "./map.json";
import buildBlue from "../assets/blue.png";
// import buildTimg from "../assets/timg.gif";

import { Message } from 'element-ui';

export default {
	name: "CesiumViewer",
	data() {
		return {
      viewer: null,
      handler: null,
			neighborhoodEntities: [], //geojson建筑实体
			obj1: {
				id: 1,
				lon: 103.87393802404404,
				lat: 30.535983511101197
			},
			obj2: {
				id: 2,
				lon: 103.87711241841316,
				lat: 30.536470965051556
			}
		};
	},
	mounted() {
		this.initViewer();

	},
	methods: {
		initViewer(){
			this.viewer = new Cesium.Viewer("cesiumContainer", {
				animation: false, //是否显示动画控件(左下方那个)
				baseLayerPicker: false, //是否显示图层选择控件
				geocoder: false, //是否显示地名查找控件
				timeline: false, //是否显示时间线控件
				sceneModePicker: false, //是否显示投影方式控件
				navigationHelpButton: false, //是否显示帮助信息控件
				infoBox: true, //是否显示点击要素之后显示的信息
				selectionIndicator: true,
				shouldAnimate: false,
				fullscreenElement: null,
				useDefaultRenderLoop: true,
				shadows: true,
				homeButton: false,
				fullscreenButton: false,
				navigationInstructionsInitiallyVisible: false
			});
      this.viewer.scene.screenSpaceCameraController.enableZoom = false;
      
    // 定位代码
    // this.viewer.scene.camera.setView({
    //   destination: new Cesium.Cartesian3(
    //     -1318107.649600353,
    //     5338235.686519714,
    //     3221760.758279676
    //   ), // 设置位置
    //   orientation: {
    //     direction: {
    //       x: -0.7649294054953575,
    //       y: -0.6312986209051047,
    //       z: -0.1278477839144345
    //     },
    //     up: {
    //       x: -0.5995055778748438,
    //       y: 0.6252078837147208,
    //       z: 0.4997080790200513
    //     }
    //     // heading: 0.12405363360777198, // 方向
    //     // pitch: -0.5582823615183614, // 倾斜角度
    //     // roll: 0.00045174795656711605
    //   }
    // });





			this.viewer.scene.camera.setView({
				destination: new Cesium.Cartesian3.fromDegrees(
					103.87550316283786,
					30.53038829315113,
					400
				), // 设置位置
				orientation: {
					heading: 0.12405363360777198, // 方向
					pitch: -0.5582823615183614, // 倾斜角度
					roll: 0.00045174795656711605
				}
			});
			// 屏蔽双击放大事件
			this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
			this.viewer._cesiumWidget._creditContainer.style.display = "none";

			//this.$store.commit("app/setViewer", this.viewer);


			// 底图风格,图层模式，会与引入图层发生覆盖
			let layer = new Cesium.MapboxImageryProvider({
				mapId: 'mapbox.dark',
				//accessToken: 'mapbox的token'
			});
			this.viewer.imageryLayers.addImageryProvider(layer);

			// 引入geoJson数据
			this.addBuildGeoJson();
			//this.addMarks(this.obj1,true);
			this.addMarks(this.obj2,true);

			// 点击获取实体事件
			this.viewer.screenSpaceEventHandler.setInputAction(e=> {
				//获取经纬度
				let position = this.viewer.scene.pickPosition(e.position);
				if (!position) {
					position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
				}
				let cartographic = Cesium.Cartographic.fromCartesian(position);
				let longitudeCache = Cesium.Math.toDegrees(cartographic.longitude);
				let latitudeCache = Cesium.Math.toDegrees(cartographic.latitude);
				console.log(longitudeCache,latitudeCache);
				//获取实体对象
				let pickedFeature = this.viewer.scene.pick(e.position);
				console.log(pickedFeature);
				//鼠标是否点到建筑实体上
				if (typeof (pickedFeature) != "undefined" && pickedFeature.id.type === "build") {
					let nameid = pickedFeature.id.nameID;  //获取每条线的nameID
					this.entityHighlight(nameid,false)
				} else {
					this.entityHighlight('undefined',true); //点击空白处取消高亮
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


			// 添加实体gif图，只能取到第一针
			// this.viewer.entities.add({
			// 	id: '01', // 删除通过改id值
			// 	nameID : '类型',
			// 	labelSubscription : 'obj',
			// 	position : new Cesium.Cartesian3.fromDegrees(103.8789197348079,30.539729274969886,10),
			// 	billboard :{
			// 		image : buildTimg,
			// 		width:30,
			// 		height:30,        
			// 	}
			// });



			// 添加折线
	// 		this.viewer.entities.add({
	// 			polyline: {
	// 				positions: [
	// 					{x: -1318578.201788493,y: 5337755.763772959,z: 3221860.942404748},
	// 					{x: -1318555.7698153225,y: 5337832.608572095,z: 3221746.2541028666},
	// 					{x: -1318720.6187198947,y: 5337821.136669358,z: 3221697.458404089},
	// 					{x: -1318748.1411430095,y: 5337747.9864558475,z: 3221807.1989723523},
	// 					{x: -1318577.923299939,y: 5337759.572412842,z: 3221857.498295629},
	// 				],
	// 				material : new Cesium.PolylineGlowMaterialProperty({
	// 					glowPower : 0.3,
	// 					color : new Cesium.Color(0.37, 0.019, 0.603,0.9) 
	//                 }),
	// 				clampToGround: true,
	// 				width: 10
	// 			}
	// 		});
		},
		drawLine() {
			// 绘制线条
			let _this = this;
			var PolyLinePrimitive = (function(){
				function _(positions){
					this.options = {
						polyline : {
							show : true,
							positions : [],
							material : Cesium.Color.CORNFLOWERBLUE,
							width : 5
						}
					};
					this.positions = positions;
					this._init();
				}
				_.prototype._init = function(){
					var _self = this;
					var _update = function(){
						return _self.positions;
					};
					//实时更新polyline.positions
					this.options.polyline.positions = new Cesium.CallbackProperty(_update,false);
					_this.viewer.entities.add(this.options);
				};
				return _;
			})();

			var handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
			var positions = [];
			var poly = undefined;

			handler.setInputAction(movement=>{
				var cartesian = this.viewer.scene.camera.pickEllipsoid(movement.position,this.viewer.scene.globe.ellipsoid);
				if(positions.length == 0) {
					positions.push(cartesian.clone());
				}
				positions.push(cartesian);
				console.log(positions);
			},Cesium.ScreenSpaceEventType.LEFT_CLICK);
			
			handler.setInputAction(movement=>{
				var cartesian = this.viewer.scene.camera.pickEllipsoid(movement.endPosition,this.viewer.scene.globe.ellipsoid);
				if(positions.length >= 2){
					if (!Cesium.defined(poly)) {
						poly = new PolyLinePrimitive(positions);
					}else{
						positions.pop();
						cartesian.y += (1 + Math.random());
						positions.push(cartesian);
					}
				}
			},Cesium.ScreenSpaceEventType.MOUSE_MOVE);
			
			handler.setInputAction(function(movement){
				handler.destroy();
			},Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
		},
		addBuildGeoJson(){
			let neighborhoodsPromise = Cesium.GeoJsonDataSource.load(buildJson);
			//let neighborhoods;
			neighborhoodsPromise.then(dataSource => {
				this.viewer.dataSources.add(dataSource); //向地图加载要素
				//neighborhoods = dataSource.entities; //获取要素中的实体，给实体一定的高度
				this.neighborhoodEntities = dataSource.entities.values;// 实体数组
				for (let i = 0; i < this.neighborhoodEntities.length; i++) {
					let entity = this.neighborhoodEntities[i];
					if (Cesium.defined(entity.polygon)) {
						entity.name = entity.properties.neighborhood; // 实体名称
						entity.nameID = i;
						entity.type = 'build'; // 类型
						entity.polygon.outline = false; // 描边
						entity.polygon.material = new Cesium.ImageMaterialProperty({ //材质
							image: buildBlue,
							repeat : new Cesium.Cartesian2(1, 1),
							transparent: true
						});
						// Tells the polygon to color the terrain. 
						entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN; //地形
						// Polygon定位
						let polyPositions = entity.polygon.hierarchy.getValue(
							Cesium.JulianDate.now()
						).positions; //获取当前时间的一个位置消息
						let polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center; //获得一个中心区域
						polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
						entity.position = polyCenter;
						entity.polygon.extrudedHeight = entity.properties.height;
					}
				}
			});
		},
		entityHighlight(nameid,boolean) {
			for (let o = 0; o < this.neighborhoodEntities.length; o++) {
				let m = this.neighborhoodEntities[o];
				if (nameid == o) {
					m.polygon.material = new Cesium.ImageMaterialProperty({ //材质
						image: buildBlue,
						repeat : new Cesium.Cartesian2(1, 1),
						transparent: boolean
					});                    
				} else {
					m.polygon.material = new Cesium.ImageMaterialProperty({ //材质
						image: buildBlue,
						repeat : new Cesium.Cartesian2(1, 1),
						transparent: true
					});  
				} 
			}
		},
		//wms服务
		addWms(){
			let wmsImageryProvider = new Cesium.WebMapServiceImageryProvider({
				url: "http://192.168.1.107:8999/geoserver/test/wms",
				layers: "test:sl_Resample",
				parameters: {
					transparent: true, //是否透明
					format: "image/jpeg",
					srs: "EPSG:4326",
					styles: ""
				}
			});
			this.viewer.imageryLayers.addImageryProvider(wmsImageryProvider);
		},
		addMarks(obj,boolean){
			if(boolean) {
				let _this = this;
				let marksBox = document.createElement("div");  
				marksBox.className = "marks-box";  
				marksBox.setAttribute('id', 'mark' + obj.id);
				let marks = document.createElement("div");
				marks.className = "marks";
				let dot = document.createElement("div");  
				dot.className = "dot";
				let light = document.createElement("div");  
				light.className = "light";
				let light1 = document.createElement("div");  
				light1.className = "light1";
				marks.appendChild(dot);
				marks.appendChild(light);
				marks.appendChild(light1);
				marksBox.appendChild(marks);
				document.getElementById('container').appendChild(marksBox);
				let scratch = new Cesium.Cartesian2(); // 一个 2d 笛卡尔 点
				let moveFun = function(){
					let position = Cesium.Cartesian3.fromDegrees(obj.lon,obj.lat,0); // 返回经纬度
					let canvasPosition = _this.viewer.scene.cartesianToCanvasCoordinates(position, scratch);
					if (Cesium.defined(canvasPosition)) {
						marksBox.style.top = canvasPosition.y + 'px';
						marksBox.style.left = canvasPosition.x + 'px';
					};
				};
				this.viewer.scene.postRender.removeEventListener(moveFun);
              	this.viewer.scene.postRender.addEventListener(moveFun);
			} else {
				let element = document.getElementById('mark'+obj.id);
				document.getElementById('container').removeChild(element);
			};
    },
    debugClickPoint() {
      this.handler = new Cesium.ScreenSpaceEventHandler(
        this.viewer.scene.canvas
      );
      this.handler.setInputAction(e => {
        const pickedCartesian2 = new Cesium.Cartesian2(
          e.position.x,
          e.position.y
        );
        const pickedCartesian3 = this.viewer.scene.globe.pick(
          this.viewer.camera.getPickRay(pickedCartesian2),
          this.viewer.scene
        );
        const cartographic = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(
          pickedCartesian3
        );
        const lat = Cesium.Math.toDegrees(cartographic.latitude);
        const lng = Cesium.Math.toDegrees(cartographic.longitude);
        const alt = cartographic.height;
        Message({
          dangerouslyUseHTMLString: true,
          message: `
        <div>屏幕坐标:${pickedCartesian2}</div>
        <div>世界坐标:${pickedCartesian3}</div>
        <div>笛卡尔坐标:${cartographic}</div>
        <div>纬度:${lat},经度:${lng},高度:${alt}</div>`,
          type: "accent",
          duration: 10000
        });
        console.log(this.viewer.camera);
        //   let position = {
        //     x: -1318725.9450423017,
        //     y: 5338411.327927177,
        //     z: 3221419.019637628
        //   };
        //   console.log(position);
        //   if (!position) {
        //     position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
        //   }
        //   let cartographic = Cesium.Cartographic.fromCartesian(position);
        //   let longitudeCache = Cesium.Math.toDegrees(cartographic.longitude); // 存全局，切换选项会被清空
        //   let latitudeCache = Cesium.Math.toDegrees(cartographic.latitude);
        //   console.log(longitudeCache, latitudeCache);
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
	}
};
</script>


<style lang="scss">
.cesium-container {
  display: flex;
  flex: 1 1 100%;
  height: 100vh;
}
.hs-container {
	@keyframes warn {
		0% {
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
			opacity: 0.0;
		}
		25% {
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
			opacity: 0.1;
		}
		50% {
			transform: scale(0.5);
			-webkit-transform: scale(0.5);
			opacity: 0.3;
		}
		75% {
			transform: scale(0.8);
			-webkit-transform: scale(0.8);
			opacity: 0.5;
		}
		100% {
			transform: scale(1);
			-webkit-transform: scale(1);
			opacity: 0.0;
		}
	}
	@keyframes warn1 {
		0% {
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
			opacity: 0.0;
		}
		25% {
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
			opacity: 0.1;
		}
		50% {
			transform: scale(0.3);
			-webkit-transform: scale(0.3);
			opacity: 0.3;
		}
		75% {
			transform: scale(0.5);
			-webkit-transform: scale(0.5);
			opacity: 0.5;
		}
		100% {
			transform: scale(0.8);
			-webkit-transform: scale(0.8);
			opacity: 0.0;
		}
	}
	.marks-box {
		position: absolute;
		.marks {
			position: relative;
			width: 60px;
			height: 60px;
			-ms-transform:rotateX(-70deg); 
            -moz-transform:rotateX(-70deg); 
            -webkit-transform:rotateX(-70deg); 
            -o-transform:rotateX(-70deg); 
            transform:rotateX(-70deg);
			.dot {
				position: absolute;
				width: 16px;
				height: 16px;
				left: 23px;
				top: 23px;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border: 2px solid red;
				border-radius: 50%;
				z-index: 2;
			}
			.light {
				position: absolute;
				width: 60px;
				height: 60px;
				left: 0;
				top: 0;
				border: 3px solid red;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				z-index: 1;
				opacity: 0;
				-webkit-animation: warn 2s ease-out;
				-moz-animation: warn 2s ease-out;
				animation: warn 2s ease-out;
				-webkit-animation-iteration-count: infinite;
				-moz-animation-iteration-count: infinite;
				animation-iteration-count: infinite;
				box-shadow: 1px 1px 30px red;
			}
			.light1 {
				position: absolute;
				width: 60px;
				height: 60px;
				left: 0;
				top: 0;
				border: 3px solid red;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				z-index: 1;
				opacity: 0;
				-webkit-animation: warn1 2s ease-out;
				-moz-animation: warn1 2s ease-out;
				animation: warn1 2s ease-out;
				-webkit-animation-iteration-count: infinite;
				-moz-animation-iteration-count: infinite;
				animation-iteration-count: infinite;
				box-shadow: 1px 1px 30px red;
			}
		}
	}
}
</style>
