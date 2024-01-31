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

@media screen and (max-width: 768px) {
main {
  padding-top: 80px;
}
}
</style>