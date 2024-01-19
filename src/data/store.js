import { reactive } from 'vue';

// Salvo il carrello nello storage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Carico il carrello nello storage
function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export const store = reactive({
  apiUrl: "http://127.0.0.1:8000/api/",
  loginUrl: "http://127.0.0.1:8000/login/",
  restaurants: [],
  typologies: [],
  searchTypologies: [],
  cart: loadCart(),  // Carico il carrello al momento dell'inizializzazione
});

// Aggiungo al carrello
export function addToCart(product) {
  const existingProduct = store.cart.find(item => item.product.id === product.id);

  if (existingProduct) {
    // Se il prodotto esiste già nel carrello, incrementa la quantità
    existingProduct.quantity++;
  } else {
    // Se il prodotto non esiste ancora nel carrello, aggiungilo con quantità 1
    store.cart.push({ product, quantity: 1 });
  }

  saveCart(store.cart);
}

// Rimuovo dal carrello
export function removeFromCart(productId) {
  store.cart = store.cart.filter(item => item.product.id !== productId);
  saveCart(store.cart);
}

// Funzione per ottenere la quantità di un prodotto nel carrello
export function getQuantityInCart(product) {
  const cartItem = store.cart.find(item => item.product.id === product.id);
  return cartItem ? cartItem.quantity : 0;
}

store.saveCart = saveCart;