<template>
  <formDialog @close="emit('setDialog',null)" title="Forgot password?"
              description="Enter the email and we’ll send an email with instructions to reset your password">
    <Form class="flex flex-col gap-4">
      <TextInput name="email" placeholder="Enter your email"/>
      <BaseButton color="red">Send instruction</BaseButton>
      <BaseButton @click="emit('setDialog','log_in')" color="none"><img src="../assets/svg/back.svg" alt="back svg">
        <p>Back to log in</p></BaseButton>
    </Form>
  </formDialog>
</template>

<script setup>
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>