<script>
import { store } from '../data/store';
import RestaurantCard from './partials/RestaurantCard.vue';

export default{

  name: 'Main',
  components: {
    RestaurantCard
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
      <h1>MAIN</h1>
      
      <div class="row row-cols-4">
        <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/>
      </div>

    </div>

  </main>
</template>

<style lang="scss" scoped>



</style>
