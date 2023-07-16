<template>
  <HeaderComponent/>
  <main class="bg-background pt-header min-h-screen sm:pr-14 px-7">
    <NavigationBar v-if="!styleStore.deviceIsMobile"></NavigationBar>
    <aside class="sm:pl-52 py-5 flex justify-center">
      <div class="sm:w-[40rem] w-full">
        <h2 class="text-white">My profile</h2>
        <div class="bg-black/25 rounded relative w-full mt-20 flex items-center justify-center">
          <div class="absolute sm:-top-20 -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <img :src="profilePicture" alt="user profile picture"
                 class="sm:w-40 sm:h-40 w-20 h-20 object-cover rounded-full">
            <input id="profile_picture" name="profile_picture" type="file" class="hidden"
                   @change="changeProfilePicture"/>
            <label for="profile_picture" class="text-white/75 text-md font cursor-pointer hover:text-white">Upload new
              photo</label>
          </div>
          <Form as="div" v-slot="{handleSubmit, values, meta}" class="sm:w-2/3 w-full sm:px-0 px-5 pt-36 pb-20">
            <form class="flex flex-col gap-3" id="userDetails"
                  @submit.prevent="handleSubmit($event, handleUserUpdate(meta, values))">
              <div v-if="!editName" class="flex flex-col gap-2">
                <label class="text-white sm:text-sm text-xs">Name</label>
                <div class="flex items-center gap-3">
                  <h2 class="bg-form-input text-sm placeholder-font-text p-2 rounded w-full placeholder-form-text">
                    {{ userStore.getUserName }}</h2>
                  <h2 @click="toggleEdit('name')" class="text-white cursor-pointer text-xs">Edit</h2>
                </div>
              </div>
              <TextInput v-else :placeholder="userStore.getUserName" name="name"
                         rules="required|min:3|max:15"></TextInput>
              <div v-if="!editEmail" class="flex flex-col gap-2">
                <label class="text-white sm:text-sm text-xs">Email</label>
                <div class="flex items-center gap-3">
                  <h2 class="bg-form-input text-sm placeholder-font-text p-2 rounded w-full placeholder-form-text">
                    {{ userStore.getUserEmail }}</h2>
                  <h2 @click="toggleEdit('email')" class="text-white cursor-pointer text-xs">Edit</h2>
                </div>
              </div>
              <TextInput v-else :placeholder="userStore.getUserEmail" name="email" rules="required|email"></TextInput>
              <h2 v-if="editEmailMessageSent" class="text-xs text-green-400">Check your Email</h2>

              <div v-if="!editPassword" class="flex flex-col gap-2">
                <label class="text-white sm:text-sm text-xs">Password</label>
                <div class="flex items-center gap-3">
                  <h2 class="bg-form-input text-sm placeholder-font-text p-2 rounded w-full placeholder-form-text">
                    ••••••••</h2>
                  <h2 @click="toggleEdit('password')" class="text-white cursor-pointer text-xs">Edit</h2>
                </div>
              </div>
              <div v-else class="flex flex-col gap-2">
                <div class="flex flex-col gap-2">
                  <label class="text-white sm:text-sm text-xs">Password</label>
                  <div class="flex items-center gap-3">
                    <h2 class="bg-form-input text-sm placeholder-font-text p-2 rounded w-full placeholder-form-text">
                      ••••••••</h2>
                  </div>
                </div>
                <div class="border border-white/20 text-white rounded p-4">
                  <h2 class="text-xs pb-4">Passwords should contain:</h2>
                  <div class="flex text-xs gap-2">
                    <h2>•</h2>
                    <h2>8 or more characters</h2>
                  </div>
                  <div class="flex text-xs gap-2">
                    <h2>•</h2>
                    <h2>lowercase character</h2>
                  </div>
                </div>
                <TextInput name="password" placeholder="new password" rules="required|min:8"></TextInput>
                <TextInput name="password_confirmation" placeholder="new password"
                           rules="required|confirmed:@password"></TextInput>
              </div>
            </form>
          </Form>
        </div>
        <div class="flex gap-2 justify-end pt-6">
          <BaseButton v-if="changesActive || editProfilePicture" @click="clearEdit">Cancel</BaseButton>
          <BaseButton v-if="changesActive" color="red" form="userDetails" submit>Save changes</BaseButton>
          <BaseButton v-if="editProfilePicture" @click="handleSubmitProfilePicture" color="red">Save changes
          </BaseButton>
        </div>
      </div>
    </aside>
  </main>
</template>

<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {useUserStore} from "@/stores/user";
import TextInput from "@/components/TextInput.vue";
import BaseButton from "@/components/BaseButton.vue";
import {Form, Field} from "vee-validate";
import {useStyleStore} from "@/stores/style";
import {computed, ref} from "vue";
import {updateUser} from "@/services/user";

const userStore = useUserStore();
const styleStore = useStyleStore();

const profilePicture = ref(userStore.getUserProfile);
const profilePictureFile = ref(null);

const editProfilePicture = ref(false);
const editName = ref(false);
const editEmail = ref(false);
const editEmailMessageSent = ref(false);
const editPassword = ref(false);

const changesActive = computed(() => {
  return editName.value || editEmail.value || editPassword.value
})

const clearEdit = () => {
  editProfilePicture.value = false;
  profilePicture.value = userStore.getUserProfile;
  editEmailMessageSent.value = false;
  editName.value = false;
  editPassword.value = false;
  editEmail.value = false;
}

const toggleEdit = (field) => {
  clearEdit();
  profilePicture.value = userStore.getUserProfile;
  if (field === 'name') editName.value = true;
  if (field === 'email') editEmail.value = true;
  if (field === 'password') editPassword.value = true;
}

const changeProfilePicture = (event) => {
  clearEdit();
  const files = event.target.files;
  const file = files[0];
  editProfilePicture.value = true

  const reader = new FileReader();
  reader.onload = () => {
    profilePictureFile.value = file;
    profilePicture.value = reader.result;
  }

  reader.readAsDataURL(file)
}

const handleUserUpdate = (meta, values) => {
  clearEdit();
  const formData = new FormData();
  if (values.name) {
    formData.append('name', values.name);
    userStore.setUserName(values.name);
  }
  if (values.email) {
    formData.append('email', values.email);
    editEmailMessageSent.value = true;
  }
  if (values.password) formData.append('password', values.password);
  if (values.password_confirmation) formData.append('password_confirmation', values.password_confirmation);
  updateUser(userStore.getUserID, formData);
}

const handleSubmitProfilePicture = () => {
  const formData = new FormData();
  formData.append('profile_picture', profilePictureFile.value);
  updateUser(userStore.getUserID, formData);
  userStore.setUserPFP(profilePicture.value);
  clearEdit();
}
</script>


