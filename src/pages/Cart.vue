<script>
import { store, removeFromCart } from '../data/store';

export default {
  name: 'Cart',

  computed: {
    cart() {
      return store.cart;
    },

    totalAmount() {
      return this.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
      }, 0);
    },
  },

  methods: {
    incrementQuantity(cartItem) {
      cartItem.quantity++;
      store.saveCart(store.cart);
    },

    decrementQuantity(cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        removeFromCart(cartItem.product.id);
      }
      store.saveCart(store.cart);
    },
  },
};
</script>

<template>
  <section class="container">

    <h2 class="mb-4 text-uppercase text-center">Carrello</h2>
    
    <ol class="list-group mb-5 list-group-numbered">
      <li v-for="cartItem in cart" :key="cartItem.product.id" class="list-group-item d-flex justify-content-between align-items-start">
        <div class="ms-2 me-auto">
          <p class="fw-bold mb-1">
            {{ cartItem.product.name }}
            <span class="ps-3">&euro;{{ cartItem.product.price }}</span>
          </p>
          {{ cartItem.product.ingredients }}
        </div>
        <div class="d-inline-block">
          <button @click="decrementQuantity(cartItem)" class="px-2 py-1 btn bg-info">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="px-2 fw-bold">{{ cartItem.quantity }}</span>
          <button @click="incrementQuantity(cartItem)" class="px-2 py-1 btn bg-info">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </li>
    </ol>

    <div class="d-flex justify-content-end">
      <router-link to="/payment">
        <button type="button" class="btn btn-success px-3">Totale: &euro;{{ totalAmount.toFixed(2) }}</button>
      </router-link>
    </div>

  </section>
</template>

<style lang="scss" scoped>

</style>