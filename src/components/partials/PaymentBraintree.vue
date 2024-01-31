<script>
// numero carte per prove
// - 4111111111111111  pagamento successo
// - 4000111111111115  pagamento negato

export default {
  name: 'PaymentBraintree',
 
}

</script>


<template>
  <div class="card-validate pb-4">
    <div class="card-header-cs py-3">
      <h5 class="mb-0">Step 2 - Inserimento dati pagamento</h5>
    </div>
    <div class="container">
      <div id="dropin-container"></div>

      <div class="text-end">
        <button id="submit-button" class="pay-validate btn btn-primary btn-lg btn-block mt-4">Invia Pagamento</button>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  .card-header-cs{
    font-family: Lobster;
    text-align: center;
  } h5{
    font-size: 2rem;
  }
  .card-validate {
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

.pay-validate{
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