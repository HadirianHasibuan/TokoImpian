// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../store/userStore';

// Views
import Home from '../views/Home.vue';
import Produk from '../views/Produk.vue';
import Keranjang from '../views/Keranjang.vue';
import CheckoutPage from '../views/CheckoutPage.vue';
import LoginPage from '../views/LoginPage.vue';
import DashboardAdmin from '../views/DashboardAdmin.vue';

// Components
import ProductDetail from '../components/ProductDetail.vue';

const routes = [
  // Halaman publik
  { path: '/', name: 'Home', component: Home },
  { path: '/produk', name: 'Produk', component: Produk },
  { path: '/produk/:id', name: 'ProductDetail', component: ProductDetail },
  { path: '/keranjang', name: 'Keranjang', component: Keranjang },
  { path: '/checkout', name: 'Checkout', component: CheckoutPage },
  { path: '/login', name: 'Login', component: LoginPage },

  // Halaman admin dengan nested routes
  {
    path: '/admin',
    name: 'DashboardAdmin',
    component: DashboardAdmin,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'kelola-produk',
        name: 'AdminKelolaProduk',
        component: () => import('../components/AdminProductForm.vue')
      },
      {
        path: '',
        redirect: { name: 'AdminKelolaProduk' }
      }
    ]
  },

  // 404 Catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// ✅ Navigation Guard untuk admin route
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.currentUser) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
