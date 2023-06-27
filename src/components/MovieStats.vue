<template>
  <div class="grid grid-cols-5 gap-6">
    <img :src="props.movie.poster" alt="movie poster" class="w-full col-span-3 h-[32rem] object-cover rounded-xl">
    <div class="flex flex-col gap-8 col-span-2">
      <h2 class="text-2xl text-white">{{ props.movie.title[languageStore.getLanguage] }} ({{ props.movie.release_date }})</h2>
      <h3 class="bg-gray-400 rounded text-white w-fit px-2 py-1">{{ props.movie.genre }}</h3>
      <h2 class="text-md text-white">Director: {{ props.movie.director[languageStore.getLanguage] }}</h2>
      <p class="text-white">{{ props.movie.description[languageStore.getLanguage] }}</p>
    </div>
  </div>
</template>
<script setup>
import {useLanguageStore} from "@/stores/language";

const props = defineProps({movie:Object});
const languageStore = useLanguageStore()
</script>


