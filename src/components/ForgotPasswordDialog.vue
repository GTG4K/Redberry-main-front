<template>
  <formDialog @close="emit('setDialog',null)" title="Forgot password?"
              description="Enter the email and we’ll send an email with instructions to reset your password">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form @submit="handleSubmit($event, formSubmit(meta, values))" class="flex flex-col gap-4">
        <TextInput name="email" placeholder="Enter your email" rules="required|email"/>
        <BaseButton submit color="red">Send instruction</BaseButton>
        <BaseButton @click="emit('setDialog','log_in')" color="none"><img src="../assets/svg/back.svg" alt="back svg">
          <p>Back to log in</p></BaseButton>
      </form>
    </Form>
  </formDialog>
</template>

<script setup>
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";

const formSubmit = (meta, values) => {
  console.log(meta, values);
}

const emit = defineEmits(['setDialog']);
</script>