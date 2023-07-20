<template>
  <div class="min-h-screen bg-background">
    <RouterView/>
  </div>
</template>

<script setup>
import {RouterView, useRouter} from 'vue-router'
import {onBeforeMount} from "vue";
import {user} from "@/services/auth";
import {useUserStore} from "@/stores/user";

//linter final
const router = useRouter();
const userStore = useUserStore();
onBeforeMount(async () => {
  try {
    const currentUser = await user();
    if (currentUser) {
      userStore.setUser(currentUser);
      router.push({name: 'home'})
    }
  } catch (error) {
    console.log(error)
  }
})
</script>
