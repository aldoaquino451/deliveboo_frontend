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
  .btn{
    color: #260D07;
    background-color: #F2F0E4;
    border: 1px solid #260D07;
    margin-right: 6px;
    &:hover{
      color: #F2F0E4;
      background-color: #260D07;
      border: 1px solid #260D07;
    }
    &:disabled{
    color: #260D07;
    background-color: #F2F0E4;
    border: 1px solid #260D07;
    }
  }
</style>
