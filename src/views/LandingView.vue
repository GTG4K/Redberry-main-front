<template>
  <HeaderComponent @action="setDialog"/>
  <main class="bg-landing min-h-screen">
    <div class="bg-landing flex flex-col justify-center items-center gap-8 m-auto text-center h-screen w-[40rem]">
      <h2 class="text-yellow-dead text-4xl">Find any quote in millions of movie lines</h2>
      <BaseButton color="red"> Get Started</BaseButton>
    </div>
    <LandingSection quote="“You have to leave something behind to go forward”"
                    movie="Interstellar, 2014" :section="1"/>
    <LandingSection quote="I think we’re just gonna have to be secretly in love with each other and leave it that"
                    movie="The Royal Tenenbaums,2001" :section="2"/>
    <LandingSection quote="I think we’re just gonna have to be secretly in love with each other and leave it that"
                    movie="The Royal Tenenbaums,2001" :section="3"/>

    <!--  Dialogs  -->
    <RegisterDialog v-if="dialog==='sign_up'" @setDialog="setDialog"></RegisterDialog>
    <LoginDialog v-if="dialog==='log_in'" @setDialog="setDialog"></LoginDialog>
    <ForgotPasswordDialog v-if="dialog==='forgot'" @setDialog="setDialog"></ForgotPasswordDialog>
    <ActivateAccountDialog v-if="dialog==='activate_account'" @setDialog="setDialog"></ActivateAccountDialog>
    <AccountActivatedDialog v-if="dialog==='account_activated'" @setDialog="setDialog"></AccountActivatedDialog>
    <ResetPasswordDialog v-if="dialog==='reset_password'" @setDialog="setDialog"></ResetPasswordDialog>
    <EmailChangedDialog v-if="dialog==='email_changed'" @setDialog="setDialog"></EmailChangedDialog>
    <PasswordChangedDialog v-if="dialog==='password_changed'" @setDialog="setDialog"></PasswordChangedDialog>
    <LinkExpiredDialog v-if="dialog==='link_expired'" @setDialog="setDialog"></LinkExpiredDialog>
  </main>
</template>

<script setup>
import {ref} from "vue";
import BaseButton from "../components/BaseButton.vue";
import LandingSection from "../components/LandingSection.vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import RegisterDialog from "../components/RegisterDialog.vue";
import LoginDialog from "../components/LoginDialog.vue";
import ForgotPasswordDialog from "../components/ForgotPasswordDialog.vue";
import ActivateAccountDialog from "../components/ActivateAccountDialog.vue";
import AccountActivatedDialog from "../components/AccountActivatedDialog.vue";
import ResetPasswordDialog from "../components/ResetPasswordDialog.vue";
import EmailChangedDialog from "../components/EmailChangedDialog.vue";
import PasswordChangedDialog from "../components/PasswordChangedDialog.vue";
import LinkExpiredDialog from "../components/LinkExpiredDialog.vue";

const dialog = ref('reset_password');
const setDialog = (action) => {
  dialog.value = action;
}
</script>
