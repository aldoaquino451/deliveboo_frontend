<script>
import { store } from "../../data/store"

export default {
  name: 'SearchByTypologies',
  data() {
    return {
      store,
      
    }
  },

  computed: {
  },

  methods: {
  },

  mounted() {
  },
  
}
</script>

<template>
  <div class="container">
    <h1>CERCA PER TIPOLOGIA</h1>
    <nav class="d-flex flex-column align-items-center">
      <ul class="d-flex flex-wrap justify-content-center">
        <li class="list-unstyled my-1" v-for="typology in store.typologies" :key="typology.id">
          <div class="form-check">
            <input type="checkbox" class="btn-check" :id="typology.name" autocomplete="off" :value="typology.name">
            <label class="btn btn-outline-primary" :for="typology.name">{{typology.name}}</label>
          </div>
        </li>
      </ul>
      <button class="btn btn-primary">Cerca</button>
    </nav>
  </div>


</template>

<style lang="scss" scoped>
  
</style>