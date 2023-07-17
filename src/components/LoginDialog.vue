<template>
  <!--    login -->
  <formDialog @close="emit('setDialog',null)" :title="$t('message.log_in_to_your_account')"
              :description="$t('message.enter_profile_details')">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form class="flex flex-col gap-4" @submit="handleSubmit($event, formSubmit(meta, values))">
        <TextInput :title="$t('message.email')" name="email" :placeholder="$t('message.email')" rules="required|email"/>
        <TextInput :title="$t('message.password')" name="password" :placeholder="$t('message.password')" type="password" rules="required"/>
        <div class="flex justify-between">
          <div class="flex gap-2 items-center">
            <Field type="checkbox" name="remember"></Field>
            <label for="remember" class="text-white sm:text-sm text-xs">{{ $t('message.remember_me') }}</label>
          </div>
          <p class="text-blue-500 sm:text-sm text-xs cursor-pointer hover:text-blue-400"
             @click="emit('setDialog','forgot')">{{ $t('message.forgot_password') }}</p>
        </div>
        <BaseButton submit color="red">{{ $t('message.log_in' )}}</BaseButton>

        <BaseButton href="http://localhost:8000/auth/google/redirect">
          <img src="../assets/svg/google.svg" alt="google logo">
          <p>{{ $t('message.sign_up_with_google') }}</p>
        </BaseButton>
        <div class="flex gap-2 justify-center pt-3">
          <p class="text-gray-500 sm:text-sm text-xs align-center">{{ $t('message.dont_have_an_account') }}</p>
          <p class="text-blue-500 sm:text-sm text-xs cursor-pointer hover:text-blue-400"
             @click="emit('setDialog','sign_up')">{{ $t('message.register' )}}</p>
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
