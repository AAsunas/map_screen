import $ from "jquery";
import icon from "../../assets/building2.png";
import icon2 from "../../assets/blue.png";
//移动点
import myplanImg from '../../assets/stars.png';
/**
 * 添加报警动画-扫描动画
 * @param {*} map
 * @param {*} object3Dlayer
 * @param {*} WarnMeshes 同步存放Mesh的数组
 * @param {*} coordinate [lng, lat]
 * @param {*} WarnId 元素id
 */
export function addWarning(map,object3Dlayer,WarnMeshes,coordinate,WarnId) {
    let radar;
    let buildRadar = function () {
        radar = new AMap.Object3D.Mesh();
        WarnMeshes.push(radar);
        radar.transparent = true;
        radar.backOrFront = 'front';
        radar.WarnId = WarnId; // 自定义一个id用于删除它

        let geometry = radar.geometry;
        let radius = 50; // 米
        radius = radius / map.getResolution(coordinate, 20);
        let unit = 1;
        let range = 400;// 弧度运动时包含的范围
        let count = range / unit;

        for (let i = 0; i < count; i += 1) {
            let angle1 = i * unit * Math.PI / 180;
            let angle2 = (i + 1) * unit * Math.PI / 180;

            let p1x = Math.cos(angle1) * radius;
            let p1y = Math.sin(angle1) * radius;
            let p2x = Math.cos(angle2) * radius;
            let p2y = Math.sin(angle2) * radius;

            geometry.vertices.push(0, 0, 0);
            geometry.vertices.push(p1x, p1y, 0);
            geometry.vertices.push(p2x, p2y, 0);

            let opacityStart = getOpacity(i / count);
            let opacityEnd = getOpacity((i + 1) / count);

            geometry.vertexColors.push(189/255, 30/255, 30/255, opacityStart);
            geometry.vertexColors.push(189/255, 30/255, 30/255, opacityStart);
            geometry.vertexColors.push(189/255, 30/255, 30/255, opacityEnd);
        }
        radar.position(coordinate);
        object3Dlayer.add(radar);
    };
    function getOpacity(scale) {
        return 1 - Math.pow(scale, 0.3);
    }
    function scan() {
        radar.rotateZ(-2);
        AMap.Util.requestAnimFrame(scan);
    }
    buildRadar();
    scan();
}

/**
 * 移除报警动画
 * @param {*} object3Dlayer 
 * @param {*} WarnMeshes 记录报警元素数组
 * @param {*} WarnId 报警元素id
 */
export function removeWarning(object3Dlayer,WarnMeshes,WarnId) {
    WarnMeshes.find( mesh => {
        if(mesh.WarnId === WarnId){
            object3Dlayer.remove(mesh);
            WarnMeshes.splice($.inArray(mesh,WarnMeshes),1);
        }
    });
}

//---------------------------------geoJson start----------------------------------------
/**
 * 添加geoJson ---- Mesh类型
 * @param {*} map 
 * @param {*} object3Dlayer 
 * @param {*} buildJsonMeshes 记录数组
 * @param {*} buildJson 
 */
