import { createRouter, createWebHistory } from 'vue-router'
import LandingView from "../views/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/welcome',
      name: 'landing',
      component: LandingView
    },
  ]
})

export default router
