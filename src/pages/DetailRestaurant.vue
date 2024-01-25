<script>
import axios from "axios";
import Product from "../components/partials/Product.vue";
import { store } from "../data/store";

export default {
  name: "detailRestaurant",

  components: {
    Product
  },

  data() {
    return {
      store,
      restaurant: {},
      products: [],
      categories: [],
      productId: [],
    };
  },

  methods: {
   
    getProducts(slug) {
      axios.get(store.apiUrl + "restaurant/" + slug)
        .then( res => {
          this.restaurant = res.data;
          this.products = res.data.products;

          const visibleProducts = this.products.filter((product) => {
            return product.is_visible === 1;
          });

          this.products = visibleProducts;
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

    getProductsByCategory(restaurant_id, category_id) {
      axios.get(store.apiUrl + "restaurant/product-category/" + "productByCategory?restaurant_id=" + restaurant_id + "&category_id=" + category_id)
        .then((res) => {
          const productsRaw = res.data;

          this.products = productsRaw.filter((product) => {
            return product.is_visible === 1;
          });
        });
    },

    closePopup() {
      store.isPopupVisible = false;
    },
  },

  computed: {
    filteredProducts() {
      return (category) => this.products.filter(product => product.category_id === category.id);
    }
  },

  mounted() {
    this.getProducts(this.$route.params.slug);
  },
};
</script>

<template>

  <div v-if="store.isPopupVisible" class="custom-popup">
    <div class="popup-content">
      <p>Stai già ordinando da un altro ristorante</p>
      <button @click="closePopup">OK</button>
    </div>
  </div>

  <!-- Stampo l'immagine del ristorante e posiziono in absolute la sezione delle info e il botton per tornare indietro  -->
  <div id="heroes" class="position-relative w-100">
    <img
      class="w-100 h-100 object-fit-cover"
      :src="restaurant?.image"
      alt=""
    />

    <div class="w-100 restaurant-info">
      <div class="container">
        <div class="row">

          <div class="col-2 d-flex justify-content-center align-items-end">
            <router-link class="btn btn-primary btn-return" :to="{ name: 'home' }"
              >Torna
            </router-link>
          </div>

          <div class="col-8">
            <div class="details-restaurant card w-100 p-3">
              <h1 class="text-center">{{ restaurant.name_restaurant }}</h1>
              <div class="d-flex">
                <span class="fw-bold">Tipologia: </span>
                <span
                  class="mx-2"
                  v-for="typology in restaurant.typologies"
                  :key="typology.id"
                  >{{ typology.name }}
                </span>
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


  <!-- Stampo le categorie del ristorante -->
  <div id="catagories" class="container">
    <div class="d-flex justify-content-center">
      <div class="row">

        <div
          class="col menu text-center"
          @click="getProducts(restaurant.slug)">
          <img
            class="rounded-circle object-fit-cover"
            src="/public/pizza.jpg"
            alt=""/>
          <p class="text-uppercase m-0 mt-2">menu completo</p>
        </div>

        <div
          class="col menu text-center"
          @click="getProductsByCategory(restaurant.id, category.id)"
          v-for="category in categories"
          :key="category.id">
          <img
            class="rounded-circle object-fit-cover"
            src="/public/pizza.jpg"
            alt=""/>
          <p class="text-uppercase m-0 mt-2">{{ category.name }}</p>
        </div>

      </div>
    </div>
  </div>


  <!-- stampo la lista dei prodotti suddivisi per categoria -->
  <div id="products" class="container my-4" v-for="category in categories" :key="category.id">
    <div v-if="filteredProducts(category).length > 0">

      <h2 class="text-success mb-3 fs-2">
        {{ category.name }}
      </h2>
      
      <div class="row row-cols-1 row-cols-lg-2">
        <Product v-for="product in filteredProducts(category)" :product="product" :key="product.id"/>
      </div>

    </div>
  </div>

</template>


<style lang="scss" scoped>

#heroes {
  height: 350px;
  .restaurant-info {
    position: absolute;
    bottom: -120px;
  }
  .btn-return{
    margin-bottom: 60px;
  }
}

#catagories {
  margin-top: calc(120px + 50px);
  margin-bottom: 50px;

  img {
    width: 80px;
    height: 80px;
  }

  .menu {
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
      scale: 1.1;
    }
  }
}

</style>
