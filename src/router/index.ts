import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { BASE_URL } from '@/constants/paths'

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-fount',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotFoundView.vue'),
    },
    // {
    //   path: '/product-details',
    //   name: 'product-details',
    //   component: () => import('../views/ProductDetailsView.vue'),
    // },
    // {
    //   path: '/preorder',
    //   name: 'preorder',
    //   component: () => import('../views/PreorderView.vue'),
    // },
  ],
})

export default router
