import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
// import About from '../views/About.vue';
import NoPage from '../views/Shared/NoPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // https://next.router.vuejs.org/guide/advanced/lazy-loading.html
  // Recommended to always use dynamic imports for all routes (can group these too)
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting generates a separate chunk (about.[hash].js)
  //   // for each route which is lazy-loaded when the route is visited
  //   component: () => import('../views/About.vue'),
  // },
  // https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NoPage,
  },
];

// https://next.router.vuejs.org/guide/essentials/history-mode.html
// methods: createWebHistory, createWebHashHistory, createMemoryHistory
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
