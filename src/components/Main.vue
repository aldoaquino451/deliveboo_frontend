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
      
      
        <div class="row row-cols-4">
          <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/>
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
