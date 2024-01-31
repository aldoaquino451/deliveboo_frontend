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
      imageUrl: 'http://127.0.0.1:8000/storage/uploads/categories/',
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
    },
  },
  
  mounted() {
    window.scrollTo(top);
    this.getProducts(this.$route.params.slug);
  },
};
</script>

<template>

  <!-- modale per la conferma dello "svuota carrello" -->
  <div v-if="store.isPopupVisible" id="modal" class="d-flex align-items-center">
    <div class="modal-content py-3 px-5">
      <div @click="store.isPopupVisible = false" class="close-button d-flex justify-content-end mb-3">
        <i class="fa-solid fa-circle-xmark fs-4"></i>
      </div>
      <p class="text-center mt-2">Stai già acquistando da un altro ristorante.<br>Svuota il carrello o porta a termine il pagamento precedente per procedere.</p>
      <div class="d-flex gap-3 justify-content-center">
        <button @click="store.isPopupVisible = false" class="ok-btn px-3 py-2">OK</button>
      </div>
    </div>
  </div>


  <!-- Stampo l'immagine del ristorante e posiziono in absolute la sezione delle info e il botton per tornare indietro  -->
  <div id="heroes" class="position-relative">
    <div class="image">
      <img
        class="w-100 h-100 object-fit-cover"
        :src="restaurant?.image"
        alt=""
      />
    </div>

    <div class="w-100 restaurant-info">
      <div class="container d-flex justify-content-center">
          <div class="my-card-restaurant" >
            <div class="details-restaurant my-card w-100 p-4">
              <h1 class="title text-center m-0">{{ restaurant.name_restaurant }}</h1>
              <div class="text d-flex gap-2 justify-content-center">
                <span
                  class="text-capitalize fs-6 fs-md-5"
                  v-for="typology in restaurant.typologies"
                  :key="typology.id"
                  >{{ typology.name }}
                </span>
              </div>
              <p class="text mt-4 fs-6 fs-md-5 fst-italic text-center d-flex justify-content-center gap-1">
                <i class="fa-solid fa-quote-left mb-2"></i>
                {{ restaurant.description }}
                <i class="fa-solid fa-quote-right mb-2"></i>
              </p>

              <!-- Stampo le categorie del ristorante -->
              <div id="catagories" class="container mt-4">
                <div class="d-flex gap-2 gap-md-4 flex-wrap justify-content-center">
                    <a href="#products"
                      class=" menu text-center text-decoration-none text-dark"
                      @click="getProducts(restaurant.slug)">
                      <img
                        class="rounded-circle object-fit-cover"
                        :src="imageUrl + 'menu.png'"
                        alt=""/>
                      <p class="text-capitalize m-0 mt-2 fs-6">menu</p>
                    </a>

                    <a href="#products"
                      class=" menu text-center text-decoration-none text-dark"
                      @click="getProductsByCategory(restaurant.id, category.id)"
                      v-for="category in categories"
                      :key="category.id">
                      <img
                        class="rounded-circle object-fit-cover"
                        :src="imageUrl + category.image"
                        alt=""/>
                      <p class="text-capitalize m-0 mt-2">{{ category.name }}</p>
                    </a>
                </div>
              </div>
              
            </div>
          </div>
      </div>
    </div>

  </div>

  <!-- Stampo la lista dei prodotti suddivisi per categoria -->
  <div id="products">
    <div v-for="category in categories" :key="category.id">
      <div class="container mb-5" v-if="filteredProducts(category).length > 0">
        <h2 class="mb-4 fw-bold">
          {{ category.name }}
        </h2>
        
        <div class="row row-cols-1 row-cols-lg-2">
          <Product v-for="product in filteredProducts(category)" :restaurant_name="restaurant.name_restaurant" :product="product" :key="product.id"/>
        </div>

      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>

.ok-btn{
  border: none;
  border-radius: 25px;
  background-color: #A63921;
  color: white;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
  &:hover{
  background-color: #F23005;
 }
}

#modal {
  position: fixed;
  z-index: 999;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .modal-content {
    width: 400px;
    margin: 0 auto;
    margin-bottom: 100px;
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
  .image {
    height: 450px;
    background-color: white;
    border-bottom-right-radius: 75px;
    border-bottom-left-radius: 75px;
    overflow: hidden;
  }

  .restaurant-info {
    position: absolute;
    z-index: 10;
    top: 250px;
    
    .my-card-restaurant {
      min-width: 600px;
    }
    .my-card {
      border-radius: 20px;
      background-color: white;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      
      .title {
        font-family: 'Lobster', sans-serif;
        font-size: 3rem;
      }
    }
  }

  #catagories {

    .menu:first-child {
      margin-right: 30px;
    }
  
    img {
      width: 70px;
      height: 70px;
    }
  
    .menu {
      cursor: pointer;
      transition: all 0.3s;
  
      &:hover {
        scale: 1.1;
      }
    }
  }
}

#products {
  padding-top: 170px;
  padding-bottom: 150px;



  h2 {
    font-size: 2.5rem;
  }
}

@media screen and (max-width: 576px) {

#heroes {

  .restaurant-info {
    
    .my-card {
      
      .title {
        font-size: 2rem;
      }
    }
  }
}

#products {
  h2 {
    font-size: 2rem;
  }
}

}

@media screen and (max-width: 767px) {
  #heroes {

    #catagories {
  
      .menu:first-child {
        margin-right: 0px;
      }
  
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  #heroes {

    #catagories {
  
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
}

</style>
