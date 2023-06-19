<template>
  <header class="fixed top-0 left-0 w-full h-header flex justify-between items-center px-14 z-10">
    <h2 class="text-yellow-dead">MOVIE QUOTES</h2>
    <div v-if="!userExists" class="flex gap-6 items-center">
      <div class="text-white font-light">Eng</div>
      <BaseButton color="red" @click="emit('action', 'sign_up')">Sign Up</BaseButton>
      <BaseButton @click="emit('action', 'log_in')">Log in</BaseButton>
    </div>
    <div v-if="userExists" class="flex gap-6 items-center">
      <div class="text-white font-light">Eng</div>
      <BaseButton @click="onLogout">Log out</BaseButton>
    </div>
  </header>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import {logout} from "@/services/auth";
import {computed} from "vue";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();
const userExists = computed(()=>{
  return userStore.user
})

const emit = defineEmits(['action']);
async function onLogout() {
  try {
    await logout();
    userStore.clearUser();
  } catch (error) {
    console.log();
  }
}




</script>

<style scoped>
</style>