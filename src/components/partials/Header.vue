<script>
import { store } from '../../data/store';

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

    <div class="container">
      <div class="row d-flex justify-content-between">

        <div class="col-2 d-flex align-items-center">
          <img src="/logoristo.png" alt="logoristo">
        </div>

        <div class="col-2 d-flex justify-content-between">
          <div>
            <a :href="store.loginUrl"><i class="fa-solid fa-user"></i></a>
          </div>            
          <div class="position-relative">
            <router-link to="/cart"><i class="fa-solid fa-cart-shopping mx-3"></i></router-link>
            <div v-if="totalQuantity > 0" class="cart-quantity"><span>{{ totalQuantity }}</span></div>
        
          </div>
        </div>

      </div>
    </div>

  </header>
  
</template>

<style lang="scss" scoped>

  header {
    position: fixed;
    width: 100%;
    background-color: orange;
    height: 70px;
    z-index: 99;
    .col-2{
      line-height: 70px;
        img{
        height: 50px;
      }
        .fa-solid{
          color: black;
          font-size: 1.5rem;
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

