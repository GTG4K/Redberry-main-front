<template>
  <formDialog @close="emit('setDialog',null)">
    <div class="flex flex-col gap-5 justify-center items-center sm:h-auto h-[50%] sm:p-0 sm:rounded-none sm:bg-transparent px-8 rounded-xl bg-white/5 sm:mt-0 mt-[20%]">
      <img src="../assets/svg/account_activated.svg" alt="account activated" class="w-15">
      <h2 class="text-white text-2xl">{{ $t('message.thank_you') }}</h2>
      <p class="text-white opacity-50 text-sm text-center">{{ $t('message.account_activated_description') }}</p>
      <BaseButton color="red" size="full">{{ $t('message.log_in')}}</BaseButton>
    </div>
  </formDialog>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import FormDialog from "./FormDialog.vue";

const emit = defineEmits(['setDialog']);
</script>
