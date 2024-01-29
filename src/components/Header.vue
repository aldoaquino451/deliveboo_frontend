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
      <div class="container h-100 d-flex justify-content-between align-items-center">

        <!-- immagine del logo che porta alla home -->
        <div class="h-75">
          <router-link to="/">
            <img class="h-100" src="/logoristo.png" alt="logoristo">
          </router-link>
        </div>

          <span class="logo-text">Deliveoo</span>

        <!-- nav menu per login e carrello -->
        <ul class="d-flex align-items-center h-100">
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
  z-index: 999;
  height: 100px;
  width: 100%;
  background-color: #F23005;
  .logo-text{
    font-family: "Lobster", sans-serif;
    color: #F2F0E4;
    font-size: 4rem;
  }
  ul {
    gap: 30px;
    .cart{
      color: #F2F0E4;
      font-size: 1.8rem;
      background-image: url(./cart.png);
      background-size: cover;
      height: 50px;
      width: 50px;
    }
    .user{
      color: #F2F0E4;
      background-image: url(./user.png);
      background-size: cover;
      height: 50px;
      width: 50px;
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

