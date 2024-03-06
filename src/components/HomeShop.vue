<template>
  <section class="menu-shop">
    <div class="logo-shop">
      <img :src="computedImage" alt="logo shop" class="circular-image">
      <span class="name-shop">
        {{ name }}
      </span>
    </div>
    <div class="list-menu-shop">
      <router-link to="/shop/products">Inicio</router-link>
      <a href="/shop">Mis Ofertas</a>
      <router-link to="/shop/sell">Vender</router-link>
    </div>
  </section>
  <router-view :shopId="shopId"></router-view>
  <!-- Si decides usar vistas nombradas para Offers y Categories -->
  <router-view v-if="shopId" name="offers" :shopId="shopId" :isAuthenticate="isAuthenticate" ></router-view>
  <router-view v-if="shopId" name="categories" :shopId="shopId" :isAuthenticate="isAuthenticate"></router-view>
</template>
  
<script>
  import axios from 'axios';
  import router from '@/router';
  export default {
    name: 'HomeShop',
    data() {
      return {
        // Ruta de la imagen guardada en data
        userData: {},
        imagePath: null,
        name: "Mi Ciudad",
        shopId: null,
        isLoading: false,
        allDataLoaded: false,
        isAuthenticate: false,
      };
    },
    computed: {
      computedImage() {
        // Si base64Image es null o está vacía, devuelve la imagen por defecto
        if (!this.imagePath) {
          return require('@/assets/svg/shop.svg');
        }
        // De lo contrario, devuelve la imagen en base64
        return this.imagePath;
      },
    },
    methods: {
      async verifyToken() {
        const token = localStorage.getItem('token');
        const user_id = this.userData.id; // Asegúrate de tener el ID del usuario disponible aquí
        if (!token || !user_id) {
          router.push('/login'); // Si no hay token o user_id, redirige al login
          this.isAuthenticate= false;
          return false;
        }

        console.log(localStorage.getItem('token'))
        console.log(this.userData.id)
        try {
          const config = {
            headers: {
              'Authorization': `Token ${token}`
            }
          };
          await axios.post('http://127.0.0.1:8000/api/token/verify/', { token, user_id }, config); // Asume que este endpoint verifica el token
          this.isAuthenticate= true;
          return true; // El token es válido
        } catch (error) {
          localStorage.removeItem('token'); // Elimina el token ya que no es válido
          localStorage.removeItem('username');
          router.push('/login'); // Redirige al inicio
          this.isAuthenticate= false;
          return false;
        }
      },
      async fetchUserData(username) {
      
      try {
        const token = localStorage.getItem('token');
        console.log(token)
        const config = {
            headers: {
              'Authorization': `Token ${token}`
            }
          };
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${username}/`, config);
        this.userData = response.data[0];
        console.log(response.data)
        this.name = this.userData.razon_social; // O cualquier otro campo relevante
        this.shopId = this.userData.id;
        if (!await this.verifyToken()) return; // Verifica el token antes de proceder
        // Considera marcar al usuario como autenticado aquí si necesitas manejar ese estado
      } catch (error) {
        console.error('Hubo un error al obtener los datos del usuario:', error);
        // Considera manejar errores específicos (p.ej., token expirado) si es necesario
      }
    },
    },
    async mounted() {
      await this.fetchUserData(this.$store.state.username);
    }
    // Otras opciones del componente como data, methods, etc.
  };
  </script>
  
  <style>
  .menu-shop{
    width: 100%;
    background-color: var(--color-5);
    display: flex;
    justify-content: space-between;
    .logo-shop{
      display: flex;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
      .name-shop{
        font-size: 4vw;
        font-weight: bold;
        color: var(--color-1);
      }
    }
    .circular-image {
      border-radius: 50%;  /* Hace que la imagen sea circular */
      width: 8vw;       /* Ancho de la imagen */
      height: 8vw;      /* Altura de la imagen */
      background-color: var(--color-3);
      object-fit: scale-down;  /* Asegura que la imagen cubra completamente el área sin estirarse */
    }
    .list-menu-shop{
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
    }
    .list-menu-shop a{
      margin: 0 1rem;
      font-size: 3vw;
      color: var(--text);
      text-align: center;
      text-decoration: none; 
    }
  }
  .cards-content {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .offers{
      background-color: var(--color-2);
    }
    .btn-pagination-cards {
      display: flex;
      justify-content: space-between;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
    }

    .pagination-spacer {
      flex-grow: 1;
    }
  }
  .cards-content:hover .carousel__icon{
      display: flex;
    }

  .card {
    position: relative;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    max-width: 200px;
  }

  .card-image {
    width: 200px;
    height: 200px;
    object-fit: contain;
  }

  .card-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .card-description {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .card-price{
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 18px;
  }
  .cross-out{
    text-decoration: line-through;
  }
  .card-discount {
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 12px;
  }
  .btn-card{
    position: absolute;
    bottom: 0px; /* Ajusta según sea necesario */
    right: 10px; /* Ajusta según sea necesario */
    z-index: 10;
  }
@media screen and (max-width: 768px) {
  .cards-offers .carousel__icon{
      display: flex;
    }
}
  </style>