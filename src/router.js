import { createRouter, createWebHistory } from "vue-router";
import Cart from "./pages/Cart.vue";
import Home from "./pages/Home.vue";
import Payment from "./pages/Payment.vue";
import DetailRestaurant from "./pages/DetailRestaurant.vue";
import PostPayment from "./pages/PostPayment.vue";
import Braintree from "./pages/Braintree.vue";

const router = createRouter({
  history: createWebHistory(),
  // linkExactActiveClass: 'active',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/detail-restaurant/:slug",
      name: "detailRestaurant",
      component: DetailRestaurant
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment
    },
    {
      path: "/postpayment",
      name: "postpayment",
      component: PostPayment
    },
    {
      path: "/braintree",
      name: "braintree",
      component: Braintree
    }
  ]
});

export { router }