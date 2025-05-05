import { createRouter, createWebHistory } from 'vue-router'
import LoginViews from '@/views/LoginViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginViews,
    },
 
  ]
})

export default router
