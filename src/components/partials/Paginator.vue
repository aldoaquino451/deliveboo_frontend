<script>

export default{
  name: 'Paginator',

  props:{
    links: Array
  },

}
</script>


<template>

<div class="custom-paginator">
    <button
      v-for="(link, index) in links"
      @click="$emit('getPage', link.url)"
      :key="index"
      :disabled="link.active || !link.url"
      v-html="link.label"
      class="btn"
      :class="{ 'btn-outline-danger': !link.active, 'btn-danger': link.active }"
    ></button>
  </div>

</template>


<style lang="scss" scoped>

.custom-paginator {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.btn {
  margin: 0 3px;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn-outline-primary {
  color: #F2542F;
  background-color: transparent;
  border: 1px solid #F2542F;
}

.btn-primary {
  color: #fff;
  background-color: #F2542F;
  border: 1px solid #F2542F;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

</style>
