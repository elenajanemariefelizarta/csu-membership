import { createRouter, createWebHistory } from 'vue-router'
import LoginViews from '@/views/auth/LoginViews.vue'
import RegisterViews from '@/views/auth/RegisterViews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: LoginViews
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterViews
    },
 
  ]
})

export default router
