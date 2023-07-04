<template>
  <div class="bg-backdrop col-span-3 rounded-xl py-6 px-8 relative">
    <img src="../assets/svg/options.svg" alt="options" @click="toggleOptions()"
         class="absolute top-3 right-3 w-10 h-10 p-2 cursor-pointer rounded-full hover:bg-white/10">
    <div
        class="absolute text-white top-[3.4rem] right-12 bg-header rounded-lg w-52 transition-all translate-x-full overflow-hidden"
        :class="optionsOpen ? 'max-h-60 py-2 ' : 'max-h-0'">
      <div class="flex gap-4 items-center py-2 px-5 cursor-pointer hover:bg-white/10" @click="viewQuote(quote.id)">
        <img class="w-4 h-4" src="../assets/svg/eye.svg" alt="eyes">
        <p class="text-xs">View Quote</p>
      </div>
      <div v-if="quote.user.id === userStore.getUserID" @click="editQuote(quote.id)"
           class="flex gap-4 items-center py-2 px-5 cursor-pointer hover:bg-white/10">
        <img class="w-4 h-4" src="../assets/svg/pencil.svg" alt="eyes">
        <p class="text-xs">Edit</p>
      </div>
      <div v-if="quote.user.id === userStore.getUserID" @click="handleDeleteQuote(quote.id)"
           class="flex gap-4 items-center py-2 px-5 cursor-pointer hover:bg-red-400/10">
        <img class="w-4 h-4" src="../assets/svg/trash.svg" alt="eyes">
        <p class="text-xs">Delete</p>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-6 items-center">
      <img :src="quote.image" alt="quote image" class="w-full h-40 object-cover rounded col-span-2">
      <h2 class="text-white/60 text-xl col-span-4">"{{ quote.quote[languageStore.getLanguage] }}"</h2>
    </div>
    <div class="w-full h-0.5 bg-white/20 mt-6 mb-4"></div>
    <div class="flex gap-6">
      <div class="flex items-center gap-3 select-none">
        <h2 class="text-white">{{ quote.comments.length }}</h2>
        <img src="../assets/svg/comment.svg" alt="comment" class="w-5 h-5">
      </div>
      <div class="flex items-center gap-3 select-none">
        <h2 class="text-white">{{ quote.likes.length }}</h2>
        <img src="../assets/svg/heart.svg" alt="like" class="w-5 h-5">
      </div>
    </div>
  </div>
</template>


<script setup>
import {useLanguageStore} from "@/stores/language";
import {useUserStore} from "@/stores/user";
import {computed, ref} from "vue";
import {useQuoteStore} from "@/stores/Quotes";
import {useRouter} from "vue-router";
import {deleteQuote} from "@/services/quotes";

const languageStore = useLanguageStore();
const quoteStore = useQuoteStore();
const userStore = useUserStore();
const router = useRouter();

const props = defineProps({quoteId: Number});
const quote = computed(() => {
  return quoteStore.getQuoteById(props.quoteId);
})

const optionsOpen = ref(false);
const toggleOptions = (value) => {
  value ? optionsOpen.value = value : optionsOpen.value = !optionsOpen.value;
}

const viewQuote = (quoteId) => {
  toggleOptions(false);
  router.push(`/quote/${quoteId}`);
}

const editQuote = (quoteId) => {
  toggleOptions(false);
  router.push(`/quote/${quoteId}?edit=true`);
}

const handleDeleteQuote = (quoteId) => {
  toggleOptions(false);
  deleteQuote(quoteId);
  quoteStore.deleteQuote(quoteId);
}

</script>
