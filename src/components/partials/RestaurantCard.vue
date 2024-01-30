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

  <div class="col">
    <router-link :to="{ name: 'detailRestaurant', params: {slug: restaurant.slug} }">
      <div class="item">
          <div class="polaroid">
          <img :src = restaurant?.image />
          <span class="caption">
            <p class="title fs-1">{{ restaurant.name_restaurant }}</p>
              <ul class="d-flex gap-3 row-gap-0 justify-content-center flex-wrap">
                <li v-for="typology in restaurant.typologies" :key="typology.id">
                  <span class="my-badge fs-5">{{ typology.name }}</span>
                </li>
              </ul>
          </span>
        </div> 
      </div>
    </router-link>
  </div>

</template>


<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Caveat+Brush&display=swap');

.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0,0,0,0.2);
  color: black;
  margin-left: -10px;
  min-height: 330px;
}

.polaroid > img{
  width: 100%;
  height: auto;
}
.title{
  font-family: 'Lobster', sans-serif;
  text-align: center;
  font-size: 3rem;
  line-height: 2rem;
  margin-top: 20px;
  margin-bottom: 20px;
}

.my-badge{
  display: inline;
  color: black;
  text-transform: capitalize;
}
.item {
  width: 100%;
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
  transform: scale(0.95, 0.95) rotate(0deg) !important;
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