export function addBaseMesh(map,object3Dlayer,buildJsonMeshes,buildJson){
    let meshes = [];
    let topColor = [57/255, 221/255, 240/255, 0.5];
    let bottomColor = [22/255, 62/255, 62/255, 0.9];
    // 加载geojson数据
    buildJson.features.forEach(item => {
        item.geometry.coordinates.forEach( path => {
            //console.log(path.length);
            let bounds = path.map(function (p) {
                return new AMap.LngLat(p[0], p[1]);
            });
            // 创建 Object3D.Mesh 对象
            let mesh = new AMap.Object3D.Mesh();
            mesh.glValue = item; // 绑定数据
            mesh.glUpdataValue = path; // 高亮所需数据
            meshes.push(mesh);
            let geometry = mesh.geometry;

            mesh.textures.push(icon); // 贴图纹理

            let vertices = geometry.vertices;
            let vertexColors = geometry.vertexColors;
            let faces = geometry.faces;
            let vertexLength = bounds.length * 2;
            let verArr = [];
    
            // 设置侧面
            bounds.forEach((lngLat, index) => {
                let g20 = map.lngLatToGeodeticCoord(lngLat);
                verArr.push([g20.x, g20.y]);
                // 构建顶点-底面顶点
                vertices.push(g20.x, g20.y, 0);
                // 构建顶点-顶面顶点
                vertices.push(g20.x, g20.y, -item.properties.height);
    
                // 设置底面顶点颜色
                vertexColors.push.apply(vertexColors, bottomColor);
                // 设置顶面顶点颜色
                vertexColors.push.apply(vertexColors, topColor);
    
                // 设置三角形面
                let bottomIndex = index * 2;
                let topIndex = bottomIndex + 1; 
                let nextBottomIndex = (bottomIndex + 2) % vertexLength;
                let nextTopIndex = (bottomIndex + 3) % vertexLength; 
                //侧面三角形1
                faces.push(bottomIndex, topIndex, nextTopIndex);
                //侧面三角形2
                faces.push(bottomIndex, nextTopIndex, nextBottomIndex);

                // 设置纹理顶点
                geometry.vertexUVs.push(0, 1);
                geometry.vertexUVs.push(0, 0);
                geometry.vertexUVs.push(1, 1);
                geometry.vertexUVs.push(1, 0);
            });
            // 设置顶面，根据顶点拆分三角形（有瑕疵）
            let triangles = AMap.GeometryUtil.triangulateShape(verArr);
            for (let v = 0; v < triangles.length; v += 3) {
                let a = triangles[v];
                let b = triangles[v + 2];
                let c = triangles[v + 1];
                
                faces.push(a * 2 + 1, b * 2 + 1, c * 2 + 1);
            }

            // 构建顶面三角形,为了区分顶面点和侧面点使用不一样的颜色,所以需要独立的顶点(未完全渲染)
            // for (var i = 0; i < bounds.length; i += 1) {
            //     vertices.push.apply(vertices, vertices.slice(i * 6 + 3, i * 6 + 6)); //底部顶点
            //     vertexColors.push.apply(vertexColors, topColor);
            // }

            // var triangles = AMap.GeometryUtil.triangulateShape(verArr);
            // var offset = bounds.length * 2;
            // for (var v = 0; v < triangles.length; v += 3) {
            //     faces.push(triangles[v] + offset, triangles[v + 2] + offset, triangles[v + 1] + offset);
            // }

            // 开启透明度支持
            mesh.transparent = true;
            // 显示正反面
            mesh.backOrFront = 'both';
            // 添加至 3D 图层
            object3Dlayer.add(mesh);
            buildJsonMeshes.push(mesh);
        });
    })
}

/**
 * 高亮添加选中描边 ---- Mesh类型
 * @param {*} map 地图
 * @param {*} obj 被选中Mesh(可选，不传为重置清空)
 */
let polygonArr = [];// 存选中的Mesh对象
export function updateMeshLine(map,obj) {
    polygonArr.forEach(item=>{
        map.remove(item);
    })
    if(obj){
        let polygon = new AMap.Polygon({
            path: obj.glValue.geometry.coordinates,
            strokeColor: "#ffffff", 
            strokeWeight: 4,
            strokeOpacity: 1,
            fillOpacity: 0,
            fillColor: '#1791fc',
            zIndex: 50
        })
        map.add(polygon);
        polygonArr.push(polygon);
    }
}

/**
 * 添加geoJson ---- Prism类型
 * @param {*} object3Dlayer 
 * @param {*} buildJsonMeshes 存建筑数组
 * @param {*} buildJson 
 */
export function addBasePrism(object3Dlayer,buildJsonMeshes,buildJson){
    buildJson.features.forEach( item => {   
        item.geometry.coordinates.forEach( paths => {
            let bounds = paths.map(function(path) {
                return new AMap.LngLat(path[0], path[1]);
            });
            // 创建 Object3D 对象
            let prism = new AMap.Object3D.Prism({
                path: bounds,
                height: item.properties.height,
                color: 'rgba(32, 150, 212, 0.8)' // 支持 #RRGGBB、rgb()、rgba() 格式数据
            });
            prism.glValue = item;
            prism.transparent = true;
            object3Dlayer.add(prism);
            buildJsonMeshes.push(prism);
        });
    })
}

/**
 * geoJson高亮 ---- Prism类型
 * @param {*} buildJsonMeshes 
 * @param {*} obj 
 */
export function updateMesh(buildJsonMeshes,obj) {
    let color = [32 / 255, 150 / 255, 212 / 255, 0.8];
    let selectColor = [57 / 255, 211 / 255, 240 / 255, 1];
    let mesh = buildJsonMeshes.find(function (mesh) {
        return mesh == obj;
    });

    console.log(mesh);
    // 重置 Mesh 颜色
    buildJsonMeshes.forEach(function (mesh) {
        updateMeshColor(mesh, color);
    });

    // 更新选中 Mesh 的 vertexColors
    if (mesh) {
        updateMeshColor(mesh, selectColor);
    }

}

