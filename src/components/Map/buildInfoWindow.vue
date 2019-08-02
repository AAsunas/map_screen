<template>

</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'buildInfoWindow',
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'map'
        ])
    },
    methods:{
        openInfoWindow(obj) {
            let infoWindow = new AMap.InfoWindow({
                isCustom: true,  //使用自定义窗体
                content: createInfoWindow(),
                offset: new AMap.Pixel(16, -30)
            });
            function createInfoWindow() {
                let info = document.createElement("div");
                info.className = "gl-info-box";
                let con = document.createElement("div");
                con.className = "gl-con";
                con.innerHTML = `<div>${obj.name}</div><div>${obj.point}</div>`;
                info.appendChild(con);
                var bottom = document.createElement("div");
                bottom.className = "info-bottom";
                info.appendChild(bottom);
                return info;
            }
            infoWindow.open(this.map, obj.point);
        }
    }
};
</script>

<style lang="scss">
.gl-info-box {
    //width: 100px;
    .gl-con {
        width: 100%;
        padding: 5px 15px;
        background-color: #000;
        -moz-border-radius: 4px; 
        -webkit-border-radius: 4px; 
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
        opacity: 0.7
    }
    .info-bottom {
        margin: 0 auto;
        width: 0; 
        height: 0;
        border-width: 8px;
        border-style: solid;
        border-color:#000 transparent transparent transparent;
        opacity: 0.7
    }
}
</style>