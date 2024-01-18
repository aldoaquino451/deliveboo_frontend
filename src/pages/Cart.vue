<script>

import { store } from '../data/store';

export default {
  name: 'Cart',

  data() {
    return {
      cart:[],
    }
  },
}
</script>

<template>
  <section class="d-flex flex-column justify-content-between">
    <h1>CARRELLO</h1>
    <router-link to="/"><i class="fa-solid fa-house"></i></router-link>
  </section>
</template>

<style lang="scss" scoped>
  section{
    margin-top: 70px;
    height: 300px;
    text-align: center;
    i{
      font-size: 2rem;
      color: black;
    }
  }
</style>