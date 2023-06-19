<template>
  <formDialog @close="emit('setDialog',null)">
    <div class="flex flex-col gap-5 justify-center items-center">
      <img src="../assets/svg/activate_account.svg" alt="activate account" class="w-15">
      <h2 class="text-white text-2xl">Thank you!</h2>
      <p class="text-white opacity-50 text-sm text-center">Please check your email and follow the instructions to
        activate your account.</p>
      <BaseButton color="red" size="full">Go to my email</BaseButton>
    </div>
  </formDialog>
</template>

<script setup>
import FormDialog from "./FormDialog.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>
