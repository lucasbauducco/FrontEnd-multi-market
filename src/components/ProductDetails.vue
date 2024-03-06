<template>
    <div class="product-details">
        <div class="product-image">
            <img :src="product.image_base64 ? product.image_base64 : defaultImage" alt="Imagen del producto">
        </div>
        <div class="product-info">
          <h2 class="product-name">{{ product.name }}</h2>
            <div class="product-price" v-if="product.discount!=0">
                  <div class="card-discount">Descuento: - {{ product.discount }}%</div>
                  <div class="card-price cross-out">Precio: ${{ product.price }}</div>
                  <div class="card-price">Precio: ${{ product.price - ((product.discount * product.price) / 100 )}}</div>
            </div>
            <div class="product-price card-price" v-else >Precio: ${{ product.price }}</div>
            <div class="product-description">
              <span>Descripción:</span>
              {{ product.description  }}
            </div>
            <div class="shop-info">
              <span>Contacto</span>
              <span>{{ shop.razon_social }} </span>
              <div>
                <button @click="contactarWhatsApp(shop.telefono)">Contactar por WhatsApp</button>
              </div>
              <a href="mailto:shop.email">
                <img :src="emailIconPath" alt="go to email">
              </a>
            </div>
            <!-- Datos del vendedor y más información aquí -->
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import defaultImage from '@/assets/image/product/noImage.png';
  export default {
    props: ['productId'],
    data() {
      return {
        emailIconPath: require('@/assets/svg/email_black_24dp.svg'),
        shop: {},
        product: {
            image_base64: defaultImage,
        }
        // Aquí iría la lógica para obtener los detalles del producto utilizando el productId
      };
    },
    methods: {
      contactarWhatsApp(numero) {
        const urlWhatsApp = `https://wa.me/${numero}`;
        // Redirige al usuario a la URL
        window.open(urlWhatsApp, '_blank');
      },
      async fetchProductDetails() {
        const productId = this.$route.params.productId; // Asumiendo que estás usando vue-router
        await axios.get(`http://127.0.0.1:8000/api/product/${productId}/`)
          .then(async response => {
            this.product = response.data;
            await axios.get(`http://127.0.0.1:8000/api/product/${productId}/shop/`)  // Ajusta la URL según tu configuración de URL
              .then(response => {
                this.shop = response.data;  // Guarda la información del shop
              })
              .catch(error => {
                console.error("Error al obtener los detalles del producto:", error);
              });
            // Si tu API no devuelve una imagen en base64 y en su lugar devuelve una URL, ajusta la asignación aquí
          })
          .catch(error => {
            console.error("Error al obtener los detalles del producto:", error);
          });
      }
    },
    mounted() {
      this.fetchProductDetails();
    }
  }
  </script>
  
  <style>
.product-details {
  display: flex;
  flex-direction: row;
  margin: 4rem;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
}
.product-image {
  width: 60%;
  display: flex; 
  justify-content: center; 
  align-items: center; 
  margin: 1rem;
}
.product-image img{
  width: 100%;
  max-width: 500px; 
  height: auto; 
}

.product-info {
  margin: 1rem;
  padding: 2rem;
  background-color: #fff; /* Fondo claro */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra suave */
  border-radius: 8px; /* Bordes suavizados */
  display: flex;
  flex-direction: column;
}
.product-name {
  font-size: 2rem; /* Nombre del producto más grande */
  margin-bottom: 1rem;
  color: #333; /* Color oscuro para mayor contraste */
}
.product-price{
  margin-top: 1rem;
}
.card-price {
  font-weight: bold; /* Precio más destacado */
}
.product-description{
  margin-top: 2rem;
  line-height: 1.5; /* Mejorar la legibilidad */
}
.shop-info{
  display: flex; 
  flex-direction: column;
}
.shop-info span, .shop-info div {
  margin-top: 0.5rem;
}
@media screen and (max-width: 768px) {
  .product-details{
    flex-direction: column;
  }
  .product-info{
    margin-top: 2rem;
  }
}
  </style>
  