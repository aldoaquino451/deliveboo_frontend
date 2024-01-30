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
    <div class="product-card p-3 d-flex flex-row">

      <div class="product-image h-100">
        <img class="w-100 h-100" :src="product?.image" alt=""/>
      </div>

      <div class="product-details ps-3 d-flex flex-column">
        <h4 class="title fs-4">{{ product.name }}
          <i v-if="product.is_vegan" class="ps-2 fs-5 fa-solid fa-seedling text-success"></i>
        </h4>
        <p class="mb-1"><span class="fw-bold">Ingredienti: </span>{{ product.ingredients }}</p>
        <p class="mb-1"><span class="fw-bold">Prezzo: </span>&euro; {{ product.price }}</p>
        <div class="buttons pb-2 d-flex align-items-end">
          <div class="d-flex align-items-center">
            <button @click="removeProduct(product.id)" class="my-btn p-0 d-flex justify-content-center align-items-center">
              <i class="fa-solid fa-minus p-0 m-0"></i>
            </button>
            <span class="px-2 fw-bold">{{ getQuantity(product.id) }}</span>  
            <button @click="addProduct(product, restaurant_name)" class="my-btn p-0 d-flex justify-content-center align-items-center ">
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
  background-color: white;

  .title {
    font-family: 'Lobster', sans-serif;
  }
  
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
    .my-btn{
      border: none;
      border-radius: 50%;
      background-color: #A63921;
      color: white;
      transition: background-color 0.3s ease;
      width: 35px;
      height: 35px;

      &:hover{
      background-color: #F23005;
    }
  }
  }
}
</style>