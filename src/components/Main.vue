<script>
import { RouterLink } from 'vue-router';
import { store } from '../data/store';
import RestaurantCard from './partials/RestaurantCard.vue';

export default{

  name: 'Main',
  components: {
    RestaurantCard,
    RouterLink
},

  data() {
    return {
      store
    }
  },

}
</script>

<template>
  <main>
    <div class="container">
      
      <div v-if="store.restaurants.length != 0" class="row row-cols-4" >
        <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/>
      </div>
      <div v-else>
        <p class=" text-center">Non ci sono ristoranti per le tipologie scelte</p>
      </div>

    </div>
  </main>
</template>

<style lang="scss" scoped>
  main{
    background-color: orange;
    padding-top: 50px;
    a{
      text-decoration: none;
    }
  }
</style>
