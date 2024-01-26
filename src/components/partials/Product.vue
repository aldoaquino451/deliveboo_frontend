<script>
import { store, addToCart, removeFromCart, } from '../../data/store';

export default {
  name: 'Product',

  props: {
    product: Object,
    restaurant_name: String,
  },

  data() {
    return {
      store,
    }
  },

  methods: {
    getQuantity(product_id) {
      const cartItem = store.cart.find(item => item.product.id === product_id);
      return cartItem ? cartItem.quantity : 0;
    },

    removeProduct(product_id) {
      removeFromCart(product_id);
    },

    addProduct(product, restaurant_name) {
      addToCart(product, restaurant_name);
    },

  },  
}
</script>


<template>
  <div class="col mb-4">
    <div class="card product-card border-0 rounded-4 d-flex flex-row">

      <div class="product-image h-100">
        <img class="w-100 h-100" :src="product?.image" alt=""/>
      </div>

      <div class="product-details p-3 d-flex flex-column">
        <h4>{{ product.name }}</h4>
        <p class="mb-1"><span class="fw-bold">Ingredienti: </span>{{ product.ingredients }}</p>
        <p class="mb-1"><span class="fw-bold">Prezzo: </span>&euro; {{ product.price }}</p>
        <p class="mb-1 text-success" v-if="product.is_vegan">Prodotto vegano</p>
        <div class="buttons pb-2 d-flex align-items-end d-inline-block">
          <div>
            <button @click="removeProduct(product.id)" class="px-2 py-1 btn btn-success">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="px-2 fw-bold">{{ getQuantity(product.id) }}</span>  
            <button @click="addProduct(product, restaurant_name)" class="px-2 py-1 btn btn-success">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss">

.product-card {
  height: 250px;
  box-shadow: 0px 0px 6px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  .product-image {
    width: 40%;
    
    img {
      object-fit: cover;
    }
  }
  
  .product-details {
    width: 60%;

    .buttons {
      flex-grow: 1;

    }
  }
}
</style>