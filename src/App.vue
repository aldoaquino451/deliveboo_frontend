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
<<<<<<< HEAD
=======
      login: 'http://127.0.0.1:8000/login',
>>>>>>> d11db01f91deac39350b357495fabbbf51044695
    }
  },

}
</script>

<template>
<<<<<<< HEAD

  <Header />
  <RouterView />
  <Footer />
  
=======
  <header class="bg-dark text-light py-2">
    <div class="container h-100 d-flex justify-content-between  align-items-center">
      <span class="fs-1">Header</span>
        <a class="btn btn-primary" :href="login">Login</a>
    </div>
  </header>

  <main class="py-4">
    <div class="container d-flex flex-column align-items-center">
      <h1>titolo</h1>
      <div>
      </div>
    
    </div>
  </main>

  <footer  class="bg-dark text-light py-2">
    <div>Chi siamo</div>
    <div>Info</div>
    <div>Social</div>
  </footer>
>>>>>>> d11db01f91deac39350b357495fabbbf51044695
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header {
  height: 80px;
}
main {
  flex-grow: 2;
}

</style>