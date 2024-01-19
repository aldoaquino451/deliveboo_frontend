<script>
import { store, removeFromCart } from '../data/store';

export default {
  name: 'Cart',

  computed: {
    cart() {
      return store.cart;
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
        // Rimuovi l'elemento se la quantità è 1 o inferiore
        removeFromCart(cartItem.product.id);
      }
      store.saveCart(store.cart);
    },
  },
};
</script>

<template>
  <section class="d-flex flex-column justify-content-between">
    <h1>CARRELLO</h1>
    <router-link to="/"><i class="fa-solid fa-house"></i></router-link>

    <ul>
      <li v-for="cartItem in cart" :key="cartItem.product.id">
        {{ cartItem.product.name }} - €{{ cartItem.product.price }} (Quantità: {{ cartItem.quantity }})
        <button @click="incrementQuantity(cartItem)">+</button>
        <button @click="decrementQuantity(cartItem)">-</button>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
  section{
    margin-top: 70px;
    height: 300px;
    text-align: center;
    i{
      font-size: 2rem;
      color: black;
    }
  }
</style>