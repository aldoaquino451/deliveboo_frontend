<script>

export default{
  name: 'Paginator',

  props:{
    links: Array
  },

}
</script>


<template>

  <div class="container"> 
    <button
      v-for="(link, index) in links"
      @click="$emit('getPage', link.url)"
      :key="index"
      :disabled="link.active || !link.url"
      v-html="link.label"
      class="btn btn-outline-primary"
    ></button>
  </div>

</template>


<style lang="scss">

</style>
