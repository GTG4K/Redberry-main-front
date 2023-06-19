<template>
  <RouterView/>
</template>

<script setup>
import {RouterView} from 'vue-router'
import {onMounted} from "vue";
import {user} from "@/services/auth";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();

onMounted(async () => {
  try {
    const currentUser = await user();
    userStore.setUser(currentUser);
  } catch (error) {
    console.log(error)
  }
})
</script>
