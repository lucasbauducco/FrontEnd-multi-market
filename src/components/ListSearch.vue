<template>
    <div class="filter-container">
      <select v-model="selectedSort">
          <option value="lowerPrice">Menor Precio</option>
          <option value="higherPrice">Mayor Precio</option>
          <option value="bestDiscount">Mejor Descuento</option>
      </select>
      <input type="number" v-model="minPrice" placeholder="Precio Mínimo">
      <input type="number" v-model="maxPrice" placeholder="Precio Máximo">
      <button @click="applyFilters">Aplicar Filtros</button>
    </div>
    <div class="container-list">
        <div class="card" v-for="product in filteredProducts.products" :key="product.id">
            <router-link :to="{ name: 'ProductDetails', params: { productId: product.id } }" class="card-link">
              <img :src="product.image_base64" alt="Imagen del producto" class="card-image">
              <div class="card-body">
              <h3 class="card-title">{{ product.name }}</h3>
              <p class="card-description">{{ product.description }}</p>
              <div v-if="product.discount!=0">
                  <div class="card-discount">Descuento: - {{ product.discount }}%</div>
                  <div class="card-price cross-out">Precio: ${{ product.price }}</div>
                  <div class="card-price">Precio: ${{ product.price - ((product.discount * product.price) / 100 )}}</div>
              </div>
              <div v-else class="card-price">Precio: ${{ product.price }}</div>
              <!-- Otros detalles del producto -->
              </div>
              <div v-if="isAuthenticate" class="btn-card">
                <button @click="editProduct(product.id)">Editar</button>
                <button @click="deleteProduct(product.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
                </button>
              </div>
            </router-link>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Inicializar datos para almacenar resultados de búsqueda
        isAuthenticate: false,
        searchResults: [],
        filteredProducts: [],
        selectedSort: 'bestDiscount', // Valor predeterminado del filtro de ordenamiento
        minPrice: null, // Valor predeterminado del precio mínimo
        maxPrice: Infinity, // Valor predeterminado del precio máximo
      };
    },
    created() {
      this.fetchSearchResults(this.$route.query.query);
    },
    watch: {
        '$route.query.query'(newQuery, oldQuery) {
        if (newQuery !== oldQuery) {
            this.fetchSearchResults(newQuery); // Ejecuta la lógica para recargar los resultados de búsqueda
        }
        }
    },
    methods: {
        async fetchSearchResults(query) {
            
            const url = `http://localhost:8000/api/search_products/?query=${query}`; // Construir la URL

            try {
                const response = await fetch(url); // Realizar la solicitud al backend
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`); // Manejar respuestas no exitosas
                }
                const data = await response.json(); // Parsear la respuesta JSON
                this.searchResults = data; // Actualizar el estado con los resultados
                this.filteredProducts = this.searchResults;
                this.applyFilters();
            } catch (error) {
                console.error("Fetch error:", error); // Manejar errores en la solicitud
            }
        },
        filterAndSortResults() {
          let filteredResults = this.searchResults.products.filter(product => {
            const finalPrice = product.price - ((product.discount * product.price) / 100);
                // Considera 0 o null como valores no restrictivos
            const effectiveMinPrice = this.minPrice > 0 ? this.minPrice : 0;
            const effectiveMaxPrice = this.maxPrice > 0 ? this.maxPrice : Infinity;
            
            return finalPrice >= effectiveMinPrice && finalPrice <= effectiveMaxPrice;
          });

          switch(this.selectedSort) {
            case 'lowerPrice':
              filteredResults.sort((a, b) => (a.price - (a.discount * a.price / 100)) - (b.price - (b.discount * b.price / 100)));
              break;
            case 'higherPrice':
              filteredResults.sort((a, b) => (b.price - (b.discount * b.price / 100)) - (a.price - (a.discount * a.price / 100)));
              break;
            case 'bestDiscount':
              filteredResults.sort((a, b) => b.discount - a.discount);
              break;
          }

          this.filteredProducts = { ...this.searchResults, products: filteredResults }; // Actualiza solo la lista de productos filtrados
        },
        applyFilters() {
          this.filterAndSortResults();
        },
    },
  };
  </script>
  
<style>
.container-list {
    width: 100%;
    margin: 2rem 0;
    position: relative;
    justify-content: space-around;
    display: flex;
    flex-wrap: wrap;
}
.filter-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 20px;
    background-color: #f8f9fa; /* Fondo claro para el contenedor de filtros */
    padding: 10px;
    border-radius: 5px;
}

.filter-container select, .filter-container input {
    padding: 8px 12px;
    border: 1px solid #ced4da; /* Borde suave */
    border-radius: 5px; /* Bordes redondeados para suavidad */
    font-size: 14px; /* Tamaño de texto adecuado */
    color: #495057; /* Color de texto */
    background-color: #ffffff; /* Fondo blanco para destacar */
}

.filter-container button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px; /* Bordes redondeados para el botón */
    font-size: 14px; /* Tamaño de texto adecuado */
    color: #ffffff; /* Color de texto blanco */
    background-color: #007bff; /* Fondo azul, cambia esto según tu esquema de color */
    cursor: pointer; /* Cambiar el cursor a pointer */
    transition: background-color 0.2s; /* Transición suave al cambiar el color */
}

.filter-container button:hover {
    background-color: #0056b3; /* Color más oscuro al pasar el mouse */
}

/* Adicional: estilos para enfocar elementos con tabulación para accesibilidad */
.filter-container select:focus, .filter-container input:focus, .filter-container button:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Resplandor azul al enfocar */
}
</style>
  