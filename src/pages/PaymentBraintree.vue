<script>
import axios from 'axios';
import { store } from '../data/store';
import { router } from '../router'

// numero carte per prove
// - 4111111111111111  pagamento successo
// - 4000111111111115  pagamento negato


export default {
  name: 'PaymentBraintree',
  data() {
    return {
      tokenApi: '',
      // braintree
      store,
      router
    }
  },

  methods: {

    formBraintree() {
      var submitButton = document.querySelector('#submit-button');

      braintree.dropin.create({
        authorization: 'sandbox_7b574dqm_b22n4gtx5t4h7dc7',
        container: '#dropin-container'
      }, function (err, dropinInstance) {
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
            }, 1000);    

          });
        });
      });
    },
  },

  mounted() {
    this.formBraintree()
  },
 
}

</script>


<template>
  <div class="container">
    <h1>PaymentBraintree</h1>
    <div id="dropin-container"></div>
    <button id="submit-button">Purchase</button>
  </div>
</template>

<style lang="scss" scoped>



</style>