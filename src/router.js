import { createRouter, createWebHistory } from "vue-router";
import Cart from "./pages/Cart.vue";
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
      path:"/detail-restaurant/:slug",
      name:"detailRestaurant",
      component: DetailRestaurant
    },
    {
      path:"/cart",
      name:"cart",
      component: Cart
    }
  ]
});

export {router}