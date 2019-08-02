import Vue from "vue";
import Router from "vue-router";
import KanBan from "@/views/KanBan";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "KanBan",
      component: KanBan
    }
  ]
});
