<template>
  <div class="min-h-screen bg-background">
    <RouterView/>
  </div>
</template>

<script setup>
import {RouterView, useRouter} from 'vue-router'
import {onBeforeMount, onMounted, ref} from "vue";
import {user} from "@/services/auth";
import {useUserStore} from "@/stores/user";
import instantiatePusher from "@/helpers/instantiatePusher";

//linter final
const router = useRouter();
const userStore = useUserStore();
const pusherActive = ref(false);

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

onMounted(() => {
  pusherActive.value = instantiatePusher();
})
</script>
