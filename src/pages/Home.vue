<script>
import axios from 'axios';
import { store } from '../data/store'; 
import Main from '../components/Main.vue';

export default{

  name: 'Home',
  components:{
    Main
  },

  data() {
    return {
      saluto: 'ciao HOME',
      store
    }
  },

  methods:{

  },

  mounted(){
    
  }

}
</script>

<template>

  <div class="container">

    <Main />

  </div>

</template>

<style lang="scss">

</style>