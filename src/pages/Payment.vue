<script>
import axios from 'axios';
import { store } from '../data/store';
import { router } from '../router';
import PaymentBraintree from '../components/partials/PaymentBraintree.vue';

export default {

  name: 'Payment',

  data() {
    return {
      store,
      router,
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

  components: {
    PaymentBraintree
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

    getOrder() {
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
          localStorage.setItem('order', res.data)
        })

    },

    formBraintree() {
      var submitButton = document.querySelector('#submit-button');

      braintree.dropin.create(
        {
          authorization: 'sandbox_7b574dqm_b22n4gtx5t4h7dc7',
          container: '#dropin-container',
          locale: 'it_IT'

        }, 
        function (err, dropinInstance) {
          if (err) {
            // Handle any errors that might've occurred when creating Drop-in
            console.error(err);
            return;
          }

          submitButton.addEventListener('click', function () {
            dropinInstance.requestPaymentMethod(function (err, payload) {
              if (err) {
                // Handle errors in requesting payment method
              }
                           
              setTimeout(() => {
                router.push({ name: 'postpayment' });
                localStorage.removeItem('cart');
              }, 1000);    
              
            });
          });
        }
      );
      
      this.getOrder();
    },

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


       // SE NON CI SONO ERRORI NELL'ARRAY validationErrors...
      const isFormValid = Object.keys(this.validationErrors).length === 0;

      if (isFormValid) {
        localStorage.setItem('customerName', this.form.nome);
        localStorage.setItem('customerSurname', this.form.cognome);
        localStorage.setItem('customerAddress', this.form.indirizzo);
        localStorage.setItem('customerEmail', this.form.email);
        localStorage.setItem('customerNumber', this.form.telefono);
        
        // this.$router.push({ name: 'postpayment' });

        const hideButton = document.getElementById('button-validate');
        hideButton.classList.add('d-none');

        const braintree = document.getElementById('braintree');
        braintree.classList.remove('d-none');

        // localStorage.removeItem('cart');
        // this.store.cart = [];

        this.formBraintree();
      } 
      else {
        console.log('Errore: Dati non validi', this.validationErrors);
      }
    },
    
  },
};
</script>

<template>
  <section>
    <div class="container">
      <div class="row">
        
        <!-- Form dati utente e pagamento -->
        <div class="col-12 col-lg-8 mb-4">
          <!-- DATI UTENTE -->
          <div id="button-validate" class="button-card card mb-4">
            <div class="py-3">
              <h5 class="mb-0 step">Step 1 - Inserimento dati utente</h5>
            </div>
            <div class="card-body">

              <form class="mb-3">
                <div class="row mb-4">
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

                <div class="text-end">
                  <button id="button-validate" class="btn button-validate mt-4" @click.prevent="processPayment">
                    Procedi al pagamento
                  </button>
                </div>

              </form>


            </div>
          </div>
          <!-- FINE DATI UTENTE -->

          <!-- PAGAMENTO -->
          <PaymentBraintree id="braintree" class="d-none" />
          <!-- FINE PAGAMENTO -->

        </div>

        <!-- Riepilogo Carrello -->
        <div class="col-12 col-lg-4 mb-4">
          <div class="card mb-4 cart-summary">
            <div class="py-3">
              <h5 class="mb-0 step">Riepilogo carrello</h5>
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

section{
  margin-top: 100px;
  margin-bottom: 100px;
}

.step{
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.button-card {
  width: 100%;
  margin: 0 auto;
  border-radius: 20px;
  background-color: white;
  padding: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  ol {
    margin-bottom: 100px;
  }
}

.cart-summary{
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
}

.form-control{
  border: 1px solid #A63921;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  border-radius: 25px;
  padding-left: 20px;
  &:focus {
    box-shadow:  0px 10px 15px #a6392142;
    border-color: #A63921;
  }
 } 

#form6Example6::-webkit-inner-spin-button,
#form6Example6::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

#form6Example6 {
  -moz-appearance: textfield;
}

.button-validate{
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


</style>