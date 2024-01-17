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
    addTypology(typology){
      const index = this.store.searchTypologies.indexOf(typology)

      if (index === -1) {
        this.store.searchTypologies.push(typology)
      }else {
        this.store.searchTypologies.splice(index, 1)
      }

    }
  },

  mounted() {
  },
  
}
</script>

<template>
  <section>
    <div class="container">
      <nav class="d-flex flex-column align-items-center">
        <ul class="d-flex flex-wrap justify-content-center">
          <li class="list-unstyled my-1" v-for="typology in store.typologies" :key="typology.id">
            <div class="form-check">
              <input @click="addTypology(typology.id)" type="checkbox" class="btn-check" :id="typology.name" autocomplete="off" :value="typology.id">
              <label class="btn btn-outline-light" :for="typology.name">{{typology.name}}</label>
            </div>
          </li>
        </ul>
        <button @click="$emit('startSearch')" class="btn btn-light">Cerca</button>
      </nav>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  section{
    margin-top: 70px;
    background-color: orange;
    .container{
      max-width: 700px;
      .btn-outline-light{
        border-color: black;
        &:hover{
          background-color: white;
          color: black;
        }
      }
      .btn-light{
        border-color: black;
      }
    }
  }
  
</style>