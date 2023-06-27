<template>
  <div class="grid grid-cols-5 gap-6">
    <div v-for="quote in props.movie.quotes" :key="quote.id" class="bg-backdrop col-span-3 rounded p-8">
      <div class="grid grid-cols-6 gap-6 items-center">
        <img :src="quote.image" alt="quote image" class="w-full h-40 object-cover rounded col-span-2">
        <h2 class="text-white/60 text-xl col-span-4">"{{ quote.quote[languageStore.getLanguage] }}"</h2>
      </div>
      <div class="w-full h-0.5 bg-white/20 mt-6 mb-4"></div>
      <div class="flex gap-6">
        <h2 class="text-white">{{ quote.comments.length }} Comments</h2>
        <h2 class="text-white">0 Likes</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useLanguageStore} from "@/stores/language";

const props = defineProps({movie:Object})
const languageStore = useLanguageStore();
</script>
