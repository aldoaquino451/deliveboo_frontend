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

        <div class="img-pizza col-3 d-none d-xl-block"></div>

        <nav class="col-12 col-xl-9">
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
  padding: 0.5em 0.8em;
  border: 3px solid #F2F0E4;
  transition: ease-in-out 0.3s;
  background-color: transparent;
  color: #F2F0E4;
  font-weight: bolder;
  font-size: 20px;
  margin: 3px;
  cursor: pointer;
  border-radius: 15px;
  text-transform: capitalize;
  
  &:hover {
   transform: scale(1.1) rotate(10deg);
   background-color: #fa725a;
   color: white;
  }
  &.toggle-button.active {
   transform: scale(1.1) rotate(10deg);
   background-color: #fa725a;
   color: white;
   transition: none;
  }
}
 


label{
  cursor: pointer;
} 

.img-pizza{
  background-image: url(./sushi.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 350px;
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

@media screen and (max-width: 568px) {
  
  nav ul {
    padding-top: 50px;
  }

  button {
  padding: 0.4em 0.6em;
  border: 2px solid #F2F0E4;
  font-weight: normal;
  font-size: 16px;
  margin: 3px;
  border-radius: 10px;
  }
}
</style>