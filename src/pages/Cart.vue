<script>
import { store, removeFromCart } from '../data/store';

export default {
  name: 'Cart',

  data() {
    return {
      store,
      cartItem: {},
    }
  },

  computed: {
    totalAmount() {
      return store.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
      }, 0);
    },

    restaurantName() {
      return localStorage.getItem('restaurant');
    }
  },

  methods: {
    removeProduct(cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        this.toggleModalProduct();
      }
      store.saveCart(store.cart);
      this.cartItem = cartItem;
    },
    
    removeFromCart() {
      removeFromCart(this.cartItem.product.id);
      this.cartItem = {};
      this.toggleModalProduct();
    },

    addProduct(cartItem) {
      cartItem.quantity++;
      store.saveCart(store.cart);
    },

    clearLocalStorage (){
      this.toggleModalCart();
      localStorage.removeItem('cart');
      localStorage.removeItem('restaurant');
      store.cart = [];
    },

    toggleModalCart() {
      const cart = document.getElementById('modal-cart');
      cart.classList.toggle('d-block');
    },

    toggleModalProduct() {
      const product = document.getElementById('modal-product');
      product.classList.toggle('d-block');
    },
  },

  mounted() {
    window.scrollTo(top);
  },

};
</script>

<template>
  <section class="cart-section">
    <!-- modale per la conferma dello "svuota carrello" -->
    <div id="modal-cart">
      <div class="modal-content p-4 px-5">
        <div @click="toggleModalCart" class="close-button d-flex justify-content-end mb-3">
          <i class="fa-solid fa-circle-xmark fs-4"></i>
        </div>
        <p class="text-center mb-4 mt-2">Sei sicuro di voler svuotare il carrello?</p>
        <div class="d-flex gap-3 justify-content-center">
          <button @click="clearLocalStorage" class="endcart px-3 py-2">Svuota</button>
          <button @click="toggleModalCart" class="endcart px-3 py-2">Annulla</button>
        </div>
      </div>
    </div>

    <!-- modale per la conferma della rimozione prodotto -->
    <div id="modal-product" class="">
      <div class="modal-content p-4 px-5">
        <div @click="toggleModalProduct" class="close-button d-flex justify-content-end mb-3">
          <i class="fa-solid fa-circle-xmark fs-4"></i>
        </div>
        <p class="text-center mb-4 mt-2">Sei sicuro di voler rimuovere questo prodotto dal carrello?</p>
        <div class="d-flex gap-3 justify-content-center">
          <button @click="removeFromCart(cartItem)" class="px-3 py-2 endcart">Rimuovi</button>
          <button @click="toggleModalProduct" class="px-3 py-2 endcart">Annulla</button>
        </div>
      </div>
    </div>

    <!-- carrello con lista ordinata dei prodotti, totale da pagare e bottoni -->
    <section id="cart-container">
      
      <h2 class="mb-4 text-cart text-uppercase text-center">Carrello <i class="fa-solid fa-cart-shopping"></i></h2>
      
      <div v-if="store.cart.length > 0">
        <h4 class="mb-3 restaurant-name">{{ restaurantName }}</h4>

        <ol class="list-group list-group-numbered">
          <li v-for="cartItem in store.cart" :key="cartItem.product.id" class="cart-items ps-4 rounded-5 mb-3 list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <p class="fw-bold mb-1">
                {{ cartItem.product.name }}
                <span class="ps-3">&euro;{{ cartItem.product.price }}</span>
              </p>
              {{ cartItem.product.ingredients }}
            </div>
            <div class="container-buttons d-inline-block mt-2">
              <button @click="removeProduct(cartItem)" class="px-2 endcart py-1 plus-minus">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="px-2 fw-bold">{{ cartItem.quantity }}</span>
              <button @click="addProduct(cartItem)" class="px-2 endcart py-1 plus-minus">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </li>
        </ol>

        <div class="d-flex justify-content-end">
          <p class="badge total-amount text-decoration-underline mb-3">Totale: &euro;{{ totalAmount.toFixed(2) }}</p>
        </div>

        <div>
          <div class="d-flex justify-content-end">
            <button @click="toggleModalCart" class="me-3 py-2 px-4 endcart">Svuota</button>
            <router-link to="/payment">
              <button type="button" class="py-2 px-4 endcart">Procedi all'ordine</button>
            </router-link>
          </div>
        </div>
      </div>

      <p v-else class="text-center">Non hai ancora selezionato nessun prodotto da aggiungere nel carrello.</p>

    </section>
  </section>

</template>

<style lang="scss" scoped>

.restaurant-name{
  font-family: Lobster;
  font-size: x-large;
}

.cart-section{
  margin-top: 100px;
  margin-bottom: 140px;
}

.cart-items{
  border: 1px solid #A63921;
}

.total-amount{
  color: black;
  font-size: 1.3em;
  font-weight: lighter;
  margin: 6px;
}

.endcart{
  border: none;
  border-radius: 25px;
  background-color: #A63921;
  color: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover{
  background-color: #F23005;
 }
}

.container-buttons{
  min-width: 95px;
}

#modal-cart,
#modal-product {
  display: none;
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .modal-content {
    width: 400px;
    margin: 300px auto;
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

.text-cart{
  font-family: Lobster;
}

#cart-container {
  min-height: 400px;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 20px;
  background-color: white;
  padding: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  ol {
    margin-bottom: 100px;
  }
}
</style>