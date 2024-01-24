<script>
import axios from 'axios';
import { store } from '../data/store';

export default {

  name: 'Payment',

  data() {
    return {
      store,
      form: {
        nome: '',
        cognome: '',
        indirizzo: '',
        email: '',
        telefono: '',
        titolareCarta: '',
        numeroCarta: '',
        scadenza: '',
        cvv: '',
      },
      validationErrors: {},
    }
  },

  mounted(){
    this.store.cart.forEach(product => {
      this.store.cartPrint.push({
        id: product["product"]["id"],
        name: product["product"]["name"],
        quantity: product["quantity"],
        price: product["product"]["price"],
      });
      store.restaurant_id = product["product"]["restaurant_id"]; 
    });

    console.log(this.store.cartPrint);
    console.log(this.store.cart);

    this.store.totalAmountPrint = this.totalAmount.toFixed(2);
  },

  computed:{
    totalAmount() {
      return store.cart.reduce((total, cartItem) => {
        return total + cartItem.product.price * cartItem.quantity;
      }, 0);
    },
  },

  methods: {

    // VALIDAZIONI
    isValidName() {
      return /^[a-zA-Z]{2,}$/.test(this.form.nome);
    },
    isValidSurname() {
      return /^[a-zA-Z]{2,}$/.test(this.form.cognome);
    },
    isValidAddress() {
      return /^[a-zA-Z0-9 ]{5,}$/.test(this.form.indirizzo);
    },
    isValidEmail() {
      return /^[\w.-]+@[a-zA-Z\d.-]+.[a-zA-Z]{2,}$/.test(this.form.email);
    },
    isValidPhone() {
      return /^[0-9]{5,}$/.test(this.form.telefono);
    },
    isValidCardHolder() {
      return /^[a-zA-Z' ]{2,}$/.test(this.form.titolareCarta);
    },
    isValidCardNumber() {
      return /^[0-9]{13,19}$/.test(this.form.numeroCarta);
    },
    isValidExpiry() {
      const parts = this.form.scadenza.split('/');
      if (parts.length === 2) {
        const month = parseInt(parts[0], 10);
        const year = parseInt(parts[1], 10);
        return (
          month >= 1 &&
          month <= 12 &&
          year >= 24 &&
          /^[0-9]{2}$/.test(parts[1])
        );
      }
      return false;
    },
    isValidCVV() {
      return /^[0-9]{3,4}$/.test(this.form.cvv);
    },

    // PAGAMENTO
    processPayment() {
      this.validationErrors = {}; // Reset degli errori prima di validare!!!!

      if (!this.isValidName()) {
        this.validationErrors.nome = 'Nome non valido';
      }

      if (!this.isValidSurname()) {
        this.validationErrors.cognome = 'Cognome non valido';
      }

      if (!this.isValidAddress()) {
        this.validationErrors.indirizzo = 'Indirizzo non valido';
      }

      if (!this.isValidEmail()) {
        this.validationErrors.email = 'Email non valida';
      }

      if (!this.isValidPhone()) {
        this.validationErrors.telefono = 'Telefono non valido';
      }

      if (!this.isValidCardHolder()) {
        this.validationErrors.titolareCarta = 'Titolare della carta non valido';
      }

      if (!this.isValidCardNumber()) {
        this.validationErrors.numeroCarta = 'Numero della carta non valido';
      }

      if (!this.isValidExpiry()) {
        this.validationErrors.scadenza = 'Scadenza non valida';
      }

      if (!this.isValidCVV()) {
        this.validationErrors.cvv = 'CVV non valido';
      }

       // SE NON CI SONO ERRORI NELL'ARRAY validationErrors...
      const isFormValid = Object.keys(this.validationErrors).length === 0;

      if (isFormValid) {
        console.log('Pagamento avvenuto con successo!');
        localStorage.setItem('customerName', this.form.nome);
        localStorage.setItem('customerSurname', this.form.cognome);
        localStorage.setItem('customerAddress', this.form.indirizzo);
        localStorage.setItem('customerEmail', this.form.email);
        localStorage.setItem('customerNumber', this.form.telefono);
        
        this.$router.push({ name: 'postpayment' });

        const cart = JSON.stringify(this.store.cartPrint);
        const name = localStorage.getItem('customerName');
        const lastname = localStorage.getItem('customerSurname');
        const address = localStorage.getItem('customerAddress');
        const email = localStorage.getItem('customerEmail');
        const phone_number = localStorage.getItem('customerNumber');
        const total_price = this.totalAmount.toFixed(2);
        const restaurant_id = store.restaurant_id;

        axios.get(store.apiUrl + "save-order/" + cart + '/' + name + '/' + lastname + '/' + address + '/' + email + '/' + phone_number + '/' + total_price + '/' + restaurant_id)
          .then(res => {
            console.log(res.data);
          });

        localStorage.removeItem('cart');
        this.store.cart = [];
      } 
      else {
        console.log('Errore: Dati non validi', this.validationErrors);
      }
    },
    
    // getApi() {
    //   const cart = JSON.stringify(this.store.cart);
    //   const name = 'admin';
    //   const lastname = 'admin';
    //   const address = 'vai qualunque 11';
    //   const phone_number = '3442344343';
    //   const total_price  = this.totalAmount.toFixed(2);

    //   axios.get(store.apiUrl + "save-order/" + cart + '/' + name + '/' + lastname + '/' + address + '/' + phone_number + '/' + total_price)
    //     .then(res => {
    //       console.log(res.data);
    //     });
    // }
  },
};
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-8 mb-4">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5 class="mb-0">Pagamento</h5>
            </div>
            <div class="card-body">
              <form class="mb-3">
                <div class="row mb-4">
                  <h5 class="mb-4">Dati utente</h5>
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="form6Example1">Nome</label>
                      <input type="text" id="form6Example1" v-model="form.nome" class="form-control" />
                    
                      <span v-if="validationErrors.nome" class="text-danger">{{ validationErrors.nome }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="form6Example2">Cognome</label>
                      <input type="text" id="form6Example2" v-model="form.cognome" class="form-control" />
                      <span v-if="validationErrors.cognome" class="text-danger">{{ validationErrors.cognome }}</span>
                    </div>
                  </div>
                </div>

                <!-- Text input -->
                <div class="form-outline mb-4">
                  <label class="form-label" for="form6Example4">Indirizzo di consegna</label>
                  <input type="text" id="form6Example4" v-model="form.indirizzo" class="form-control" />
                  <span v-if="validationErrors.indirizzo" class="text-danger">{{ validationErrors.indirizzo }}</span>
                </div>
                
                <!-- Text email -->
                <div class="form-outline mb-4">
                  <label class="form-label" for="form6Example5">Email</label>
                  <input type="email" id="form6Example5" v-model="form.email" class="form-control" />
                  <span v-if="validationErrors.email" class="text-danger">{{ validationErrors.email }}</span>
                </div>

                <!-- Numero input -->
                <div class="form-outline mb-5">
                  <label class="form-label" for="form6Example6">Telefono</label>
                  <input type="number" id="form6Example6" v-model="form.telefono" class="form-control" />
                  <span v-if="validationErrors.telefono" class="text-danger">{{ validationErrors.telefono }}</span>
                </div>

                
               

                <h5 class="mb-4 mt-5">Dati carta</h5>
                
                <div class="row mb-4">
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="formNameOnCard">Titolare della carta</label>
                      <input type="text" id="formNameOnCard" v-model="form.titolareCarta" class="form-control" />
                      <span v-if="validationErrors.titolareCarta" class="text-danger">{{ validationErrors.titolareCarta }}</span>
                    </div>
                  </div>
                  <div class="col">
                    <div class="form-outline">
                      <label class="form-label" for="formCardNumber" >Numero carta</label>
                      <input type="text" id="formCardNumber" v-model="form.numeroCarta" class="form-control" maxlength="19" />
                      <span v-if="validationErrors.numeroCarta" class="text-danger">{{ validationErrors.numeroCarta }}</span>
                    </div>
                  </div>
                </div>

                <div class="row mb-4">
                  <div class="col-3">
                    <div class="form-outline">
                      <label class="form-label" for="formExpiration">Scadenza</label>
                      <input type="text" id="formExpiration" v-model="form.scadenza" class="form-control" />
                      <span v-if="validationErrors.scadenza" class="text-danger">{{ validationErrors.scadenza }}</span>
                    </div>
                  </div>
                  <div class="col-3">
                    <div class="form-outline">
                      <label class="form-label" for="formCVV">CVV</label>
                      <input type="text" id="formCVV" v-model="form.cvv" class="form-control" maxlength="4"/>
                      <span v-if="validationErrors.cvv" class="text-danger">{{ validationErrors.cvv }}</span>
                    </div>
                  </div>
                </div>

                <button class="btn btn-primary btn-lg btn-block mt-4" @click.prevent="processPayment">
                  Procedi al pagamento
                </button>

              </form>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card mb-4">
            <div class="card-header py-3">
              <h5 class="mb-0">Riepilogo carrello</h5>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li v-for="cartItem in store.cart" :key="cartItem.product.id" class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <span>{{ cartItem.product.name }}</span>
                  <div>
                    <span>{{ cartItem.product.price }} &euro;</span>
                    <span> x{{ cartItem.quantity }}</span>
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
                  <span><strong>&euro;{{ totalAmount.toFixed(2) }}</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>


</style>