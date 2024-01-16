<script>
import axios from 'axios';
import { store } from '../data/store'; 
import Main from '../components/Main.vue';
import SearchByTypologies from '../components/partials/SearchByTypologies.vue';

export default{

  name: 'Home',
  components:{
    Main,
    SearchByTypologies
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
    }


  },

  mounted(){
    this.getApi(store.apiUrl + 'restaurants');
    this.getApiTypologies(store.apiUrl + 'typologies');
  }

}
</script>

<template>


  <SearchByTypologies />
  <Main />


</template>

<style lang="scss">

</style>