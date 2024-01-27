<script>

export default{
  name: 'Footer',
  components: {
  },

  data() {
    return {
    }
  },

}
</script>

<template>

  <footer class="bg-dark text-light">
    <div class="container py-5">

      <h3 class="text-center mb-5">Deliveboo</h3>

     <div class="row">

      <div class="col-6 col-md-4 col-lg-3 mb-5">
        <h5 class="mb-3">Uniamo le forze</h5>
        <ul class="d-flex flex-column gap-3">
          <li><a href="#">Lavora con noi</a></li>
          <li><a href="#">Deliveboo per i Partner</a></li>
          <li><a href="#">Corrieri</a></li>
          <li><a href="#">Deliveboo Business</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-4 col-lg-3 mb-5">
        <h5 class="mb-3">Link di Interesse</h5>
        <ul class="d-flex flex-column gap-3">
          <li><a href="#">Chi siamo</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Deliveboo Prime</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contattaci</a></li>
          <li><a href="#">Sicurezza</a></li>
        </ul>
      </div>
      
      <div class="col-6 col-md-4 col-lg-3 mb-5">
        <h5 class="mb-3">Modulistica</h5>
        <ul class="d-flex flex-column gap-3">
          <li><a href="#">Termini e condizioni</a></li>
          <li><a href="#">Politica sulla privacy</a></li>
          <li><a href="#">Politica sui cookie</a></li>
          <li><a href="#">Conformità</a></li>
        </ul>
      </div>

      <div class="col-6 col-md-4 col-lg-3 offset-md-4 offset-lg-0 mb-5">
        <h5 class="mb-3 text-md-center text-lg-start">Seguici</h5>
        <ul class="d-flex gap-3 fs-4 justify-content-md-center justify-content-lg-start">
          <li><a href="#"><i class="fa-brands fa-square-facebook"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-square-instagram"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
        </ul>
      </div>

    </div>

    <p class="our-group text-center my-2 fs-6">By Group 5</p>

    </div>
  </footer>
  
</template>

<style lang="scss" scoped>

footer {
  a {
    color: rgb(162, 161, 161);
    text-decoration: none;
    &:hover {
      color: white;
    }
  }

  .our-group {
    color: rgb(162, 161, 161);
    font-size: 14px;
  }
}
</style>