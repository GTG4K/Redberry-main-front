import { createRouter, createWebHistory } from 'vue-router'
const LandingView = () => import("../views/LandingView.vue");
const HomeView = () => import("../views/HomeView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
  ]
})

export default router
