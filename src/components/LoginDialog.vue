<template>
  <!--    login -->
  <formDialog @close="emit('setDialog',null)" title="Create an account"
              description="Start your journey!">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form class="flex flex-col gap-4" @submit="handleSubmit($event, formSubmit(meta, values))">
        <TextInput name="email" placeholder="Enter your email" rules="required|email"/>
        <TextInput name="password" placeholder="Password" type="password" rules="required"/>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <Field type="checkbox" name="remember"></Field>
            <label for="remember" class="text-white sm:text-sm text-xs">Remember me</label>
          </div>
          <p class="text-blue-500 sm:text-sm text-xs cursor-pointer hover:text-blue-400"
             @click="emit('setDialog','forgot')">Forgot password</p>
        </div>
        <BaseButton submit color="red">Sign in</BaseButton>

        <BaseButton href="http://localhost:8000/auth/google/redirect">
          <img src="../assets/svg/google.svg" alt="google logo">
          <p>Sign in with Google</p>
        </BaseButton>
        <div class="flex gap-2 justify-center pt-3">
          <p class="text-gray-500 sm:text-sm text-xs align-center">Don't have an account?</p>
          <p class="text-blue-500 sm:text-sm text-xs cursor-pointer hover:text-blue-400"
             @click="emit('setDialog','sign_up')">Sign up</p>
        </div>
      </form>
    </Form>
  </formDialog>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import TextInput from "./TextInput.vue";
import FormDialog from "./FormDialog.vue";
import {Field, Form} from "vee-validate";
import {login} from "@/services/auth";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const router = useRouter();

const userStore = useUserStore();
const formSubmit = async (meta, values) => {
  if (meta.valid) {
    const payload = {
      email: values.email,
      password: values.password,
    }
    const user = await login(payload);
    if (user) {
      userStore.setUser(user);
      router.push({name: 'home'});
    }
  }
}

const emit = defineEmits(['setDialog']);
</script>
