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

  <div class="wave-footer"></div>

  <footer>


    <div class="container py-5">

      <h4 class="m-0 text-center">MADE BY TEAM5</h4>
      <hr class="py-3">
      <h4 class="m-0 text-center">Vahiddone</h4>
      <h4 class="m-0 text-center">AleMatri</h4>
      <h4 class="m-0 text-center">Aldo</h4>
      <h4 class="m-0 text-center">Frà</h4>
      <h4 class="m-0 text-center">Max</h4>

    </div>
  </footer>
  
</template>

<style lang="scss" scoped>
  footer{
    background-color: #260D07;
    color: #F2F0E4;
  }

  .wave-footer{
  height: 100px;
  background-color: #F2F0E4;
  background-image: url(./wavefooter.svg);
  background-size: cover;
  transform: scaleX(-1);
}
  
</style>