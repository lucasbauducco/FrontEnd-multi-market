<template>
    <section class="carousel">
      <carousel  :autoplay="4000" :wrap-around="true">
        <slide v-for="(image, slide) in images" :key="slide" class="slide">
          <div class="carousel__item">
            <img :src="image" alt="Slide Image" style="width: 100vw;">
          </div>
        </slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </carousel>
      <router-view class="container-offers" name="offers" :shopId="-1" :isAuthenticate="false" ></router-view>
    </section>
  </template>
  
  <script>
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
  export default {
    name: 'HomeDjango',
    data() {
      return {
        images: [
          require('@/assets/image1.jpg'),
          require('@/assets/oferta-flashs-2semana-1536x400.jpg'),
          require('@/assets/image1.jpg'),
        ]
      }
    },
    components: {
      Carousel,
      Slide,
      Pagination,
      Navigation,
    }
    // Otras opciones del componente como data, methods, etc.
  };
  </script>
  
  <style>
  body{
    margin: 0;
    padding: 0;
  }
  .carousel{
    position: relative;
    display: inline-block; /* O 'block' dependiendo de tu necesidad */
    width: 100%; /* Hace que el contenedor sea responsivo */
  }
  .slide{
    max-width: 1920px;
    max-height: 500px;
  }
  .carousel__next{
    width: 64px;
  }
  .carousel__prev{
    width: 64px;
  }
  .carousel__icon{
    color: var(--color-2);
    display: none;
    /* Agregar un fondo blanco */
    background-color: var(--color-5);

    /* Hacer que el fondo sea un círculo */
    border-radius: 50%;

    /* Dimensiones del círculo. Ajusta según tus necesidades */
    height: 4rem;
    width: 4rem;
    align-items: center;
    justify-content: center;

  }
  .carousel__pagination{
    transform: translateY(-160px);
    z-index: 1;
  }
  .carousel__pagination-button::after{
    display: block;
    content: '';
    width: 5px; /* Tamaño del círculo (ancho) */
    height: 5px; /* Tamaño del círculo (alto) */
    border-radius: 50%; /* Hacerlo circular */
    background-color: rgba(255, 255, 255, 0.493); /* Fondo negro */
    border: 1px solid var(--color-5); /* Bordes blancos */
  }
  .carousel:hover .carousel__icon{
    display: flex;
  }
  .carousel__pagination-button--active::after{
    background-color: rgba(255, 0, 0, 0.493); /* Fondo negro */
  }
  .container-offers {
  position: absolute;
  top: 100%;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

/* Para mover el texto un poco hacia arriba desde el centro */
.container-offers {
  margin-top: -8%; /* Ajusta este valor según necesites */
}
  nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  nav ul li {
    display: inline;
    margin-right: 20px;
  }
  
  main {
    margin: 20px;
    padding: 20px;
    background-color: #e9e9e9;
  }
  
  footer {
    background-color: #f8f8f8;
    padding: 10px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  </style>