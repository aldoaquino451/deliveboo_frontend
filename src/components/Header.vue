<script>
import { store } from '../data/store';

export default{
  name: 'Header',
  components: {
  },

  data() {
    return {
      store
    }
  },

  computed: {
    totalQuantity() {
      return store.cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
    }
  }

}
</script>

<template>

  <header class="py-3">
    <div class="container h-100 d-flex justify-content-between">

      <!-- immagine del logo che porta alla home -->
      <div>
        <router-link to="/">
          <img class="h-100" src="/logoristo.png" alt="logoristo">
        </router-link>
      </div>

      <!-- nav menu per login e carrello -->
      <ul class="d-flex align-items-center">
        <li>
          <a :href="store.loginUrl">
            <i class="fa-solid fa-user"></i>
          </a>
        </li>
        <li>
          <router-link to="/cart">
            <!-- <i class="fa-solid fa-cart-shopping"></i> -->
            <div class="position-relative">
              <router-link to="/cart"><i class="fa-solid fa-cart-shopping mx-3"></i></router-link>
              <div v-if="totalQuantity > 0" class="cart-quantity"><span>{{ totalQuantity }}</span></div>
            </div>
          </router-link>
        </li>
      </ul>

    </div>
  </header>
  
</template>

<style lang="scss" scoped>

header {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 80px;
  background-color: orange;

  ul {
    gap: 60px;
    i{
      color: black;
      font-size: 1.8rem;
      &:hover{
        color: white;
      }
    }
    .cart-quantity {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      color: white;
      position: absolute;
      top: 8px;
      left: 0;
    }
  }

}

</style>

