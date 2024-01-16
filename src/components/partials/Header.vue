<script>
import { store } from '../../data/store';

export default{

  name: 'Header',
  components: {
  },

  data() {
    return {
      store
    }
  },

}
</script>

<template>

  <header>
    <div class="container">
      <div class="row d-flex justify-content-between">
        <div class="col-2">LOGO</div>
        <div class="col-4 d-flex justify-content-between">
          <a :href="store.loginUrl">Login</a>
          <div>Chart</div>
        </div>
      </div>
    </div>

  </header>
  
</template>

<style lang="scss" scoped>

</style>

