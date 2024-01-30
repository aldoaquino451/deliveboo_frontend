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
      restaurantTotal: 0,
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
          this.restaurantTotal = 0;
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
            this.restaurantTotal = res.data.total;
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
    window.scrollTo(top);
    this.getTypologies('typologies');
    this.getRestaurants('restaurants');
    store.searchTypologies = [];
  }

}
</script>

<template>

  <Typologies @startSearch="getRestaurantByTypologies" />

  <div class="my-container">
    
    <Paginator v-if="links.length > 3" :links="links" @getPage="getPage"/>

    <div v-if="store.restaurants.length != 0" class="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 ">
      <RestaurantCard v-for="restaurant in store.restaurants" :key="restaurant.id" :restaurant="restaurant"/> 
    </div>
      
    <p v-if="restaurantTotal != 0" class="text-end results mt-3">Risultati della ricerca: {{ restaurantTotal }}</p>

    <p v-if="store.restaurants.length === 0" class="text-center results">Non ci sono ristoranti per le tipologie scelte!</p>

  </div>

</template>

<style lang="scss" scoped>

.my-container {
  padding: 80px 0 150px;
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  min-height: 500px;

  .results{
    font-size: 1.3em;
  }
  
}
  
</style>