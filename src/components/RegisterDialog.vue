<template>
  <formDialog @close="emit('setDialog',null)" title="Create an account"
              description="Start your journey!">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form class="flex flex-col gap-4" @submit="handleSubmit($event, formSubmit(meta, values))">
        <TextInput name="name" placeholder="username here" rules="required|min:3|max:15"/>
        <TextInput name="email" placeholder="username here" rules="required|email"/>
        <TextInput name="password" type="password" placeholder="username here" rules="required|min:8|max:15"/>
        <TextInput name="password_confirmation" placeholder="username here" type="password"
                   rules="required|confirmed:@password"/>
        <p class="text-red-500 text-sm text-center" v-if="warning">{{warning}}</p>
        <BaseButton submit color="red">Get Started</BaseButton>
        <BaseButton><img src="../assets/svg/google.svg" alt="google logo">
          <p>Sign up with Google</p></BaseButton>
        <div class="flex gap-2 justify-center pt-3">
          <p class="text-gray-500 text-sm align-center">Already have an account?</p>
          <p class="text-blue-500 text-sm cursor-pointer hover:text-blue-400" @click="emit('setDialog','log_in')">Log
            in</p>
        </div>
      </form>
    </Form>
  </formDialog>
</template>

<script setup>
import {Form} from "vee-validate";
import FormDialog from "./FormDialog.vue";
import TextInput from "./TextInput.vue";
import BaseButton from "./BaseButton.vue";
import {register} from "@/services/auth";
import {ref} from "vue";

const warning = ref('');

const formSubmit = async(meta, values) => {
  if (meta.valid) {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.password_confirmation
    }

    const response = await register(payload);
    if (response.status === 201){
      console.log(response.status)
      emit('setDialog', 'activate_account');
    }else{
      console.log(response.data)
      const firstErrorKey = Object.keys(response.data.errors)[0];
      warning.value = response.data.errors[firstErrorKey][0]
    }
  }
}

const emit = defineEmits(['setDialog']);
</script>
