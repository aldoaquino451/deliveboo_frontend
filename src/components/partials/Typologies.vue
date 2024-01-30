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
  
  <section>
    <div class="container">
      
      <div class="row">

        <div class="imgpizza col-4 d-none d-xl-block"></div>

        <nav class="col-12 col-xl-8">
          <ul class="d-flex flex-wrap justify-content-center mx-xl-4">
            <li :class="typology.restaurants.length ? 'm-2' : 'd-none'" v-for="typology in store.typologies" :key="typology.id">

              <button
                @click="addTypology(typology.id), $emit('startSearch')"
                type="checkbox"
                class="toggle-button"

                :id="typology.name"
                autocomplete="off"
                :value="typology.id"
                :class="{ active: store.searchTypologies.includes(typology.id) }"
              >
                <label :for="typology.name">{{ typology.name }}</label>
              </button>

            </li>
          </ul>
        </nav>

      </div>

    </div>

    <div class="wave"></div>

  </section>

</template>

<style lang="scss" scoped>

section{
  background-color: #F23005;
  padding-top: 30px;
}

nav ul {
    list-style-type: none;
    padding-top: 100px;
}

button {
  padding: 0.6em 1em;
  border: 4px solid #F2F0E4;
  transition: ease-in-out 0.3s;
  background-color: transparent;
  color: #F2F0E4;
  font-weight: bolder;
  font-size: 20px;
  font-family: sans-serif;
  margin: 3px;
  cursor: pointer;
  border-radius: 15px;
  text-transform: capitalize;
}
 
 button:hover {
  transform: scale(1.2) rotate(10deg);
  background-color: #fa725a;
  color: white;
 }

 .toggle-button.active {
  transform: scale(1.2) rotate(10deg);
  background-color: #fa725a;
  color: white;
  transition: none;
}

label{
  cursor: pointer;
} 

.imgpizza{
  background-image: url(./pizza2.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 450px;
  background-position: center;
}

.wave{
  height: 100px;
  background-color: #F23005;
  background-image: url(./wave.svg);
  background-position: center;
  background-size: cover;
  margin-top: 80px;
}

.container-fr{
  width: 1500px;
  margin: 0 auto;
}

</style>