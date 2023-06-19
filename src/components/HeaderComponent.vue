<template>
  <header class="fixed top-0 left-0 w-full h-header flex justify-between items-center px-14 z-10">
    <h2 class="text-yellow-dead">MOVIE QUOTES</h2>
    <div class="flex gap-6 items-center">
      <div class="text-white font-light">Eng</div>
      <BaseButton color="red" @click="emit('action', 'sign_up')">Sign Up</BaseButton>
      <BaseButton @click="emit('action', 'log_in')">Log in</BaseButton>
    </div>
  </header>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['action']);
</script>

<style scoped>
</style>