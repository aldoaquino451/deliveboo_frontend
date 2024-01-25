<script>
  export default{

    name: 'Paginator',

    data(){
      return{}
    },
    
    props:{
      links: Array
    },

    methods: {
      callApi(linkUrl){
        this.$emit('callApi', linkUrl);
      }
    }
  }

</script>

<template>
  <div class="container">
    <button
    v-for="link in links"
    :key="link.label"
    v-html="link.label"
    :disabled="link.active || !link.url"
    @click="callApi(link.url)"
    ></button>
  </div>
</template>

<style>
</style>
