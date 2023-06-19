<template>
  <!--    login -->
  <formDialog @close="emit('setDialog',null)" title="Create an account"
              description="Start your journey!">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form class="flex flex-col gap-4" @submit="handleSubmit($event, formSubmit(meta, values))">
        <TextInput name="email" placeholder="Enter your email" rules="required|email"/>
        <TextInput name="password" placeholder="Password" type="password" rules="required"/>
        <BaseButton submit color="red">Sign in</BaseButton>
        <div>
          <div class="flex justify-between">
            <div class="flex gap-2 align-center">
              <Field type="checkbox" name="remember"></Field>
              <label for="remember" class="text-white text-sm">Remember me</label>
            </div>
            <p class="text-blue-500 text-sm cursor-pointer hover:text-blue-400"
               @click="emit('setDialog','forgot')">Forgot password</p>
          </div>
        </div>
        <BaseButton><img src="../assets/svg/google.svg" alt="google logo">
          <p>Sign in with Google</p></BaseButton>
        <div class="flex gap-2 justify-center pt-3">
          <p class="text-gray-500 text-sm align-center">Don't have an account?</p>
          <p class="text-blue-500 text-sm cursor-pointer hover:text-blue-400" @click="emit('setDialog','sign_up')">Sign
            up</p>
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
    userStore.setUser(user);
    await router.push({name: 'home'});
  }
}

const emit = defineEmits(['setDialog']);
</script>
