<script>
import axios from 'axios';
import { store } from '../data/store'; 
import Typologies from '../components/partials/Typologies.vue';
import Restaurants from '../components/partials/Restaurants.vue'; 

export default{

  name: 'Home',
  components:{
    Typologies,
    Restaurants,
  },

  data() {
    return {
      store
    }
  },

  methods:{
    getApi(endpoint) {
      // this.isLoaded = false;
      axios.get(endpoint)
      .then(results => {
        // this.isLoaded = true;
        store.restaurants = results.data;
      })
    },

    getApiTypologies(endpoint) {
      // this.isLoaded = false;
      axios.get(endpoint)
      .then(results => {
        // this.isLoaded = true;
        store.typologies = results.data;
      })
    },

    getApiRestaurantByTypologies() {
      // this.isLoaded = false;
      if (store.searchTypologies.length == 0) {
        this.getApi(store.apiUrl + 'restaurants')
      } else {
        
        axios.get(store.apiUrl + 'restaurants-by-typologies/' + store.searchTypologies.join("-"))
        .then(results => {
          // this.isLoaded = true;
          store.restaurants = results.data.data;
        })
      }
    }


  },

  mounted(){
    this.getApi(store.apiUrl + 'restaurants');
    this.getApiTypologies(store.apiUrl + 'typologies');
  }

}
</script>

<template>

  <Typologies @startSearch="getApiRestaurantByTypologies" />
  
  <Restaurants />

</template>

<style lang="scss">

</style>