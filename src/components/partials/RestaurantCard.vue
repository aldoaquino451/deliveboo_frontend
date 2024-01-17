<script>
import { store } from "../../data/store"

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
  

  computed: {
  },

  methods: {
  },

  mounted() {
  },
  
}
</script>

<template>
  <div class="col mb-3">
    <router-link :to="{name: 'detailRestaurant', params:{slug: restaurant.slug} }">
      <div class="card" style="width: 18rem;">
        <div class="d-flex">
          <div class="card-body d-flex flex-column justify-content-between">
            <!-- <router-link class="btn btn-sm btn-success" :to="{name: 'restaurantDetails', params:{slug: restaurant.slug}}"><i class="fa-solid fa-eye"></i></router-link> -->
          </div>
        </div>
        <div class="card-body">
          <h6 class="card-title fw-bold text-uppercase">{{ restaurant.name_restaurant }}</h6>
          <p class="card-text">{{ restaurant.description }}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Tipologia: 
              <span
                v-for="typology in restaurant.typologies"
                :key="typology.id"
                class="me-2">
                {{ typology.name }}
              </span>
          </li>
        </ul>
      </div>
    </router-link>

</div>
</template>

<style lang="scss" scoped>

.card {
  min-height: 300px;
  transition: transform 0.3s ease;
  box-shadow: 0px 1px 10px 0px black;
    &:hover{
      transform: scale(1.02);
    }
    h6 {
      text-align: center;
    }
    p {
      text-align: center;
    }
}

</style>