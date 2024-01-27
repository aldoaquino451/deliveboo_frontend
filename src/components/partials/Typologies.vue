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
    <section>
      <div class="container d-flex">

        <div class="imgpizza col-3"></div>

        <div class="col-9 m-0 m-auto">
          <nav>
            <ul class="d-flex flex-wrap justify-content-center">
              <li class="m-2" v-for="typology in store.typologies" :key="typology.id">
                <!-- <span></span><span></span><span></span><span></span> -->
                  <input @click="addTypology(typology.id), $emit('startSearch')" type="checkbox" class="btn-check" :id="typology.name" autocomplete="off" :value="typology.id">
                      <label :for="typology.name">{{typology.name}}</label>
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
  padding-top: 80px;
}

body {
    margin: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

nav ul li{
  color: black;
  background-color: #F2F0E4;
  font-size: 16px;
  box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  height: 120px;
  width: 120px;
  text-transform: capitalize;
  text-align: center;
  line-height: 115px;
  transition: background-color 0.3s;
  transition: scale 0.3s;
  &:hover, &:active{
  background-color: #260D07;
  color: #F2F0E4;
  scale: 1.05;
  }
}

label{
  cursor: pointer;
} 

.imgpizza{
  background-image: url(./pizza2.png);
  background-size: cover;
  height: 300px;
}

.wave{
  height: 100px;
  background-color: #F23005;
  background-image: url(./wave.svg);
  background-size: cover;
  margin-top: 80px;
}

</style>