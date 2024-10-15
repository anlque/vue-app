import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
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
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
