<template>
  <RouterView/>
</template>

<script setup>
import {RouterView, useRouter} from 'vue-router'
import {onBeforeMount} from "vue";
import {user} from "@/services/auth";
import {useUserStore} from "@/stores/user";

const router = useRouter();
const userStore = useUserStore();
onBeforeMount(async () => {
  try {
    const currentUser = await user();
    userStore.setUser(currentUser);
    router.push({name:'home'})
  } catch (error) {
    console.log(error)
  }
})
</script>
