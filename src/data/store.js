import { reactive } from 'vue';

// funzioni utilizzate :
// store.saveCart = saveCart;
// saveCart(cart)
// loadCart()
// export addToCart(product)
// export removeFromCart(productId)
// export removeFromCart(productId) 
// export getQuantityInCart(product)

export const store = reactive({
  apiUrl: "http://127.0.0.1:8000/api/",
  loginUrl: "http://127.0.0.1:8000/login/",

  cart: loadCart(),

  typologies: [],
  restaurants: [],
  searchTypologies: [],

  cartPrint: [],
  totalAmountPrint: [],
});

// Salvo il carrello
store.saveCart = saveCart;


// Salvo il carrello in store
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// Carico il carrello in store
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}


// Aggiungo al carrello
export function addToCart(product) {
  const existingProduct = store.cart.find(item => item.product.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    if (store.cart.length === 0) {
      store.cart.push({ product, quantity: 1 });
    } else if (store.cart[0].product.restaurant_id === product.restaurant_id) {
      store.cart.push({ product, quantity: 1 });
    } else {
      store.isPopupVisible = true;
    }
  }

  saveCart(store.cart);
}


// Rimuovo dal carrello
export function removeFromCart(product_id) {
  const cartItem = store.cart.find(item => item.product.id === product_id);

  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      store.cart = store.cart.filter(item => item.product.id !== product_id);
    }

    saveCart(store.cart);
  }
}
