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
      products: [],
      visibleProducts: [],
      store
    }
  },

  
  methods: {
    getRestaurant(slug) {
      
      axios.get(store.apiUrl + 'restaurant/' + slug)
      .then(res => {
        // if(!res.data.restaurant){
        //   this.$router.push({name: 'error-404'})
        // }
        
        this.restaurant = res.data;

        this.products = res.data.products;
        console.log(this.products);
        this.visibleProducts = this.products;
       
        this.products.forEach(product =>{
          const categoryName = product.category.name;
          if(!this.categories.includes(categoryName)) {

            this.categories.push(categoryName);
          }
          
        })
        
      })
      
    },

    addProductToCart(product_id) {
      store.cart.push(product_id);
      console.log(store.cart);
    },

    removeProductToCart(product_id) {
      const index = this.store.cart.indexOf(product_id);

      store.cart.splice(index, 1);
      console.log(store.cart);
    },

    countProduct(product_id) {


      const elementByProductId = store.cart.filter(product => product.id === product_id);
      const count = elementByProductId.length;
      return count;
    },
    selectCategory(category_name) {
     
    
      const productsByCategoryName = this.products.filter(product => product.category.name === category_name);
      this.visibleProducts = productsByCategoryName;
      console.log( this.visibleProducts);
   
    }


    
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
      <span class="fw-bold">Tipologia: </span><span class="mx-2" v-for="typology in restaurant.typologies" :key="typology.id">{{ typology.name }}</span>
      <p class="mt-5"><span class="fw-bold">Descrizione:</span> {{ restaurant.description }}</p>

      <div class="d-flex justify-content-center">

        <button @click="selectCategory(category)" v-for="category in categories" :key="category.id" type="button" class="btn btn-warning mx-2 text-center">{{category}}</button>
      </div>

      <div class="my-5" v-for="category in categories" :key="category.id">
        <h2 class="text-success">{{category}}</h2>

        <div class="my-3" v-for="product in visibleProducts" :key="product.id">
          <div v-if="product.category.name === category">

            <h4>{{product.name}}</h4>
            <p><span class="fw-bold">Ingredienti:</span>{{product.ingredients}}</p>
            <p><span class="fw-bold">Prezzo: </span>€ {{ product.price}}</p>
            <p v-if="product.is_vegan">prodotto vegano</p>

            <button @click="addProductToCart(product)" class="btn btn-success">+</button>
            <span class="mx-4">{{countProduct(product.id)}}</span>
            <button @click="removeProductToCart(product)" class="btn btn-success">-</button>
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