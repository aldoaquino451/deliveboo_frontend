<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

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
  <main>
    <RouterView />
  </main>
  <Footer />
  
</template>

<style>

main {
  background-color: #F2F0E4;
  padding-top: 100px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}
</style>