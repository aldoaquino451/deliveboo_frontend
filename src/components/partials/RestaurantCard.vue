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

  <router-link :to="{ name: 'detailRestaurant', params: {slug: restaurant.slug} }" class="mb-5">
    <div class = "__area text-center">
      <div href = "#" class = "__card">
        <img src = "https://i.pinimg.com/originals/74/84/4c/74844c4207ec819b6ffaa6291591311e.jpg" class="img-fluid __img"/>
        <div class = "__card_detail text-left">
          <h4>{{ restaurant.name_restaurant }}</h4>
          <p class="card-text">{{ restaurant.address }}</p>
          <div class = "__type">
            <ul class="d-flex flex-wrap">
                <li v-for="typology in restaurant.typologies" :key="typology.id">
                    <span class="badge">
                      {{ typology.name }}
                    </span>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </router-link>

  <!-- 
  <router-link class="btn btn-sm btn-success" :to="{name: 'restaurantDetails', params:{slug: restaurant.slug}}">
    <i class="fa-solid fa-eye"></i>
  </router-link> -->

</template>

<style lang="scss" scoped>

.__area {
  color: #7c7671;

  .__card {
    max-width: 300px;
    margin: auto;
    cursor: pointer;
    position: relative;
    display: inline-block;

    &:hover {
      .__card_detail {
        transform: scale(1.08);
      }
    }
  }

  .__img {
    border-radius: 10px;
    box-shadow: 0px 0px 7px 4px rgba(0, 0, 0, 0.2);
  }

  .__card_detail {
    position: relative;
    height: 150px;
    box-shadow: 0 4px 15px rgba(175, 77, 0, 0.13);
    padding: 13px;
    border-radius: 8px;
    margin: -30px 10px 0;
    position: relative;
    z-index: 2;
    background-color: #fff;
    transition: transform 0.3s ease;

    h4 {
      color: #474340;
      line-height: 100%;
      font-weight: bold;
    }

    p {
      font-size: 13px;
      font-weight: bold;
      margin-bottom: 0.4rem;
    }
  }

  .__type {
    position: absolute;
    bottom: 10px;
    left: 10px;
    span {
      background-color: #f2f0e4;
      padding: 5px 10px 7px;
      border-radius: 5px;
      display: inline-block;
      margin-right: 10px;
      font-size: 12px;
      color: #a63921;
      font-weight: bold;
      line-height: 100%;
    }
  }
}
</style>