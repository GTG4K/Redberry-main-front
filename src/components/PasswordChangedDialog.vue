<template>
  <formDialog @close="emit('setDialog',null)">
    <div class="flex flex-col gap-5 justify-center items-center sm:h-auto h-[50%] sm:p-0 sm:rounded-none sm:bg-transparent px-8 rounded-xl bg-white/5 sm:mt-0 mt-[20%]">
      <img src="../assets/svg/success.svg" alt="success" class="w-15">
      <h2 class="text-white text-2xl">{{ $t('message.success') }}</h2>
      <p class="text-white opacity-50 text-sm text-center">{{ $t('message.password_changed_successfully')}}</p>
      <BaseButton color="red" size="full" @click="emit('setDialog','log_in')">{{ $t('message.log_in') }}</BaseButton>
    </div>
  </formDialog>
</template>

<script setup>
import FormDialog from "./FormDialog.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>