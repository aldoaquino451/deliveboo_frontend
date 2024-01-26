<script>
import { store, removeFromCart } from '../data/store';

export default {
  name: 'Cart',

  data() {
    return {
      store,
    }
  },

  computed: {
    totalAmount() {
      return store.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
      }, 0);
    },
  },

  methods: {
    removeProduct(cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        removeFromCart(cartItem.product.id);
      }
      store.saveCart(store.cart);
    },

    addProduct(cartItem) {
      cartItem.quantity++;
      store.saveCart(store.cart);
    },

    clearLocalStorage (){
      this.toggleModal();
      localStorage.removeItem('cart');
      store.cart = [];
    },

    toggleModal() {
      const modal = document.getElementById('modal');
      modal.classList.toggle('d-block');
    }
  },
};
</script>

<template>

  <!-- modale per la conferma dello "svuota carrello" -->
  <div id="modal" class="">
    <div class="modal-content p-4 px-5">
      <div @click="toggleModal" class="close-button d-flex justify-content-end mb-3">
        <i class="fa-solid fa-circle-xmark fs-4"></i>
      </div>
      <p class="text-center">Sei sicuro di voler svuotare il carrello?</p>
      <div class="d-flex gap-3 justify-content-center">
        <button @click="clearLocalStorage" class="btn btn-danger">Elimina</button>
        <button @click="toggleModal" class="btn btn-secondary">Annulla</button>
      </div>
    </div>
  </div>

  <!-- carrello con lista ordinata dei prodotti, totale da pagare e bottoni -->
  <section class="container">
    <h2 class="mb-4 text-uppercase text-center">Carrello</h2>
    
    <div v-if="store.cart.length > 0">
      <ol class="list-group mb-5 list-group-numbered">
        <li v-for="cartItem in store.cart" :key="cartItem.product.id" class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto">
            <p class="fw-bold mb-1">
              {{ cartItem.product.name }}
              <span class="ps-3">&euro;{{ cartItem.product.price }}</span>
            </p>
            {{ cartItem.product.ingredients }}
          </div>
          <div class="d-inline-block mt-2">
            <button @click="removeProduct(cartItem)" class="px-2 py-1 btn bg-info">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="px-2 fw-bold">{{ cartItem.quantity }}</span>
            <button @click="addProduct(cartItem)" class="px-2 py-1 btn bg-info">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </li>
      </ol>

      <div class=" d-flex justify-content-end">
        <p class="badge bg-warning fs-6 mb-3">Totale: &euro;{{ totalAmount.toFixed(2) }}</p>
      </div>

      <div>
        <div class="d-flex justify-content-end">
          <button @click="toggleModal" class="btn btn-secondary me-2">Svuota</button>
          <router-link to="/payment">
            <button type="button" class="btn btn-success px-3">Procedi all'ordine</button>
          </router-link>
        </div>
      </div>
    </div>

    <p v-else class="text-center fs-4">Nel carrello non sono presenti prodotti</p>
  </section>

</template>

<style lang="scss" scoped>

#modal {
  display: none;
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .modal-content {
    width: 300px;
    margin: 100px auto;
    border-radius: 20px;
    background-color: white;
    .close-button {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>