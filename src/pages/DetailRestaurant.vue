<script>

import axios from 'axios';
import { store } from '../data/store'; 

export default{
name: 'detailRestaurant',

components:{
  },

  data() {
    return {
      restaurant:{},
      categories: [],
      products: []
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
        console.log(res.data)
        this.restaurant = res.data;

        this.products = res.data.products;
        console.log(this.products);
        this.products.forEach(product =>{
          const categoryName = product.category.name;
          if(!this.categories.includes(categoryName)) {

            this.categories.push(categoryName);
          }
          
        })
        
      })
    },

    
  },

  mounted() {
    this.getRestaurant(this.$route.params.slug);


  },

}

</script>

<template>
  <main>
    <div class="container">
      <router-link class="btn btn-primary my-5" :to="{name: 'home' }">Torna </router-link>
      <h1>{{ restaurant.name_restaurant }}</h1>
      <span class="fw-bold">Tipologia: </span><span class="mx-5" v-for="typology in restaurant.typologies" :key="typology.id">{{ typology.name }}</span>
      <p class="mt-5"><span class="fw-bold">Descrizione:</span> {{ restaurant.description }}</p>

      <div v-for="category in categories" :key="category.id">
        <h2>{{category}}</h2>

        <div v-for="product in products" :key="product.id">
          <div v-if="product.category.name === category">

            <h3>{{product.name}}</h3>
            <p><span class="fw-bold">Ingredienti:</span>{{product.ingredients}}</p>
            <p><span class="fw-bold">Prezzo: </span>€ {{ product.price}}</p>
            <p v-if="product.is_vegan">prodotto vegano</p>
            <button class="btn btn-success">+</button>
          </div>
        </div>
      </div>
      
    </div>
 
  </main>

</template>

<style lang="scss" scoped>
  main {
    margin-top: 70px;
  
    h1{
      text-align: center;
    }
  }
</style>