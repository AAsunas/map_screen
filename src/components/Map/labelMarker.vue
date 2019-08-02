<template>

</template>

<script>
import { mapGetters } from 'vuex';
import icon from "../../assets/point.png";
export default {
    name: 'labelMarker',
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'map'
        ])
    },
    methods:{
        addLabelMarker(labelObj){
            labelObj.forEach(item=>{
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
                info.appendChild(content);
                return info;
            }
        },
    }
};
</script>

<style lang="scss">
.gl-label {
    position: relative;
    width: 110px;
    height: 20px;
    line-height: 20px;
    background-color: #000;
    -moz-border-radius: 4px; 
    -webkit-border-radius: 4px; 
    border-radius: 4px;
    .label-content {
        color: #fff;
        font-size: 12px;
        img {
            width: 15px;
            position: relative;
            top: 2px;
            right:5px;
        }
    }
}
</style>