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

  <footer class="py-3 bg-dark text-light">
    <div class="container">
      <div class="mb-4">
        <h1>Deliveboo</h1>
      </div>

     <div class="row">
      <div class="col text-center">
        <h3>Uniamo le forze</h3>
        <ul>
          <li><a href="#">Lavora con noi</a></li>
          <li><a href="#">Deliveboo per i Partner</a></li>
          <li><a href="#">Corrieri</a></li>
          <li><a href="#">Deliveboo Business</a></li>
        </ul>
      </div>
      <div class="col text-center">
        <h3>Link di interesse</h3>
        <ul>
          <li><a href="#">Chi siamo</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Deliveboo Prime</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contattaci</a></li>
          <li><a href="#">Sicurezza</a></li>
        </ul>
      </div>
      <div class="col text-center">
        <h3>Seguici</h3>
        <ul>
          <li><a href="#"><i class="fa-brands fa-square-facebook"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-square-instagram"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
          <li><a href="#"><i class="fa-brands fa-youtube"></i></a></li>
 
        </ul>
      </div>

      <div class="col text-center">
        <h3>Modulistica</h3>
        <ul>
          <li><a href="#">Termini e condizioni</a></li>
          <li><a href="#">Politica sulla privacy</a></li>
          <li><a href="#">Politica sui cookie</a></li>
          <li><a href="#">Conformità</a></li>
        </ul>
      </div>
     </div>

     <div class="info">
      <p class="our-group text-center">By Group 5</p>
     </div>

    </div>
  </footer>
  
</template>

<style lang="scss" scoped>
footer {
  height: 400px;
  h1 {
    margin-left: 55px;
  }
  li {
    a {
      color: rgb(162, 161, 161);
      text-decoration: none;
      &:hover {
        color: white;
      }
    }
  }

  .info {
    padding-top: 60px;
  }

  .our-group {
    color: rgb(162, 161, 161);
    font-size: 14px;
  }
}
</style>