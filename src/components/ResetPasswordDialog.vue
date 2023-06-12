<template>
  <formDialog @close="emit('setDialog',null)" title="Create new password"
              description="Your new password must be different from previous used passwords">
    <Form class="flex flex-col gap-4">
      <TextInput name="password" placeholder="Enter new password"/>
      <TextInput name="confirm" placeholder="Confirm password"/>
      <BaseButton color="red">Reset password</BaseButton>
      <BaseButton @click="emit('setDialog','log_in')" color="none"><img src="../assets/svg/back.svg" alt="back svg">
        <p>Back to log in</p></BaseButton>
    </Form>
  </formDialog>
</template>

<script setup>
import { Form } from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>