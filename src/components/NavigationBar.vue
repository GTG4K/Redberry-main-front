<template>
  <nav class="fixed flex flex-col gap-6 px-14 py-5">
    <div class="flex gap-2">
      <img :src="userProfilePicture" alt="profile pic" class="w-12 object-cover rounded-full">
      <div class="flex flex-col gap-1 justify-center">
        <h2 class="text-white">{{ userProfileName }}</h2>
        <h3 @click="router.push({name: 'profile'})" class="text-white/75 text-sm font cursor-pointer hover:text-white">Edit your profile</h3>
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
  </nav>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import {computed} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const userProfilePicture = computed(() => {
  return userStore.getUserProfile;
});
const userProfileName = computed(() => {
  return userStore.getUserName;
});
</script>

<style scoped>
.router-link-active > h3{
  color: white;
}
</style>