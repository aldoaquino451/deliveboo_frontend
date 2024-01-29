<script>
import { store } from "../../data/store";

export default {
  name: 'RestauranCard',
  data() {
    return {
      store,
    }
  },

  props: {
    restaurant: Object
  },
 
}
</script>

<template>

  <section>

    <router-link :to="{ name: 'detailRestaurant', params: {slug: restaurant.slug} }">

      <!-- <div class="card">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold text-uppercase text-center">{{ restaurant.name_restaurant }}</h6>
          <p class="card-text">{{ restaurant.description }}</p>
          <ul class="d-flex gap-1 flex-wrap-reverse justify-content-end align-content-start">
            <li v-for="typology in restaurant.typologies" :key="typology.id">
                <span class="badge">
                  {{ typology.name }}
                </span>
            </li>
          </ul>
        </div>
      </div> -->

      <div class ="wrapper">

        <div class="item">
          <div class="polaroid">
            <img src = "https://i.pinimg.com/originals/74/84/4c/74844c4207ec819b6ffaa6291591311e.jpg"/>
            <span class="caption">
              <p class="title">{{ restaurant.name_restaurant }}</p>
                <ul class="d-flex justify-content-center">
                  <li v-for="typology in restaurant.typologies" :key="typology.id">
                    <span class="badge">{{ typology.name }}</span>
                  </li>
                  </ul>
            </span>
          </div>
        </div>

      </div>

    </router-link>

    <!-- 
    <router-link class="btn btn-sm btn-success" :to="{name: 'restaurantDetails', params:{slug: restaurant.slug}}">
      <i class="fa-solid fa-eye"></i>
    </router-link> -->

  </section>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');

section {
  font-family: 'Caveat Brush', cursive;
  margin-bottom: 60px;
}
section:hover{
  z-index: 99;
}
.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0,0,0,0.2);
  width: 330px;
  color: black;
  margin-left: -10px;
  min-height: 330px;
}

.polaroid:hover{
  z-index: 30;
}
.polaroid > img{
  max-width: 100%;
  height: auto;
}
.title{

  text-align: center;
    font-size: 3rem;
    line-height: 2rem;
    margin-top: 10px;
    margin-bottom: 10px;
}

.badge{
    font-weight: 500;
    display: inline;
    color: black;
    font-size: 1.5rem;
    text-align: center;
    text-transform: capitalize;
}
.item {
  width: 30%;
  display: inline-block;
  margin-top: 2rem;
  filter: grayscale(100%);
}
.item .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) {
  transform: scale(0.8, 0.8) rotate(5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+1) .polaroid:before {
  transform: rotate(6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+2) {
  transform: scale(0.8, 0.8) rotate(-5deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+2) .polaroid:before {
  transform: rotate(-6deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.4);
}
.item:nth-of-type(4n+4) {
  transform: scale(0.8, 0.8) rotate(3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+4) .polaroid:before {
  transform: rotate(4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  right: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:nth-of-type(4n+3) {
  transform: scale(0.8, 0.8) rotate(-3deg);
  transition: all 0.35s;
}
.item:nth-of-type(4n+3) .polaroid:before {
  transform: rotate(-4deg);
  height: 20%;
  width: 47%;
  bottom: 30px;
  left: 12px;
  box-shadow: 0 2.1rem 2rem rgba(0,0,0,0.3);
}
.item:hover {
  filter: none;
  transform: scale(1, 1) rotate(0deg) !important;
  transition: all 0.35s;
}

.item:hover .polaroid:before {
  content: '';
  position: absolute;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.2);
  transition: all 0.35s;
}

</style>