/**
 * 更新高亮 ---- Prism类型
 * @param {*} mesh buildJsonMeshes装载Prism的数组
 * @param {*} color 
 */
function updateMeshColor(mesh, color) {
    let vertexColors = mesh.geometry.vertexColors;
    let len = vertexColors.length;
    for (let i = 0; i < len / 4; i++) {
        let r = color[0];
        let g = color[1];
        let b = color[2];
        let a = color[3];
        // 不能重新赋值，只允许修改内容
        vertexColors.splice(i * 4, 4, r, g, b, a);
    }

    mesh.needUpdate = true;
    mesh.reDraw();
}

/**
 * 重置Mesh颜色，外部使用 ---- Prism类型
 * @param {*} buildJsonMeshes 
 */
export function resetMesh(buildJsonMeshes) {
    let color = [32 / 255, 150 / 255, 212 / 255, 0.8];
    buildJsonMeshes.forEach(function (mesh) {
        updateMeshColor(mesh, color);
    });
}

/**
 * 添加geoJson ---- Prism类型 电子围栏
 * @param {*} object3Dlayer 
 * @param {*} buildJson 
 */
export function addEleFence(object3Dlayer,buildJson){
    buildJson.features.forEach( item => {   
        item.geometry.coordinates.forEach( paths => {
            let bounds = paths.map(function(path) {
                return new AMap.LngLat(path[0], path[1]);
            });
            let prism = new AMap.Object3D.Prism({
                path: bounds,
                height: item.properties.height,
                color: 'rgba(72, 203, 195, 0.8)'
            });
            prism.transparent = true;
            object3Dlayer.add(prism);
        });
    })
}

//---------------------------------geoJson end----------------------------------------

/**
 * 切点，描绘轨道路径
 * @param {*} path 经纬度数组
 * @param {*} splitNumber 每两个经纬度之间的分割点
 * 返回重绘的经纬度坐标数组
 */
export function analysisPath (path,splitNumber) {
    let tempPath = path.concat();
    let pathResults = [];
    let tempPoint = [0, 0];
    if (tempPath.length > 1) {
        for (let i = 0; i < tempPath.length - 1; i++) { // 每两个点之间分割出splitNumber个点
            pathResults.push(tempPath[i]);
            for (let j = 0; j < splitNumber; j++) {
                tempPoint[0] = (tempPath[i + 1][0] - tempPath[i ][0]) * (j + 1) / splitNumber + tempPath[i][0];
                tempPoint[1] = (tempPath[i + 1][1] - tempPath[i ][1]) * (j + 1) / splitNumber + tempPath[i][1];
                pathResults.push(tempPoint.concat());
            };
        };
        pathResults.push(tempPath[tempPath.length - 1]);
        return pathResults.concat();
    };
};

/**
 * 添加轨迹动画
 * @param {*} path 经纬度数组
 * @param {*} map 地图实例
 * @param {*} splitNumber 每两个经纬度之间的分割点
 * @param {*} setIntervalTime 移动点间隔时间
 */
export function addLineMarks(path,map,splitNumber,setIntervalTime) {
    // 到时候可以通过传入的颜色在这里判断对应用哪个图片
    let pointArr = analysisPath(path,splitNumber);
    let pathIndex = pointArr.length - 1;//路径点索引

    // 创建一个 Icon
    let startIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(20, 20),
        // 图标的取图地址
        image: myplanImg,
        // 图标所用图片大小
        imageSize: new AMap.Size(20, 20),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(0, 0)
    });

    // 将 icon 传入 marker
    let startMarker = new AMap.Marker({
        position: new AMap.LngLat(116.35,39.89),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
    });

    map.add(startMarker);

    // 执行动画
    map.on("complete", function(){
        //log.success("地图加载完成！");  
        setInterval(() => {
            if (pathIndex === -1) {
                pathIndex = pointArr.length - 1;
            };
            startMarker.setPosition(pointArr[pathIndex]);// 只有Overlay有这个方法
            pathIndex--;
        }, setIntervalTime);
    });



    //5秒后移除动画
    // setTimeout(()=>{
    //     map.removeOverlay(marker);
    // },5000)
};







