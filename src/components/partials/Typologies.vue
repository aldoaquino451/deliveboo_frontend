<script>
import { store } from "../../data/store"

export default {
  name: 'SearchByTypologies',
  data() {
    return {
      store,
    }
  },

  methods: {
    addTypology(typology_id){
      const index = store.searchTypologies.indexOf(typology_id);

      if (index === -1) {
        store.searchTypologies.push(typology_id)
      }else {
        store.searchTypologies.splice(index, 1)
      }

    },
  },
  
}
</script>

<template>
  
    <!-- dentro l'input vengono passate due funzioni: quella che aggiunge la tipologia all'array e quella che fa partire la ricerca -->
    <section class="py-4">
      <div class="container">
          <ul class="d-flex flex-wrap justify-content-center row-gap-3 column-gap-3">
            <li v-for="typology in store.typologies" :key="typology.id">
                <input @click="addTypology(typology.id), $emit('startSearch')" type="checkbox" class="btn-check" :id="typology.name" autocomplete="off" :value="typology.id">
                <label class="btn btn-light text-capitalize" :for="typology.name">{{typology.name}}</label>
            </li>
          </ul>
      </div>
    </section>

</template>

<style lang="scss" scoped>

.container{
  max-width: 800px;

  label, button {
    box-shadow: 0px 0px 6px 1px rgba(0, 0, 0, 0.3);
  }
}

</style>