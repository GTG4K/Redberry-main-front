<template>
  <formDialog @close="emit('setDialog',null)">
    <div class="flex flex-col gap-5 justify-center items-center">
      <img src="../assets/svg/account_activated.svg" alt="account activated" class="w-15">
      <h2 class="text-white text-2xl">Thank you!</h2>
      <p class="text-white opacity-50 text-sm text-center">Your account has been activated.</p>
      <BaseButton color="red" size="full">Go to my news feed</BaseButton>
    </div>
  </formDialog>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import FormDialog from "./FormDialog.vue";

const emit = defineEmits(['setDialog']);
</script>
