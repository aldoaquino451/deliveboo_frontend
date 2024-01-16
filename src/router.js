import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";

const router =  createRouter ({
  history:createWebHistory(),
  // linkExactActiveClass: 'active',
  routes:[
    {
      path:"/",
      name:"home",
      component: Home
    }
  ]
});

export {router}