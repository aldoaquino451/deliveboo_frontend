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
          <div>
            <router-link to="/cart"><i class="fa-solid fa-cart-shopping"></i></router-link>
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
    }

  }

</style>

