<script>
import axios from "axios";
import {
  store,
  addToCart,
  getQuantityInCart,
  removeFromCart,
} from "../data/store";

export default {
  name: "detailRestaurant",

  data() {
    return {
      restaurant: {},
      categories: [],
      products: [],
      productId: [],
    };
  },

  methods: {
    getRestaurant(slug) {
      axios.get(store.apiUrl + "restaurant/" + slug).then((res) => {
        this.restaurant = res.data;
        this.products = res.data.products;

        this.products.forEach((product) => {
          const category = product.category;
          const isCategoryAlreadyAdded = this.categories.some(
            (existingCategory) => existingCategory.id === category.id
          );

          if (!isCategoryAlreadyAdded) {
            this.categories.push(category);
          }
        });
      });
    },

    addToCart(product) {
      addToCart(product);
    },

    removeFromCart(productId) {
      removeFromCart(productId);
    },

    getQuantityInCart(product) {
      return getQuantityInCart(product);
    },

    getProductsByCategory(restaurant_id, category_id) {
      axios
        .get(
          store.apiUrl +
            "restaurant/product-category/" +
            "productByCategory?restaurant_id=" +
            restaurant_id +
            "&category_id=" +
            category_id
        )
        .then((res) => {
          this.products = res.data;
        });
    },
  },

  mounted() {
    this.getRestaurant(this.$route.params.slug);
  },
};
</script>

<template>
  <main>
    <div class="position-relative heroes w-100">
      <img
        class="w-100 h-100 object-fit-cover"
        src="/public/ristorante.jpg"
        alt=""
      />

      <div
        class="details-restaurant position-absolute start-50 translate-middle-x card w-50 p-3"
      >
        <h1>{{ restaurant.name_restaurant }}</h1>

        <div class="d-flex">
          <span class="fw-bold">Tipologia: </span>
          <span
            class="mx-2"
            v-for="typology in restaurant.typologies"
            :key="typology.id"
            >{{ typology.name }}</span
          >
        </div>

        <p class="mt-3">
          <span class="fw-bold">Descrizione:</span> {{ restaurant.description }}
        </p>
      </div>
    </div>

    <div class="container">
      <router-link class="btn btn-primary my-3" :to="{ name: 'home' }"
        >Torna alla lista ristoranti
      </router-link>
      <div class="d-flex justify-content-center mt-5">
        <!-- PROVA -->
        <div class="row pt-5">
          <div
            class="col category-menu text-center"
            @click="getRestaurant(restaurant.slug)"
          >
            <img
              class="rounded-circle object-fit-cover"
              width="80"
              height="80"
              src="/public/pizza.jpg"
              alt=""
            />
            <p>MENU COMPLET0</p>
          </div>
          <div
            class="col category-menu text-center"
            @click="getProductsByCategory(restaurant.id, category.id)"
            v-for="category in categories"
            :key="category.id"
          >
            <img
              class="rounded-circle object-fit-cover"
              width="80"
              height="80"
              src="/public/pizza.jpg"
              alt=""
            />
            <p class="text-uppercase">{{ category.name }}</p>
          </div>
        </div>
        <!-- FINE PROVA -->

        <!-- <button @click="getRestaurant(restaurant.slug)" type="button" class="btn btn-warning mx-2 text-center">Tutto</button> -->

        <!-- <button @click="getProductsByCategory(restaurant.id, category.id)" v-for="category in categories" :key="category.id" type="button" class="btn btn-warning mx-2 text-center">{{category.name}}</button> -->
      </div>

      <div class="my-5" v-for="category in categories" :key="category.id">
        <h2
          v-if="
            this.products.some((product) => product.category_id === category.id)
          "
          class="text-success"
        >
          {{ category.name }}
        </h2>

        <div class="row my-5">
          <div v-for="product in products" :key="product.id" class="col-6 mb-4">
            <div class="card h-100 d-flex flex-row py-3 pe-3">
              <figure>
                <img class="w-100 h-100 object-fit-cover" src="/public/placeholder.png" alt=""/>
              </figure>
              <div class="content-details ps-3">
                <h4>{{ product.name }}</h4>
                <p><span class="fw-bold">Ingredienti:</span>{{ product.ingredients }}</p>
                <p><span class="fw-bold">Prezzo: </span>€ {{ product.price }}</p>
                <p v-if="product.is_vegan">prodotto vegano</p>

                <div>
                  <button class="btn btn-success" @click="addToCart(product)">+</button>
                  <span v-if="getQuantityInCart(product) > 0">
                    <span>Quantità nel carrello:{{ getQuantityInCart(product) }}</span>
                    <button class="btn btn-success" @click="removeFromCart(product.id)">-</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-top: 70px;

  h1 {
    text-align: center;
  }

  .heroes {
    height: 350px;
    background-color: red;

    .details-restaurant {
      top: 75%;
    }
  }

  .category-menu {
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      scale: 1.1;
    }
  }

  figure {
    width: 300px;
    height: 300px;
    overflow: hidden;
  }
}
</style>
