<template>
  <header class="fixed top-0 left-0 w-full h-header flex justify-between items-center sm:px-14 px-4 z-10"
          :class="userExists ? 'bg-header z-40' : 'bg-black/50'">
    <h2 class="text-yellow-dead sm:text-lg text-xs">MOVIE QUOTES</h2>
    <div v-if="!userExists" class="flex sm:gap-4 gap-2 items-center">
      <LanguageDropdown></LanguageDropdown>
      <BaseButton @click="emit('action', 'log_in')">Log in</BaseButton>
      <BaseButton color="red" @click="emit('action', 'sign_up')">Sign Up</BaseButton>
    </div>
    <div v-if="userExists" class="flex sm:gap-6 gap-2 items-center">
      <NotificationsComponent></NotificationsComponent>
      <LanguageDropdown></LanguageDropdown>
      <BaseButton @click="onLogout">Log out</BaseButton>
    </div>
  </header>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import {logout} from "@/services/auth";
import {computed} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import NotificationsComponent from "@/components/NotificationsComponent.vue";
import {useMoviesStore} from "@/stores/Movies";
import {useQuoteStore} from "@/stores/Quotes";
import {useNotificationStore} from "@/stores/notifications";

const router = useRouter()
const userStore = useUserStore();
const movieStore = useMoviesStore();
const quoteStore = useQuoteStore();
const notificationStore = useNotificationStore();
const userExists = computed(() => {
  return userStore.user
})

const emit = defineEmits(['action']);

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