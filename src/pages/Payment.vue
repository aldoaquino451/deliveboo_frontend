<script>
import axios from "axios";
import { store } from "../data/store";
import braintree from "braintree-web";

export default {
  data() {
    return {
      title: "Pagamento",
      braintreeClient: null,
      hostedFields: null,
      total: 0,
      cardTypeImage: null,
    };
  },

  computed: {
    cartTotal() {
      return this.$store.state.cartTotal;
    },
  },

  mounted() {
    this.setupPayment();
  },

  methods: {
    async setupPayment() {
      try {
        // Elimina i campi Hosted Fields precedenti, se presenti
        if (this.hostedFields) {
          this.hostedFields.teardown();
        }

        const response = await axios.get(store.apiUrl + "orders/generate");
        const clientToken = response.data.token;

        this.braintreeClient = await braintree.client.create({
          authorization: clientToken,
        });

        // Inizializza i campi per l'input della carta
        const hostedFieldsInstance = await braintree.hostedFields.create({
          client: this.braintreeClient,
          fields: {
            number: {
              selector: "#card-number",
              placeholder: "Inserisci numero carta",
            },
            expirationDate: {
              selector: "#expiration-date",
              placeholder: "MM / YY",
            },
            cvv: {
              selector: "#cvv",
              placeholder: "CVV",
            },
          },
        });

        this.hostedFields = hostedFieldsInstance;

        this.hostedFields.on("cardTypeChange", (event) => {
          const cardType = event.cards[0].type;
          const imagePath = `/img/card-images/${cardType}.png`;

          // Verifica se l'immagine esiste
          this.checkImageExists(imagePath)
            .then((exists) => {
              if (exists) {
                this.cardTypeImage = imagePath;
              } else {
                this.cardTypeImage = null;
              }
            })
            .catch((error) => {
              console.error(
                "Errore durante il caricamento dell'immagine:",
                error
              );
              this.cardTypeImage = null;
            });
        });
      } catch (error) {
        console.error("Errore durante l'inizializzazione di Braintree:", error);
      }
    },

    // Funzione per verificare se l'immagine esiste
    checkImageExists(imageUrl) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imageUrl;
      });
    },

    async handlePayment() {
      this.total = this.cartTotal;

      try {
        const { nonce } = await this.hostedFields.tokenize();

        // Invia il nonce alla tua API per elaborare il pagamento
        const response = await axios.post(store.apiUrl + "orders/make-payment", {
          amount: this.total,
          token: nonce,
        });

        console.log("Risposta pagamento: positiva", response.data);
        // svuoto il carrello e il localStorage se il pagamento è stato effettuato
        this.$store.commit("clearCart");

        this.hostedFields.teardown();
        // vado alla rotta di ringraziamento
        router.push({ name: "thanks" });
      } catch (error) {
        console.error("Errore durante il pagamento:", error);
      }
    },
  },
};
</script>

<template>
  <div class="wrapper-payment" style="height: 65vh">
    <div class="container">
      <div class="row" style="margin-top: 100px">
        <h1>{{ title }}</h1>
        <!-- Colonna per l'inserimento dei dati -->
        <div class="col-md-6">
          <form
            class="ms-auto row my-2 payment-form"
            @submit.prevent="handlePayment"
          >
            <!-- Campi per l'inserimento dei dati della carta -->
            <div class="form-group my-3 col-12">
              <label for="card-number">Cart Number</label>
              <div id="card-number"></div>
            </div>

            <div class="form-group my-3 col-12">
              <label for="expiration-date">Expiration Date</label>
              <div id="expiration-date"></div>
            </div>

            <div class="form-group my-3 col-12">
              <label for="cvv">CVV</label>
              <div id="cvv"></div>
            </div>

            <div class="text-center col-12">
              <button type="submit" class="btn btn-primary">Pay</button>
            </div>
          </form>
        </div>

        <!-- Colonna per l'immagine del tipo di carta -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <!-- Visualizza il messaggio se l'immagine della carta non è disponibile -->
          <img
            v-if="cardTypeImage !== null && cardTypeImage !== undefined"
            :src="cardTypeImage"
            alt="Card Type"
            class="img-fluid"
          />
          <p v-else>Carta non riconosciuta</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Aggiunta stile per rendere l'immagine responsive */
.img-fluid {
  max-width: 100%;
  height: auto;
}
.payment-form {
  /* Aggiunta dello sfondo grigio (#e9eaec) */
  background-color: #e9eaec;
  /* Aggiunta di spaziatura interna */
  padding: 20px;
  /* Bordo arrotondato */
  border-radius: 8px;
  /* Aggiunta di ombra per uno stile più marcato */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#card-number,
#expiration-date,
#cvv {
  background-color: #dadada;
  border-radius: 5px;
  color: #dadada;
  font-weight: 600;
  padding: 7px 10px;
  border: none;
  display: block;
  width: 100%;
  height: 40px;
}
</style>