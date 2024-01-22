import { reactive } from 'vue';

// Salvo il carrello in store
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Carico il carrello in store
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export const store = reactive({
  apiUrl: "http://127.0.0.1:8000/api/",
  loginUrl: "http://127.0.0.1:8000/login/",
  restaurants: [],
  typologies: [],
  searchTypologies: [],
  cart: loadCart(),
  cartPrint: [],
  totalAmountPrint: []
});

// Aggiungo al carrello
export function addToCart(product) {
  const existingProduct = store.cart.find(item => item.product.id === product.id);
  
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    if(store.cart.length === 0){
      store.cart.push({ product, quantity: 1 });
    } else if (store.cart[0].product.restaurant_id === product.restaurant_id){
      store.cart.push({ product, quantity: 1 });
    } else {
      console.log("non puoi ordinare su ristoranti diversi");
      window.alert("Non puoi ordinare su ristoranti diversi");
    }
  }
  
  saveCart(store.cart);
}

// Rimuovo dal carrello
export function removeFromCart(productId) {
  const cartItem = store.cart.find(item => item.product.id === productId);

  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
    } else {
      store.cart = store.cart.filter(item => item.product.id !== productId);
    }

    saveCart(store.cart);
  }
}

// Funzione per avere la quantità di un prodotto nel carrello
export function getQuantityInCart(product) {
  const cartItem = store.cart.find(item => item.product.id === product.id);
  return cartItem ? cartItem.quantity : 0;
}

store.saveCart = saveCart;