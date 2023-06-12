<template>
  <formDialog @close="emit('setDialog',null)">
    <div class="flex flex-col gap-5 justify-center items-center">
      <img src="../assets/svg/success.svg" alt="success" class="w-15">
      <h2 class="text-white text-2xl">Success!</h2>
      <p class="text-white opacity-50 text-sm text-center">Your Password changed successfully</p>
      <BaseButton color="red" size="full" @click="emit('setDialog','log_in')">Log in</BaseButton>
    </div>
  </formDialog>
</template>

<script setup>
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>