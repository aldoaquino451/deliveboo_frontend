<script>
export default{
  name: 'App',
  data() {
    return {
      login: 'http://127.0.0.1:8000/login',
    }
  },
}
</script>

<template>
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