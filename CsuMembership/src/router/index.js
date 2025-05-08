import { createRouter, createWebHashHistory } from 'vue-router'
import LoginViews from '@/views/auth/LoginViews.vue'
import RegisterViews from '@/views/auth/RegisterViews.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginViews
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterViews
    },
    {
      path: '/organizations',
      name: 'Organizations',
      component: () => import('@/views/Organizations.vue')
    },
  ]
})

export default router
