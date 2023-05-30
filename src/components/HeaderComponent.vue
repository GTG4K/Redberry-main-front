<template>
  <header class="fixed top-0 left-0 w-full h-header bg-black flex justify-between items-center px-14">
    <h2 class="text-yellow-dead">MOVIE QUOTES</h2>
    <div class="flex gap-6 items-center">
      <div class="text-white font-light">Eng</div>
      <BaseButton color="red">Sign Up</BaseButton>
      <BaseButton>Log in</BaseButton>
    </div>
  </header>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
</script>

<style scoped>
</style>