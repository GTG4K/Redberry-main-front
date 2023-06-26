<template>
  <div class="relative">
    <div @click="toggleDropdown"
         class="flex justify-between gap-2 px-2 py-1 rounded w-28 border border-white cursor-pointer select-none">
      <h2 class="text-white text-sm">{{ selectedValue }}</h2>
      <img src="../assets/svg/down-arrow.svg" alt="down arrow" class="transition-all" :class="{'rotate-180':dropdownActive}">
    </div>
    <div class="transition-all overflow-hidden absolute top-9 text-white rounded bg-header"
         :class="dropdownActive ? 'max-h-32 w-28 py-2 border border-white' : 'max-h-0' ">
      <h2 @click="updateLanguage('en')" class="cursor-pointer px-2 py-2 hover:bg-white/10">English</h2>
      <h2 @click="updateLanguage('ka')" class="cursor-pointer px-2 py-2 hover:bg-white/10">ქართული</h2>
    </div>
  </div>
</template>
<script setup>
import {computed, ref} from "vue";
import {setLanguage} from "@/services/language";
import {useLanguageStore} from "@/stores/language";

const languageStore = useLanguageStore()
const dropdownActive = ref(false);

const selectedValue = computed(() => {
  return languageStore.getLanguage === 'en' ? 'English' : 'ქართული';
})

// set language
languageStore.updateLanguage()

const toggleDropdown = () => {
  dropdownActive.value = !dropdownActive.value
}
const updateLanguage = async (language) => {
  const data = {language: language}

  await setLanguage(data);
  await languageStore.updateLanguage();

  toggleDropdown();
}
</script>


