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

  computed: {
    filteredProducts() {
      return (category) => this.products.filter(product => product.category_id === category.id);
    }
  },

  mounted() {
    this.getRestaurant(this.$route.params.slug);
  },
};
</script>

<template>

  <div class="position-relative heroes w-100">
    <!-- immagine del ristorante -->
    <img
      class="w-100 h-100 object-fit-cover"
      src="/public/ristorante.jpg"
      alt=""
    />

    <!-- titolo ristorante + bottone return -->
    <div class="w-100 title-restaurant">
      <div class="container">
        <div class="row">

          <div class="col-2 d-flex justify-content-center align-items-center">
            <router-link class="btn btn-primary my-3" :to="{ name: 'home' }"
              >Torna
            </router-link>
          </div>

          <div class="col-8">
            <div class="details-restaurant card w-100 p-3">
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

        </div>
      </div>
    </div>
  </div>


  <div class="container pt-5">

    <div class="d-flex justify-content-center mt-5">
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
    </div>


    <!-- STAMPA PRODOTTI -->
    <div class="container-fluid my-products my-5" v-for="category in categories" :key="category.id">
      <div v-if="filteredProducts(category).length > 0">

        <h2 class="text-success">
          {{ category.name }}
        </h2>
        
        <div class="row">

          <div class="col-6 mb-4" v-for="product in filteredProducts(category)" :key="product.id">
              <div class="card h-100 d-flex flex-row py-3">

              <!-- <div class="debug-s">ciao</div>

              <div class="debug-m">ciao</div> -->

                <figure class="m-0 product-image">
                  <img class="w-100 h-100 object-fit-cover" src="/public/placeholder.png" alt=""/>
                </figure>

                <div class="product-details ps-3">
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
  </div>
</template>

<style lang="scss" scoped>

h1 {
  text-align: center;
}

.heroes {
  height: 350px;
  background-color: red;
  .title-restaurant {
  position: absolute;
  bottom: -125px;
}
}

.category-menu {
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    scale: 1.1;
  }
}

.my-products {

  .product-image {
    width: 40%;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .product-details {
    width:60%;
  }
}

</style>
