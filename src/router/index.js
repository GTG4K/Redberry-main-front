import {createRouter, createWebHistory} from 'vue-router'
import {user} from "@/services/auth";

const LandingView = () => import("../views/LandingView.vue");
const HomeView = () => import("../views/HomeView.vue");
const ProfileView = () => import("../views/ProfileView.vue");
const MoviesView = () => import("../views/MoviesView.vue");
const MovieView = () => import("../views/MovieView.vue");
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
            meta: {requiresAuth: true},
            component: HomeView
        },
        {
            path: '/movies',
            name: 'movies',
            meta: {requiresAuth: true},
            component: MoviesView
        },
        {
            path: '/movies/:slug',
            name: 'movie',
            meta: {requiresAuth: true},
            component: MovieView
        },
        {
            path: '/profile',
            name: 'profile',
            meta: {requiresAuth: true},
            component: ProfileView
        },
    ]
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = await user();

    if (requiresAuth && !isAuthenticated) {
        next('/');
    } else {
        next();
    }
});

export default router
