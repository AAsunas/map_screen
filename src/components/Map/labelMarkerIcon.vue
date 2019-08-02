<template>
    <div>
    <!-- <div class="gl-label-point">
        <div class="top"><img src="../../assets/point/img_1.png" /></div>
        <div class="top-circle"><img src="../../assets/point/img_2.png" /></div>
        <div class="center"><img src="../../assets/point/img_0.png" /></div>
        <div class="bottom">
            <div class="bottom-mark">
                <div class="dot"></div>
                <div class="light"></div>
                <div class="light1"></div>
            </div>
        </div>
    </div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon0 from "../../assets/point/img_0.png";
import icon1 from "../../assets/point/img_1.png";
import icon2 from "../../assets/point/img_2.png";
export default {
    name: 'labelMarkerIcon',
    data () {
        return {}
    },
    computed: {
        ...mapGetters([
            'map'
        ])
    },
    methods:{
        addLabelMarkerIcon(labelObj){
            labelObj.forEach(item=>{
                let position = new AMap.LngLat(item.point[0],item.point[1]);
                let marker = new AMap.Marker({
                    position: position,
                    content: createInfoWindow(),
                    // 以 icon 的 [center bottom] 为原点
                    offset: new AMap.Pixel(-60, -30)
                });
                this.map.add(marker);
            })
            function createInfoWindow(){
                let icon = document.createElement("div");
                icon.className = "gl-label-point";

                let top = document.createElement("div");
                top.className = "top";
                top.innerHTML = `<img src="${icon1}" />`;

                let topCircle = document.createElement("div");
                topCircle.className = "top-circle";
                topCircle.innerHTML = `<img src="${icon2}" />`;

                let center = document.createElement("div");
                center.className = "center";
                center.innerHTML = `<img src="${icon0}" />`;

                let bottom = document.createElement("div");
                bottom.className = "bottom";
                let bottomMark = document.createElement("div");
                bottomMark.className = "bottom-mark";
                bottom.appendChild(bottomMark);

                let dot = document.createElement("div");
                dot.className = "dot";
                let light = document.createElement("div");
                light.className = "light";
                let light1 = document.createElement("div");
                light1.className = "light1";
                bottomMark.appendChild(dot);
                bottomMark.appendChild(light);
                bottomMark.appendChild(light1);

                icon.appendChild(top);
                icon.appendChild(topCircle);
                icon.appendChild(center);
                icon.appendChild(bottom);
                return icon;
            }
        },
    }
};
</script>

<style lang="scss">
.gl-label-point {
    position: relative;
    .top {
        width: 22px;
        img {
            width: 100%;
        }
    }
    .top-circle {
        width: 22px;
        height: 22px;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: topCircle 10s linear infinite;
        -moz-animation: topCircle 10s linear infinite;
        animation: topCircle 10s linear infinite;
        img {
            width: 100%;
        }
    }
    .center {
        width: 22px;
        position: absolute;
        top: 0;
        left: 0;
        img {
            width: 100%;
        }
    }
    .bottom {
        position: absolute;
        top: 23px;
        left: -28px;
        .bottom-mark {
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
                border: 2px solid #00ffff;
                border-radius: 50%;
                z-index: 2;
            }
            .light {
                position: absolute;
                width: 80px;
                height: 80px;
                left: 0;
                top: 0;
                border: 3px solid #00ffff;
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
                box-shadow: 1px 1px 30px #00ffff;
            }
            .light1 {
                position: absolute;
                width: 80px;
                height: 80px;
                left: 0;
                top: 0;
                border: 3px solid #00ffff;
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
                box-shadow: 1px 1px 30px #00ffff;
            }
        }
    }
}
@keyframes topCircle{
    0%{-webkit-transform:rotate(0deg);}

    25%{-webkit-transform:rotate(90deg);}

    50%{-webkit-transform:rotate(180deg);}

    75%{-webkit-transform:rotate(270deg);}

    100%{-webkit-transform:rotate(360deg);}
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