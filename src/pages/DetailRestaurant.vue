<script>
import axios from 'axios';
import { store, addToCart, getQuantityInCart, removeFromCart } from '../data/store';

export default {
  name: 'detailRestaurant',

  data() {
    return {
      restaurant: {},
      categories: [],
      products: [],
      productId: [],
    };
  },

  methods: {
    getRestaurant(slug) {
      axios.get(store.apiUrl + 'restaurant/' + slug)
        .then(res => {
          this.restaurant = res.data;
          this.products = res.data.products;
          
          this.products.forEach(product => {
            const category = product.category;
            const isCategoryAlreadyAdded = this.categories.some(existingCategory => existingCategory.id === category.id);

            if (!isCategoryAlreadyAdded) {
              this.categories.push(category);
            }
          });
        });
    },

    addToCart(product) {
      addToCart(product);
    },

    removeFromCart(productId) {
      removeFromCart(productId);
    },

    getQuantityInCart(product) {
      return getQuantityInCart(product);
    },

    getProductsByCategory(restaurant_id, category_id) {
      axios.get(store.apiUrl + 'restaurant/product-category/' + 'productByCategory?restaurant_id=' + restaurant_id + '&category_id=' + category_id)
        .then(res => {
          this.products = res.data;
        });
    }
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

        <button @click="getRestaurant(restaurant.slug)" type="button" class="btn btn-warning mx-2 text-center">Tutto</button>
        
        <button @click="getProductsByCategory(restaurant.id, category.id)" v-for="category in categories" :key="category.id" type="button" class="btn btn-warning mx-2 text-center">{{category.name}}</button>

      </div>

      <div class="my-5" v-for="category in categories" :key="category.id">

        <h2 v-if="this.products.some(product => product.category_id === category.id)" class="text-success">{{category.name}}</h2>

        <div class="my-3" v-for="product in products" :key="product.id">
          <div v-if="product.category.name === category.name">

            <h4>{{product.name}}</h4>
            <p><span class="fw-bold">Ingredienti:</span>{{product.ingredients}}</p>
            <p><span class="fw-bold">Prezzo: </span>€ {{ product.price}}</p>
            <p v-if="product.is_vegan">prodotto vegano</p>

            <div>
              <button class="btn btn-success" @click="addToCart(product)">+</button>
              <span v-if="getQuantityInCart(product) > 0">
                <span>Quantità nel carrello: {{ getQuantityInCart(product) }}</span>
                <button class="btn btn-success" @click="removeFromCart(product.id)">-</button>
              </span>
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