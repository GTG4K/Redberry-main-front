<template>
  <formDialog @close="emit('setDialog',null)" title="Create an account"
              description="Start your journey!">
    <Form class="flex flex-col gap-4">
      <TextInput name="name" placeholder="username here"/>
      <TextInput name="email" placeholder="username here"/>
      <TextInput name="password" placeholder="username here"/>
      <TextInput name="confirm" placeholder="username here" type="password"/>
      <BaseButton color="red">Get Started</BaseButton>
      <BaseButton><img src="../assets/svg/google.svg" alt="google logo">
        <p>Sign up with Google</p></BaseButton>
      <div class="flex gap-2 justify-center pt-3">
        <p class="text-gray-500 text-sm align-center">Already have an account?</p>
        <p class="text-blue-500 text-sm cursor-pointer hover:text-blue-400" @click="emit('setDialog','log_in')">Log
          in</p>
      </div>
    </Form>
  </formDialog>
</template>

<script setup>
import {defineComponent} from "vue";
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";

const emit = defineEmits(['setDialog']);
</script>
