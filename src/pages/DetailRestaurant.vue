<script>
import axios from 'axios';
import { store, addToCart, getQuantityInCart } from '../data/store';

export default {
  name: 'detailRestaurant',

  components: {},

  data() {
    return {
      restaurant: {},
      categories: [],
      products: [],
    };
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
        // console.log(this.products);
        // this.visibleProducts = this.products;
       
        this.products.forEach(product =>{
          // const category = product.category;
          // !this.categories.includes(category) ? this.categories.push(category) : null;
          const category = product.category;
          const isCategoryAlreadyAdded = this.categories.some(existingCategory => existingCategory.id === category.id);

          if (!isCategoryAlreadyAdded) {
            this.categories.push(category);
          }
          
        })
        console.log(this.categories);
        
      })
      
    },

    addToCart(product) {
      addToCart(product);
    },

    getQuantityInCart(product) {
      return getQuantityInCart(product);
    },

    getProductsByCategory(restaurant_id, category_id){
      axios.get(store.apiUrl + 'restaurant/product-category/' + 'productByCategory?restaurant_id=' + restaurant_id + '&category_id=' + category_id)
      .then(res => {

        console.log(res.data);

        this.products = res.data;

        console.log(this.products);
        
      })


    }
    // selectCategory(category_name) {
    //   const productsByCategoryName = this.products.filter(product => product.category.name === category_name);
    //   this.visibleProducts = productsByCategoryName;
    //   console.log( this.visibleProducts);
   
    // }
  },

  mounted() {
    this.getRestaurant(this.$route.params.slug);
  },
};
</script>

<template>
  <main>
    <div class="container">
      <router-link class="btn btn-primary my-5" :to="{ name: 'home' }">Torna </router-link>
      <h1>{{ restaurant.name_restaurant }}</h1>
      <span class="fw-bold">Tipologia: </span><span class="mx-2" v-for="typology in restaurant.typologies" :key="typology.id">{{ typology.name }}</span>
      <p class="mt-5"><span class="fw-bold">Descrizione:</span> {{ restaurant.description }}</p>

      <div class="d-flex justify-content-center">

        <button @click="getProductsByCategory(restaurant.id, category.id)" v-for="category in categories" :key="category.id" type="button" class="btn btn-warning mx-2 text-center">{{category.name}}</button>
      </div>

      <div class="my-5" v-for="category in categories" :key="category.id">

        <h2 class="text-success">{{category.name}}</h2>
        
        <div class="my-3" v-for="product in products" :key="product.id">
          <div v-if="product.category.name === category.name">

            <h4>{{product.name}}</h4>
            <p><span class="fw-bold">Ingredienti:</span>{{product.ingredients}}</p>
            <p><span class="fw-bold">Prezzo: </span>€ {{ product.price}}</p>
            <p v-if="product.is_vegan">prodotto vegano</p>

            <div>
              <span v-if="getQuantityInCart(product) > 0">Quantità nel carrello: {{ getQuantityInCart(product) }}</span>
              <button class="btn btn-success" @click="addToCart(product)">+</button>
            </div>
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