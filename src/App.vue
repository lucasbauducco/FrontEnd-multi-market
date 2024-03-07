<template>
  <header class="nav-header">
    <div class="nav-search">
      <a class="nav-logo" href="/">
        Mercado Libre Argentina - Donde comprar y vender de todo
      </a>
      <form class="nav-search-form" @submit.prevent="search">
        <label for="cb1-edit"></label>
        <input v-model="searchQuery" id="cb1-edit" type="text" class="nav-search-input">
        <button type="submit" class="nav-search-btn button-no-decorate">
          <div role="img" aria-label="Buscar" class="nav-icon-search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </div>
        </button>
      </form>

    </div>
    <div class="header-nav" id="myNavbar">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411"/>
      </svg>
      <nav class="navbar">
        <a href="javascript:void(0);" class="icon" @click="toggleNavbar">&#9776;
        </a>
      </nav>
      <div class="nav-toggle">
            <router-link to="/categories">Categorías</router-link>
            <router-link
              :to="{
                name: 'ListSearch',
                query: { query: searchQuery }
              }"
            >
              Ofertas
            </router-link>

            <a class="disabled" href="#contact">Historial</a>
            <a class="disabled" href="#about">Supermedado</a>
            <a class="disabled" href="#about">Indumentaría</a>
      </div>
    </div>
  </header>

  <router-view></router-view>
</template>

<script>
import './assets/css/base.css';
export default {
  data() {
    return {
      searchQuery: '',
      isResponsive: false,
    };
  },
  methods: {
    toggleNavbar() {
      var x = document.getElementById("myNavbar");
      if (x.className === "header-nav") {
        x.className += " responsive";
      } else {
        x.className = "header-nav";
      }
    },
    search() {
      // Usa Vue Router para navegar a ListSearch.vue con la consulta de búsqueda
      this.$router.push({ name: 'ListSearch', query: { query: this.searchQuery } });
    },
  },
};
</script>
<style>

  
</style>
