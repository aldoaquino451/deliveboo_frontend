<script>
import axios from 'axios';
import { store } from '../data/store'; 
import Typologies from '../components/partials/Typologies.vue';
import Paginator from '../components/partials/Paginator.vue';
import RestaurantCard from '../components/partials/RestaurantCard.vue';

export default{

  name: 'Home',

  components:{
    Typologies,
    RestaurantCard,
    Paginator,
  },

  data() {
    return {
      store,
      links: [],
    }
  },

  methods:{
    // stampo le tipologie
    getTypologies(endpoint) {
      axios.get(store.apiUrl + endpoint)
        .then( res => {
          store.typologies = res.data;
        })
    },

    // stampo i ristoranti
    getRestaurants(endpoint) {
      axios.get(store.apiUrl + endpoint)
        .then( res => {
          store.restaurants = res.data;
        })
    },
    
    // stampo i ristoranti in base alle tipologie
    getRestaurantByTypologies() {
      if (store.searchTypologies.length == 0) {
        this.getRestaurants('restaurants');
        this.links = [];
      } 
      else {  
        axios.get(store.apiUrl + 'restaurants-by-typologies/' + store.searchTypologies.join("-"))
          .then( res => {
            store.restaurants = res.data.data;
            this.links = res.data.links;
          })
      }
    },  
    
    // recupero i link delle pagine per il Paginator
    getPage(url) {
      axios.get(url)
        .then(res => {
          store.restaurants = res.data.data;
          this.links = res.data.links;
        })
    }
  },

  mounted(){
    this.getTypologies('typologies');
    this.getRestaurants('restaurants');
  }

}
</script>

<template>

  <!-- stampo le tipologie -->
  <Typologies @startSearch="getRestaurantByTypologies" />

  <!-- stampo i ristoranti con all'interno le Restaurant Card e il Paginator -->
  <div class="container py-4">

    <p v-if="store.restaurants.length != 0" class="text-center">Risultati della ricerca: {{ store.restaurants.length }}</p>

    <div v-if="store.restaurants.length != 0" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
      <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/> 
    </div>
      
    <p v-else class="text-center">Non ci sono ristoranti per le tipologie scelte!</p>

    <Paginator :links="links" @getPage="getPage"/>

  </div>

</template>

<style lang="scss">

</style>