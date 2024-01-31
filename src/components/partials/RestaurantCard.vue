<template>
  <div class="col-12 d-flex justify-content-center">
    <router-link :to="{ name: 'detailRestaurant', params: { slug: restaurant.slug } }">
      <div
        class="item"
        :style="{ transform: `rotate(${rotation}deg)` }"
        @mouseenter="handleHover(true)"
        @mouseleave="handleHover(false)"
      >
        <div class="polaroid">
          <img :src="restaurant?.image" />
          <!-- <img src="/logoristo.png" /> -->
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

<script>
import { store } from "../../data/store";

export default {
  name: 'RestauranCard',
  data() {
    return {
      store,
      rotation: 0,
      isHovered: false,
    };
  },
  props: {
    restaurant: Object,
  },
  methods: {
    handleHover(status) {
      this.isHovered = status;
    },
  },
  mounted() {
    this.rotation = Math.floor(Math.random() * (15 - (-15) + 1)) + (-15);
  },
};
</script>

<style lang="scss" scoped>

.polaroid {
  background: #fff;
  padding: 1rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0,0,0,0.2);
  color: black;
  margin-left: -10px;
  height: 375px;
}

.polaroid > img{
  width: 100%;
  height: 200px;
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
  width: 300px;
  display: inline-block;
  margin-top: 2rem;
  filter: grayscale(100%);
  transition: all 0.35s;
}

.item.hovered {
  filter: none;
  transform: scale(1.2, 1.2) rotate(0deg) !important;
}

.item .polaroid:before {
  content: '';
  position: absolute;
  z-index: -1;
  transition: all 0.35s;
}

.item.hovered .polaroid:before {
  content: '';
  position: absolute;
  transform: rotate(0deg);
  height: 90%;
  width: 90%;
  bottom: 0%;
  right: 5%;
  box-shadow: 0 1rem 3rem rgba(0,0,0,0.2);
  transition: all 0.35s;
  z-index: -1;
}

.item:hover {
  filter: none;
  transform: scale(1.2, 1.2) rotate(0deg) !important;
  transition: all 0.35s;
  z-index: 999;
}

.polaroid:hover{
  z-index: 999;
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
