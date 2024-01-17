<script>

import axios from 'axios';
import { store } from '../data/store'; 
import Main from '../components/Main.vue';
import SearchByTypologies from '../components/partials/SearchByTypologies.vue';

export default{
name: 'detailRestaurant'
}
</script>

<template>
  <section>
    <h1>dettaglio ristorante e menu</h1>
  </section>

</template>

<style lang="scss" scoped>
  section{
    margin-top: 70px;
    height: 793px;
    h1{
      text-align: center;
    }
  }
</style>