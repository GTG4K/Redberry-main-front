import { createRouter, createWebHistory } from 'vue-router'
const LandingView = () => import("../views/LandingView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
  ]
})

export default router
