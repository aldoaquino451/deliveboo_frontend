<script>
import { store } from '../data/store';

export default{

name: 'PostPayment',

data(){
  return {
    store,
    customerName: localStorage.getItem('customerName'),
    customerAddress: localStorage.getItem('customerAddress')
  }
},

mounted(){
  console.log(this.store.cartPrint);
},

computed:{
    totalAmount() {
      return store.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
      }, 0);
    },
  },

}
</script>

<template>
  <section>
    <div class="container d-flex flex-column align-items-center">
      <div class="mb-4 text-center">
        <h2>Grazie {{ customerName }}!</h2>
        <h5>il tuo ordine è stato confermato!</h5>
        <p>come richiesto effettueremo la consegna all'indirizzo:</p>
        <p>{{ customerAddress }}</p>
      </div>

      <div class="col-md-4 mb-4">
        <div class="card mb-4">
          <div class="card-header py-3">
            <h5 class="mb-0">Riepilogo Ordine</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li v-for="(product, index) in store.cartPrint" :key="index" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                <span>{{ product.name }}</span>
                <div>
                  <span>{{ product.price }} &euro;</span>
                  <span> x{{ product.quantity }}</span>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                Spedizione
                <span>Gratis</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>Totale</strong>
                </div>
                <span><strong>&euro;{{ store.totalAmountPrint }}</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>   

  </section> 

</template>

<style lang="scss" scoped>
  .section{
    margin-top: 70px;
  }
</style>