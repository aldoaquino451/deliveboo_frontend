<script>
import axios from 'axios';
import { store } from '../data/store'; 

export default {
  name: 'PaymentBraintree',
  data() {
    return {
      tokenApi: '',
      // braintree
      store
    }
  },

  methods: {

    getToken(){
      axios.get('http://127.0.0.1:8000/api/orders/generate')
        .then(results => {
          this.tokenApi = results.data.token;
        })
    },

    getMakePayment(){
      axios.post('http://127.0.0.1:8000/api/orders/make-payment')
      .then(results => {
          console.log(results)
          // this.product = results.data;
        })


    },

    braintreeForm(){
      const form = document.getElementById('payment-form');

      braintree.dropin.create({
        authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
        selector: '#dropin-container',
        locale: 'it_IT'
      }, function (err, instance) {
        if (err) console.error(err);

        form.addEventListener('submit', function () {
          
          instance.requestPaymentMethod(function (err, payload) {
            if (err) console.error(err);

            // Step four: when the user is ready to complete their
            //   transaction, use the dropinInstance to get a payment
            //   method nonce for the user's selected payment method, then add
            //   it a the hidden field before submitting the complete form to
            //   a server-side integration

            document.getElementById('nonce').value = payload.nonce;
            form.submit();          
          });
        })
      });    
    },

  },

  mounted() {
    // this.getToken()
    this.braintreeForm()
    // this.getMakePayment()
  },
 
}

</script>

<template>
  <div class="container">
    <h1>PaymentBraintree</h1>
    {{ this.tokenApi }}

     <div class="row">
       <div class="col-md-8 col-md-offset-2">
          <form id="payment-form" :action="this.store.apiUrl + 'orders/make-payment'" method="post">
            <div id="dropin-container"></div>
            <input type="submit" />
            <input type="hidden" id="nonce" name="payment_method_nonce" />
          </form>
        </div>
     </div>
  </div>

</template>

<style lang="scss" scoped>

.button {
  cursor: pointer;
  font-weight: 500;
  left: 3px;
  line-height: inherit;
  position: relative;
  text-decoration: none;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  // -webkit-appearance: none;
  // -moz-appearance: none;
  display: inline-block;
}

.button--small {
  padding: 10px 20px;
  font-size: 0.875rem;
}

.button--green {
  outline: none;
  background-color: #64d18a;
  border-color: #64d18a;
  color: white;
  transition: all 200ms ease;
}

.button--green:hover {
  background-color: #8bdda8;
  color: white;
}


</style>