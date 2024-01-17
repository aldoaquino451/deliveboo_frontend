import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import DetailRestaurant from "./pages/DetailRestaurant.vue";

const router =  createRouter ({
  history:createWebHistory(),
  // linkExactActiveClass: 'active',
  routes:[
    {
      path:"/",
      name:"home",
      component: Home
    },
    {
      path:"/detail-restaurant",
      name:"detailRestaurant",
      component: DetailRestaurant
    }
  ]
});

export {router}