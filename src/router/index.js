// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Shop from '../components/HomeShop.vue';
import Login from '../components/LoginView.vue';
import Home from '../components/Home.vue'
import Offers from '../components/Offers.vue';
import Categories from '../components/Categories.vue';
import Sell from '../components/Sell.vue';
import ProductUpdate from '../components/ProductUpdate.vue';
import ProductDetails from '@/components/ProductDetails.vue';
import store from '../store';
import ListSearch from '@/components/ListSearch';
import ListCategories from '@/components/ListCategories'

const routes = [
{
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/', // Esto se convertirá en /shop/products
        components: {
          offers: Offers,
        },
      },
    ],
  },
  {
    path: '/product/:productId',
    name: 'ProductDetails',
    component: ProductDetails,
    props: true,
  },
  {
    path: '/search',
    name: 'ListSearch',
    component: ListSearch,
  },
  {
    path: '/categories',
    name: 'ListCategories',
    component: ListCategories,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    children: [
      {
        path: 'products', // Esto se convertirá en /shop/products
        components: {
          offers: Offers,
          categories: Categories, // Asumiendo que puedas mostrar ambos en la misma ruta usando named views o similar
        },
        meta: { requiresAuth: true },
      },
      { path: '/product/update/:id', component: ProductUpdate , meta: { requiresAuth: true }},
      {
        path: 'sell', // Esto se convertirá en /shop/sell
        component: Sell,
        meta: { requiresAuth: true },
      },
    ],
  },
  // otras rutas...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;