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

    <div>
      <p>Totale: €{{ totalAmount.toFixed(2) }}</p>
      <router-link to="/payment">
        <button type="button" class="btn btn-success">Conferma</button>
      </router-link>
      
    </div>

  </section>
</template>

<style lang="scss" scoped>
  section{
    margin-top: 70px;
    margin-bottom: 70px;
    height: 300px;
    text-align: center;
    i{
      font-size: 2rem;
      color: black;
    }
    .btn{
      width: 100px;
    }
  }
</style>