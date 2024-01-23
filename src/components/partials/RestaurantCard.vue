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

  <div>{{ restaurant }}</div>
  <div class="col mb-4">

    <router-link :to="{ name: 'detailRestaurant', params: {slug: restaurant.slug} }">
      <div class="card">
        <div class="card-body d-flex flex-column">
          <h6 class="card-title fw-bold text-uppercase text-center">{{ restaurant.name_restaurant }}</h6>
          <p class="card-text">{{ restaurant.description }}</p>
          <ul class="d-flex gap-1 flex-wrap-reverse justify-content-end align-content-start">
            <li v-for="typology in restaurant.typologies" :key="typology.id">
                <span class="badge bg-info">
                  {{ typology.name }}
                </span>
            </li>
          </ul>
        </div>
      </div>
    </router-link>

    <!-- 
    <router-link class="btn btn-sm btn-success" :to="{name: 'restaurantDetails', params:{slug: restaurant.slug}}">
      <i class="fa-solid fa-eye"></i>
    </router-link> -->

  </div>
</template>

<style lang="scss" scoped>

.card {
  min-height: 250px;
  transition: transform 0.3s ease;
  box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, 0.2);
  border: none !important;

  ul {
    flex-grow: 1;
  }
  
  &:hover{
    transform: scale(1.02);
  }
}

</style>