<template>
  <formDialog @close="emit('setDialog',null)" :title="$t('message.create_new_password')"
              :description=" $t('message.reset_password_description') ">
    <Form as="div" v-slot="{ handleSubmit, values, meta }">
      <form class="flex flex-col gap-4" @submit="handleSubmit($event, formSubmit(meta, values))">
        <TextInput :title="$t('message.password')" name="password" :placeholder="$t('message.password')"
                   type="password" rules="required|min:8|max:15"/>
        <TextInput :title="$t('message.password_confirmation')" name="confirm"
                   :placeholder="$t('message.password_confirmation')" type="password" rules="required|min:8|max:15"/>
        <BaseButton submit color="red">{{ $t('message.reset_password') }}</BaseButton>
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
import {resetPassword} from "@/services/auth";
import {useRoute} from "vue-router";

const route = useRoute();

const formSubmit = async (meta, values) => {
  console.log(route.query.email,);
  console.log(route.query.token,)
  const data = {
    password: values.password,
    password_confirmation: values.password_confirmation,
    email: route.query.email,
    token: route.query.token,
  }

  await resetPassword(data);
  emit("setDialog", 'password_changed');
}

const emit = defineEmits(['setDialog']);
</script>