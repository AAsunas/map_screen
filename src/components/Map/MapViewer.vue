<template>
    <div class="glMap">
        <div id="container"></div>
        <!--楼层标签-->
        <label-marker ref="labelMarkerRef"></label-marker>
        <!--楼层图表-->
        <label-icon ref="labelIconRef"></label-icon>
        <!--楼层窗体信息-->
        <build-layer ref="buildLayerRef"></build-layer>
        <!--marks图层-->
        <!-- <markers ref="markersRef"></markers> -->
    </div>
</template>
<script>
import $ from "jquery";
import { 
    //addWarning,
    //removeWarning,
    addBaseMesh,
    //addBasePrism,
    //updateMesh,
    //resetMesh,
    updateMeshLine,
    addLineMarks,
    addEleFence
} from "./until.js";
import buildJson from "./map.json"; //社区geoJson
import lineJson from "./map_line.json"; //电子围栏geoJson
import labelMarker from "@/components/Map/labelMarker"; //楼层标签
import labelIcon from "@/components/Map/labelMarkerIcon"; //楼层图表
import buildLayer from "@/components/Map/buildInfoWindow"; //楼层窗体信息
import markers from "@/components/Map/markers"; //marks
export default {
    name: 'MapViewer',
    data () {
        return {
            map: null,
            object3Dlayer: null,
            point:[103.879174,30.533251],
            WarnMeshes:[],
            buildJsonMeshes:[],
            labelPoint:[
                {
                    name:'XX小区',
                    point:[103.881529,30.533194]
                },{
                    name:'XX小区',
                    point:[103.880231,30.533739]
                },{
                    name:'XX小区',
                    point:[103.8786,30.533989]
                },{
                    name:'Xx小区',
                    point:[103.876991,30.534783]
                },{
                    name:'XX小区',
                    point:[103.876068,30.532824]
                },
            ],
            obj2: {
				id: 2,
				lon: 103.87904,
				lat: 30.533559
            },
            splitNumber: 80, // 每两个经纬度之间的分割点
            setIntervalTime: 15, // 移动点间隔时间
            points:[
                [103.877429,30.533811],
                [103.876975,30.532745],
                [103.8788,30.532142],
                [103.879263,30.533231],
                [103.877429,30.533811]
            ],
            getObject: null, // 避免同个obj更新方法多次触发
        }
    },
    components: { 
        labelMarker,
        labelIcon,
        buildLayer,
        markers
    },
    created(){},
    mounted(){
        this.initMap();
    },
    methods:{
        initMap() {
            this.map = new AMap.Map('container', {
                resizeEnable: true,  //是否监控地图容器尺寸变化
                rotateEnable:true, // 是否旋转
                pitchEnable:true, // 是否倾斜
                showLabel: false,
                zoom: 17.7,
                pitch: 70,
                rotation: 20,
                viewMode:'3D',//开启3D视图,默认为关闭
                showBuildingBlock: true,
                buildingAnimation:false,//楼块出现是否带动画
                expandZoomRange:true,
                zooms:[4,20],
                center:[103.878256,30.53485],
                mapStyle: 'amap://styles/52c9fcbcdfc6ca1edfbf856435c9a618', //设置地图的显示样式
            });

            this.$store.dispatch('setMapAction', this.map);

            // 光照
            this.map.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 0.5); // 环境光源
            this.map.DirectionLight = new AMap.Lights.DirectionLight([-1, -1, 2], [1, 1, 1], 0.5); // 平行光源

            // 添加3d图层对象
            this.object3Dlayer = new AMap.Object3DLayer();
            this.map.add(this.object3Dlayer);

            // 添加geojson(Mesh类)
            addBaseMesh(this.map, this.object3Dlayer, this.buildJsonMeshes, buildJson);
            //addBasePrism(this.object3Dlayer,buildJson,2,this.buildJsonMeshes);
            //addEleFence(this.object3Dlayer,lineJson);

            // 添加楼层标签以及楼层图标动画
            //this.$refs.labelMarkerRef.addLabelMarker(this.labelPoint);
            //this.$refs.labelIconRef.addLabelMarkerIcon(this.labelPoint);

            // 展示markers
            //this.$refs.markersRef.addMarkers('fireHydrant',this.hydrantPointArr);
            //this.$refs.markersRef.addMarkers('smoke',this.smokePointArr);
            //this.$refs.markersRef.addMarkers('camera',this.cameraPointArr);

            

            // 鼠标移动事件
            //let getObject; // 避免同个obj更新方法多次触发
            this.map.on('mousemove', (ev) => {
                // 小区层级展示楼层高亮
                //this.objHighLight(ev);
            });
            
            // 鼠标点击事件
            this.map.on('click', (e) => {
                console.log(e.lnglat.lng+","+e.lnglat.lat);
                // console.log(this.map.getCenter(),123);
            });

            // this.map.on('zoomchange', (e) => {
            //     console.log(this.map.getZoom());
            // });

            // 添加告警，传参避免状态清理(扫描动画)
            //addWarning(this.map,this.object3Dlayer,this.WarnMeshes,this.point,2);

            // 添加轨迹
            //addLineMarks(this.points,this.map,this.splitNumber,this.setIntervalTime);

            // 添加Canvas图层
            //this.addCanvas();
            //this.addWarmPoint(this.obj2,true);
        },
        // 楼层高亮
        objHighLight(ev) {
            let pixel = ev.pixel;
            let px = new AMap.Pixel(pixel.x, pixel.y);
            let obj = this.map.getObject3DByContainerPos(px, [this.object3Dlayer], false) || {};
            // 选中的 object3D 对象，这里为当前 Mesh
            let object = obj.object;
            if(object !== undefined && object.glValue){
                if(object !== this.getObject){
                    this.getObject = object;
                    //楼层高亮
                    updateMeshLine(this.map,object);
                    //updateMesh(this.buildJsonMeshes,object);
                    let obj = {};
                    obj.name = object.glValue.properties.name;
                    obj.point = object.glValue.geometry.coordinates[0][2];
                    //楼层窗体信息
                    this.$refs.buildLayerRef.openInfoWindow(obj);
                }
            } else {
                if(this.getObject !== undefined) {
                    this.getObject = undefined;
                    //resetMesh(this.buildJsonMeshes);
                    updateMeshLine(this.map);
                    this.map.clearInfoWindow();
                }
            }
        },
        // 已经被提出来了
        addLabelPoint(labelPoint){
            labelPoint.forEach(item=>{
                let position = new AMap.LngLat(item.point[0],item.point[1]);
                let marker = new AMap.Marker({
                    position: position,
                    content: createInfoWindow(item.name),
                    // 以 icon 的 [center bottom] 为原点
                    offset: new AMap.Pixel(-33, -30)
                });
                this.map.add(marker);
            })
            function createInfoWindow(name){
                let info = document.createElement("div");
                info.className = "gl-label";
                let content = document.createElement("div");
                content.className = "label-content";
                content.innerHTML = `<img src="${icon}" />${name}`;
                //closeX.onclick = closeInfoWindow;
                info.appendChild(content);
                return info;
            }

            //关闭信息窗体
            function closeInfoWindow() {
               console.log(123123);
            }
        },
        // 没使用，光源扩散
        addWarmPoint(obj,boolean){
            if(boolean) {
                let position = new AMap.LngLat(103.87904,30.533559);
                let marker = new AMap.Marker({
                    position: position,
                    content: warnBox(obj.id),
                    offset: new AMap.Pixel(-13, -30)
                });
                this.map.add(marker);

                function warnBox(id){
                    let marks = document.createElement("div");
                    marks.className = "marks";
                    marks.setAttribute('id', 'mark' + id);
                    let dot = document.createElement("div");  
                    dot.className = "dot";
                    let light = document.createElement("div");  
                    light.className = "light";
                    let light1 = document.createElement("div");  
                    light1.className = "light1";
                    marks.appendChild(dot);
                    marks.appendChild(light);
                    marks.appendChild(light1);
                    return marks;
                }
			} else {
				let element = document.getElementById('mark'+obj.id);
				document.getElementById('container').removeChild(element);
			};
        },
        // 没使用，圆形扩散
        addCanvas() {
            let canvas = document.createElement('canvas');
            canvas.width = canvas.height = 200;

            let context = canvas.getContext('2d')
            context.fillStyle = 'rgb(224,18,18)';
            //context.strokeStyle = 'white';
            context.globalAlpha = 1;
            //context.lineWidth = 2;

            let radious = 0;
            let draw = function () {
                context.clearRect(0, 0, 200, 200)
                context.globalAlpha = (context.globalAlpha - 0.01 + 1) % 1;
                radious = (radious + 1) % 100;

                context.beginPath();
                context.arc(100, 100, radious, 0, 2 * Math.PI);
                context.fill();
                context.stroke();

                //2D视图时可以省略
                CanvasLayer.reFresh();

                AMap.Util.requestAnimFrame(draw);
            };

            let CanvasLayer = new AMap.CanvasLayer({
                canvas: canvas,
                bounds: new AMap.Bounds(
                    [103.878999,30.533162], //左下
                    [103.879805,30.533505]  //右上
                ),
                zooms: [3, 19],
            });

            AMap.event.addDomListener(canvas, 'click', function(e){
                console.log(e,123123);
            });

            CanvasLayer.setMap(this.map);
            draw();
        }
    }
}
</script>

<style lang="scss">
.glMap {
    width: 100%;
    height: 100%;
    position: relative;
    #container { 
        margin: 0;
        padding: 0;
        width:100%; 
        height: 100%; 
    } 
    .marks {
        position: relative;
        width: 80px;
        height: 80px;
        -ms-transform:rotateX(-70deg); 
        -moz-transform:rotateX(-70deg); 
        -webkit-transform:rotateX(-70deg); 
        -o-transform:rotateX(-70deg); 
        transform:rotateX(-70deg);
        .dot {
            position: absolute;
            width: 18px;
            height: 18px;
            left: 31px;
            top: 28px;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border: 2px solid red;
            border-radius: 50%;
            z-index: 2;
        }
        .light {
            position: absolute;
            width: 80px;
            height: 80px;
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
            width: 80px;
            height: 80px;
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

@keyframes warn {
    0% {
        transform: scale(0.3);
        -webkit-transform: scale(0.3);
        opacity: 0.0;
    }
    25% {
        transform: scale(0.4);
        -webkit-transform: scale(0.4);
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
        transform: scale(0.4);
        -webkit-transform: scale(0.4);
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
</style>