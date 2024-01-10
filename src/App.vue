<script>
export default{
  name: 'App',
  data() {
    return {
      saluto: 'ciao'
    }
  },
}
</script>

<template>
  <header>
  <div>
    <p class="fs-1">{{ saluto }}</p>
    <a href="http://127.0.0.1:8000/login">Login</a>
  </div>
  </header>
</template>

<style>

</style>