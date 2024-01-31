<script>
import axios from 'axios';
import { store } from '../data/store';

export default {
  name: 'PostPayment',

  data() {
    return {
      order: {},
      store
    }
  },

  methods: {
    getOrder(order) {
      axios.get(store.apiUrl + 'order/' + order)
        .then( res => {
          this.order = res.data;
          console.log(this.order.id);
          
        });

    },

    sendMail(order) {
        axios.get(store.apiUrl + 'send-email/'+ order)
          .then( res => {
            console.log(res)
            if(res.data.success == true) {
              console.log('Conferma ordine inviata')
            } else {
              console.log('Problemi con mailbox')
            }
          })
    }
  },

  mounted() {
    window.scrollTo(top);
    const order = localStorage.getItem('order');
    this.getOrder(order);
    this.sendMail(order);

    this.store.cart = []
  },
}
</script>


<template>
  <div id="order-container">

    <div v-if="order.id">
      <h2 class="mb-4 text-capitalize text-center">
        Ordine effettuato
        <i class="text-success fa-regular fa-circle-check"></i>
      </h2>

      <div class="mb-4">
        <p class="mb-2">Grazie 
          <span class="text-capitalize fw-bold">{{ order.name }} {{ order.lastname }},</span>
          l'ordine è andato a buon fine!
        </p>
        <p class="mb-2">A breve ti verrà spedito all'indirizzo 
          <span class="text-capitalize fw-bold ">{{ order.address }}.</span>
        </p>
        <p>Qui sotto puoi trovare il riepilogo dell'ordine:</p>
      </div>

      <ol class="p-0 mb-4 list-group-numbered">
        <li v-for="product in order.products" :key="product.id" class="list-group-item d-flex justify-content-between align-items-start mb-3">
          <div class="ms-2 me-auto">
            <p class="fw-semibold mb-0">
              {{ product.name }}
              <span class="ps-3">&euro;{{ product.price }}</span>
            </p>
            {{ product.ingredients }}
          </div>
          <div class="d-inline-block mt-2">
            <span class="px-2 fw-bold">{{ product.pivot.quantity }}</span>
          </div>
        </li>
      </ol>
      
      <p class="total text-decoration-underline text-end mb-3">Totale: &euro;{{ order.total_price }}</p>
    </div>

    <div v-else>
      <h2 class="mb-4 text-capitalize text-center">
        Ordine annullato
        <i class="text-danger fa-regular fa-circle-check"></i>
      </h2>
      <p>C'è stato un problema nella conferma del pagamento.</p>
      <p>Aprendo il carrello può ricominciare la procedura per l'acquisto dei prodotti selezionati.</p>
    </div>
  
  </div>
</template>


<style lang="scss" scoped>

#order-container {
  width: 80%;
  max-width: 800px;
  min-height: 500px;
  margin: 0 auto;
  border-radius: 25px;
  background-color: white;
  padding: 30px;
  margin-top: 100px;
  margin-bottom: 100px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}

.total{
  font-size: x-large;
  font-weight: bold;
}
</style>