<script>
import axios from 'axios';
import { store } from '../data/store'; 
import Main from '../components/Main.Vue';

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

  <div>
    <p class="fs-1">{{ saluto }}</p>
  </div>

  <Main />

</template>

<style lang="scss">

</style>