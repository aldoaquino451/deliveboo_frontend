<script>
import Header from './components/partials/Header.vue';
import Footer from './components/partials/Footer.vue';

export default{

  name: 'App',
  components: {
    Header,
    Footer
  },

  data() {
    return {
    }
  },

}
</script>

<template>

  <Header />
  <RouterView />
  <Footer />
  
</template>

<style>

</style>