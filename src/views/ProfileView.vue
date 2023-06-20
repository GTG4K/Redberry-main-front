<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-4 min-h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-span-2 py-5">
      <h2 class="text-white">My profile</h2>
      <div class="bg-black/25 rounded relative w-full mt-20 flex items-center justify-center">
        <div class="absolute -top-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <img :src="userStore.getUserProfile" alt="user profile picture" class="w-40 rounded-full">
          <p class="text-white/75 text-md font cursor-pointer hover:text-white">Upload new photo</p>
        </div>
        <div class="w-1/2 pt-36 pb-20 flex flex-col gap-3">
          <TextInput name="name" rules="required|min:3|max:15"></TextInput>
          <TextInput name="email" rules="required|email"></TextInput>
          <TextInput name="password" type="password" rules="required|min:8|max:15"></TextInput>
        </div>
      </div>
      <div class="flex justify-end pt-6">
        <BaseButton color="red">Save changes</BaseButton>
      </div>
    </aside>
  </main>
</template>

<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {useUserStore} from "@/stores/user";
import TextInput from "@/components/TextInput.vue";
import BaseButton from "@/components/BaseButton.vue";

const userStore = useUserStore();

</script>


