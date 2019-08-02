<template>
    <div class="markers-btn-box">
        <el-button @click="addMarkers('hydrant')">1</el-button>
        <el-button @click="addMarkers('smoke')">2</el-button>
        <el-button @click="addMarkers('camera')">3</el-button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import fireHydrant from "../../assets/markers/fire_hydrant.png";
import smoke from "../../assets/markers/smoke.png";
import camera from "../../assets/markers/camera.png";
export default {
    name: 'markers',
    data () {
        return {
            markerArr:[],
            hydrantState: true,
            smokeState: true,
            cameraState: true,
            hydrantPointArr: [
                {
                    id:1,
                    point:[103.877358,30.53315]
                },{
                    id:2,
                    point:[103.877358,30.53315]
                },{
                    id:3,
                    point:[103.878283,30.534525]
                },{
                    id:4,
                    point:[103.879244,30.533191]
                },{
                    id:5,
                    point:[103.880074,30.532603]
                },{
                    id:6,
                    point:[103.882005,30.533051]
                }
            ],
            smokePointArr: [
                {
                    id:1,
                    point:[103.876681,30.533018]
                },{
                    id:2,
                    point:[103.877181,30.534373]
                },{
                    id:3,
                    point:[103.87894,30.532754]
                },{
                    id:4,
                    point:[103.879522,30.534231]
                }
            ],
            cameraPointArr: [
                {
                    id:1,
                    point:[103.875758,30.532382]
                },{
                    id:2,
                    point:[103.879355,30.532301]
                }
            ],
        }
    },
    computed: {
        ...mapGetters([
            'map'
        ])
    },
    methods:{
        addMarkers(type){
            if(type === 'hydrant') {
                if(this.hydrantState){
                    let pointArr = this.hydrantPointArr;
                    this.addMarkersFun(fireHydrant,pointArr,'hydrant');
                } else {
                    this.removeMarkersFun('hydrant');
                }
                this.hydrantState = !this.hydrantState;
            } else if(type === 'smoke') {
                if(this.smokeState){
                    let pointArr = this.smokePointArr;
                    this.addMarkersFun(smoke,pointArr,'smoke');
                } else {
                    this.removeMarkersFun('smoke');
                }
                this.smokeState = !this.smokeState;
            } else if(type === 'camera') {
                if(this.cameraState){
                    let pointArr = this.cameraPointArr;
                    this.addMarkersFun(camera,pointArr,'camera');
                } else {
                    this.removeMarkersFun('camera');
                }
                this.cameraState = !this.cameraState;
            }
        },
        addMarkersFun(icon,pointArr,type) {
            // axios请求，获取数据赋值给pointArr
            let markerIcon = new AMap.Icon({
                size: new AMap.Size(28, 28),
                image: icon,
                imageSize: new AMap.Size(28, 28),
                imageOffset: new AMap.Pixel(0, 0)
            }); 
            for (let i = 0; i < pointArr.length; i++) {
                let marker = new AMap.Marker({
                    position: pointArr[i].point,
                    icon: markerIcon,
                    offset: new AMap.Pixel(-14, -28),
                    extData:{
                        id: type + pointArr[i].id,
                        type: type
                    }
                });
                this.map.add(marker);
                this.markerArr.push(marker);
            }
        },
        removeMarkersFun(type) {
            for (let i = 0; i < this.markerArr.length; i++) {
                if (this.markerArr[i].B.extData.type === type) {
                    this.map.remove(this.markerArr[i]);
                    this.markerArr.splice(i, 1); // 将使后面的元素依次前移，数组长度减1
                    i--; // 如果不减，将漏掉一个元素
            　　}
            }
        },
        addMarkers2(type,pointArr){
            let size,image,imageSize;
            if(type === 'fireHydrant') {
                size = new AMap.Size(28, 28);
                image = fireHydrant;
                imageSize = new AMap.Size(28, 28);
            } else if(type === 'smoke') {
                size = new AMap.Size(20, 20);
                image = smoke;
                imageSize = new AMap.Size(20, 20);
            } else if(type === 'camera') {
                size = new AMap.Size(40, 40);
                image = camera;
                imageSize = new AMap.Size(40, 40);
            };
            let markerIcon = new AMap.Icon({
                size: size,
                image: image,
                imageSize: imageSize,
                imageOffset: new AMap.Pixel(0, 0)
            }); 
            for (let i = 0; i < pointArr.length; i++) {
                let marker = new AMap.Marker({
                    position: pointArr[i],
                    icon: markerIcon,
                    offset: new AMap.Pixel(-14, -28)
                });
                this.map.add(marker);
                
                // marker.content = '我是第' + (i + 1) + '个Marker';
                // marker.on('click', markerClick);
                //marker.emit('click', {target: marker});
            }
            // let _this = this;
            // function markerClick(e) {
            //     console.log(e);
            //     infoWindow2.setContent(e.target.content);
            //     infoWindow2.open(_this.map, e.target.getPosition());
            // }
        },
    }
};
</script>

<style lang="scss">
.markers-btn-box {
    width: 300px;
    height: 50px;
    background-color: #fff;
    position: absolute;
    bottom: 20px;
    right: 50px;
    z-index: 999;
}
</style>