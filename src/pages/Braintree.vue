<template>
<div class="container">

  <h3 class="text-center">Braintree</h3>

  <div>
    <button class="btn btn-primary">{{ loadingPayment ? 'Loading...' : 'Procedi con l\'acquisto'}}</button>
  </div>

  <CreditCard />

</div>
</template>


<script>
import CreditCard from '../components/partials/CreditCard.vue';

export default {

  name: 'Braintree',

  components: {
    CreditCard
  },

  data() {
    return {
      loadingPayment: false,
    }
  },

  mounted() {
  },
  
};
</script>


<style lang="scss" scoped>

</style>