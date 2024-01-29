<script>
// numero carte per prove
// - 4111111111111111  pagamento successo
// - 4000111111111115  pagamento negato

export default {
  name: 'PaymentBraintree',
 
}

</script>


<template>
  <div class="card pb-4">
    <div class="card-header py-3">
      <h5 class="mb-0">Step 2 - Inserimento dati pagamento</h5>
    </div>
    <div class="container">
      <div id="dropin-container"></div>
      <button class="btn btn-primary btn-lg btn-block mt-3" id="submit-button">Invia Pagamento</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>



</style>