<template>
  <header class="fixed top-0 left-0 w-full h-header" :class="userExists ? 'z-30' : 'z-10'">
    <!-- User not logged in -->
    <div v-if="!userExists" class="flex justify-between items-center sm:px-14 px-4 bg-black/50 h-full">
      <h2 class="text-yellow-dead sm:text-lg text-xs">MOVIE QUOTES</h2>

      <div class="flex sm:gap-4 gap-2 items-center">
        <LanguageDropdown></LanguageDropdown>
        <BaseButton @click="emit('action', 'log_in')">Log in</BaseButton>
        <BaseButton color="red" @click="emit('action', 'sign_up')">Sign Up</BaseButton>
      </div>
    </div>
    <!-- User logged in page -->
    <div v-else class="flex justify-between items-center sm:px-14 px-4 bg-header z-30 h-full">
      <h2 v-if="!styleStore.deviceIsMobile" class="text-yellow-dead sm:text-lg text-xs">MOVIE QUOTES</h2>
      <img v-else src="../assets/svg/menu.svg" class="cursor-pointer" @click="toggleSidebar" alt="menu">

      <div class="flex sm:gap-6 gap-2 items-center">
        <img v-if="styleStore.deviceIsMobile" src="../assets/svg/input-search.svg" alt="Search">
        <NotificationsComponent></NotificationsComponent>
        <LanguageDropdown v-if="!styleStore.deviceIsMobile"></LanguageDropdown>
        <BaseButton v-if="!styleStore.deviceIsMobile" @click="onLogout">Log out</BaseButton>
      </div>
    </div>
  </header>
  <div v-if="sidebarActive" class="fixed flex flex-col justify-between z-50 bg-background h-screen w-[85%] p-8">
    <nav class="flex flex-col gap-6">
      <div class="flex gap-2">
        <img :src="userStore.getUserProfile" alt="profile pic" class="w-12 object-cover rounded-full">
        <div class="flex flex-col gap-1 justify-center">
          <h2 class="text-white">{{ userStore.getUserName }}</h2>
          <h3 @click="router.push({name: 'profile'})"
              class="text-white/75 text-sm font cursor-pointer hover:text-white">Edit your profile</h3>
        </div>
      </div>
      <router-link :to="{name: 'home'}" class="flex gap-8 text-white items-center pl-3">
        <img src="../assets/svg/nav-home.svg" alt="home" class="w-6">
        <h3 class="transition-all text-white/70 text-sm hover:text-white">News feed</h3>
      </router-link>
      <router-link :to="{name: 'movies'}" class="flex gap-8 text-white items-center pl-3">
        <img src="../assets/svg/nav-movies.svg" alt="movies" class="w-6">
        <h3 class="transition-all text-white/70 text-sm hover:text-white">List of movies</h3>
      </router-link>
      <LanguageDropdown size="full"></LanguageDropdown>
    </nav>
    <BaseButton color="red" @click="onLogout">Log out</BaseButton>
  </div>
  <div v-if="sidebarActive" class="fixed top-0 left-0 w-screen h-screen z-40 bg-black/20" @click="toggleSidebar"></div>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import {logout} from "@/services/auth";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import NotificationsComponent from "@/components/NotificationsComponent.vue";
import {useMoviesStore} from "@/stores/Movies";
import {useQuoteStore} from "@/stores/Quotes";
import {useNotificationStore} from "@/stores/notifications";
import {useStyleStore} from "@/stores/style";

const router = useRouter()
const userStore = useUserStore();
const movieStore = useMoviesStore();
const quoteStore = useQuoteStore();
const notificationStore = useNotificationStore();
const userExists = computed(() => {
  return userStore.user
})

const emit = defineEmits(['action']);
const styleStore = useStyleStore();

const sidebarActive = ref(false);
const toggleSidebar = () => {
  sidebarActive.value = !sidebarActive.value
}

async function onLogout() {
  try {
    await logout();
    userStore.clearUser();
    setTimeout(() => {
      movieStore.clearMovies();
      quoteStore.clearQuotes();
      notificationStore.clearNotifications();
    }, 2000)
    router.push({name: 'landing'})
  } catch (error) {
    console.log();
  }
}


</script>

<style scoped>
</style>