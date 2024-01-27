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

    <header>
      <div class="container px-5 py-3 h-100 d-flex justify-content-between ">

        <!-- immagine del logo che porta alla home -->
        <div class="h-100">
          <router-link to="/">
            <img class="h-100" src="/logoristo.png" alt="logoristo">
          </router-link>
        </div>

        <!-- nav menu per login e carrello -->
        <ul class="d-flex align-items-center">
          <li>
            <a :href="store.loginUrl">
              <div class="user"></div>
            </a>
          </li>
          <li>
            <router-link to="/cart">
              <!-- <i class="fa-solid fa-cart-shopping"></i> -->
              <div class="position-relative">
                <router-link to="/cart"><div class="cart"></div></router-link>
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
  height: 80px;
  width: 100%;
  background-color: #F23005;

  ul {
    gap: 60px;
    .cart{
      color: #F2F0E4;
      font-size: 1.8rem;
      background-image: url(./cart.png);
      background-size: cover;
      height: 40px;
      width: 40px;
    }
    .user{
      color: #F2F0E4;
      background-image: url(./user.png);
      background-size: cover;
      height: 40px;
      width: 40px;
      &:hover{
        color: #A63921;
      }
    }
    .cart-quantity {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #F2F0E4;
      color: black;
      position: absolute;
      z-index: -1;
      top: -13px;
      right: 9px;
      border: 1px solid black;
    }
  }

}

</style>

