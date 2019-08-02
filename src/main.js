import "normalize.css/normalize.css";
import "./icons";

import Element from "element-ui";

import "./styles/element-variables.scss";
import "@/styles/index.scss";

import Cesium from "cesium/Cesium";
import "cesium/Widgets/widgets.css";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import VueAxios from 'vue-axios';
import service from '@/utils/request';

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

window.Cesium = Cesium;

Vue.config.productionTip = false;

Vue.use(VueAxios, service);

Vue.use(Element, {
  size: "medium" // set element-ui default size
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
