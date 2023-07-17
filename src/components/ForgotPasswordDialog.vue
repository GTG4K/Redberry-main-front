<template>
  <formDialog @close="emit('setDialog',null)" :title="$t('message.forgot_password')"
              :description="$t('message.forgot_password_description')">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form @submit="handleSubmit($event, formSubmit(meta, values))" class="flex flex-col gap-4">
        <TextInput :title="$t('message.email')" name="email" :placeholder="$t('message.email')" rules="required|email"/>
        <BaseButton submit color="red">{{ $t('message.send_instruction') }}</BaseButton>
        <BaseButton @click="emit('setDialog','log_in')" color="none"><img src="../assets/svg/back.svg" alt="back svg">
          <p>{{ $t('message.log_in') }}</p></BaseButton>
      </form>
    </Form>
  </formDialog>
</template>

<script setup>
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";
import {forgotPassword} from "@/services/auth";

const formSubmit = (meta, values) => {
  forgotPassword(values.email);
  emit('setDialog', 'recover_password');
}

const emit = defineEmits(['setDialog']);
</script>