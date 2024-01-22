<script>
import { store } from '../../data/store';
import { RouterLink } from 'vue-router';
import RestaurantCard from './RestaurantCard.vue';

export default{
  name: 'Restaurants',
  components: {
    RestaurantCard,
    RouterLink,
  },

  data() {
    return {
      store
    }
  },

}
</script>

<template>
  <div class="container py-4">

    <p v-if="store.restaurants.length != 0" class="text-center">Risultati della ricerca: {{ store.restaurants.length }}</p>

    <div v-if="store.restaurants.length != 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
      <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/>
    </div>
      
    <p v-else class="text-center">Non ci sono ristoranti per le tipologie scelte!</p>

  </div>
</template>

<style lang="scss" scoped>

</style>
