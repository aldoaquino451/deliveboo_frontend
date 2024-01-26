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

  <!-- modale per la conferma dello "svuota carrello" -->
  <div v-if="store.isPopupVisible" id="modal">
    <div class="modal-content p-4 px-5">
      <div @click="closePopup" class="close-button d-flex justify-content-end mb-3">
        <i class="fa-solid fa-circle-xmark fs-4"></i>
      </div>
      <p class="text-center">Attenzione! <br> Stai già acquistando da un altro ristorante.<br>Svuota il carrello o porta a termine il pagamento precedente per procedere.</p>
      <div class="d-flex gap-3 justify-content-center">
        <button @click="store.isPopupVisible = false" class="btn btn-secondary">OK</button>
      </div>
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
              <div class="mt-1 d-flex gap-2">
                <span
                  class="badge bg-success  "
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
    <div class="d-flex gap-4 justify-content-center">
        <a href="#products"
          class=" menu text-center text-decoration-none text-dark"
          @click="getProducts(restaurant.slug)">
          <img
            class="rounded-circle object-fit-cover"
            src="/public/pizza.jpg"
            alt=""/>
          <p class="text-capitalize m-0 mt-2 fs-6">menu completo</p>
        </a>

        <a href="#products"
          class=" menu text-center text-decoration-none text-dark"
          @click="getProductsByCategory(restaurant.id, category.id)"
          v-for="category in categories"
          :key="category.id">
          <img
            class="rounded-circle object-fit-cover"
            src="/public/pizza.jpg"
            alt=""/>
          <p class="text-capitalize m-0 mt-2">{{ category.name }}</p>
        </a>
    </div>
  </div>


  <!-- Stampo la lista dei prodotti suddivisi per categoria -->
  <div id="products" class="container mb-5">
    <div v-for="category in categories" :key="category.id">
      <div v-if="filteredProducts(category).length > 0">

        <h2 class="text-success mb-3 fs-2">
          {{ category.name }}
        </h2>
        
        <div class="row row-cols-1 row-cols-lg-2">
          <Product v-for="product in filteredProducts(category)" :product="product" :key="product.id"/>
        </div>

      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>

#modal {
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .modal-content {
    width: 450px;
    margin: 100px auto;
    border-radius: 20px;
    background-color: white;
    .close-button {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}

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

  img {
    width: 80px;
    height: 80px;
  }

  .menu {
    img {
      
      border: 4px solid white;
    }
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      scale: 1.2;
    }
  }
}

#products {
  padding-top: 80px;
  padding-bottom: 150px;
}

</style>
