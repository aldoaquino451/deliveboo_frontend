<script>
import axios from 'axios';
import { store } from '../data/store'; 
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  name: 'PaymentBraintree',
  data() {
    this.publishableKey = 'pk_test_51OcWbYFlYbnPN3UvkyNnhhgZkmsbtpGqc3YEwFF5YoxarkuLuYqAAs0K2hjSYlWbiCj1aCvcb7MfEQIjfmCF3p7300U8N67WcS';
    return {
      store,
      loading: false,
      lineItems: [
        {
          price: 'price_1OcX1LFlYbnPN3UvoO1mAxo2', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
      successURL: 'http://localhost:5174/postpayment',
      cancelURL: 'http://localhost:5174/paymentbraintree',
    }
  },

  components: {
    StripeCheckout,
  },

  methods: {
    submit () {
      // You will be redirected to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout();
      this.$emit('callApi')
    },
  },

  mounted() {

  },
 
}

</script>

<template>
   <div>
    <stripe-checkout
      ref="checkoutRef"
      mode="payment"
      :pk="publishableKey"
      :line-items="lineItems"
      :success-url="successURL"
      :cancel-url="cancelURL"
      @loading="v => loading = v"
    />
    <button @click="submit">Pay now!</button>
  </div>
</template>

<style lang="scss" scoped>



</style>