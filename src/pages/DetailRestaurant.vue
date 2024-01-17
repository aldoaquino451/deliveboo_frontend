<script>

import axios from 'axios';
import { store } from '../data/store'; 

export default{
name: 'detailRestaurant',

components:{
  },

  data() {
    return {
      restaurant:{}

    }
  },

  methods: {
    getRestaurant(slug) {
      console.log(slug)
      axios.get(store.apiUrl + 'restaurant/' + slug)
      .then(res => {
        // if(!res.data.restaurant){
        //   this.$router.push({name: 'error-404'})
        // }
        console.log(res)
        this.restaurant = res.data;
      })
    },

    
  },

  mounted() {
    this.getRestaurant(this.$route.params.slug);


  },

}

</script>

<template>
  <section>
    <h1>dettaglio ristorante e menu</h1>
    <h2>{{ restaurant.name_restaurant }}</h2>
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