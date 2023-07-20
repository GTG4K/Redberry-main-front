<template>
  <div>
    <div class="fixed bg-backdrop sm:top-[4.5rem] sm:left-1/2 sm:-translate-x-1/2
        sm:w-1/2 text-white z-30 sm:rounded-xl sm:h-[41rem] overflow-y-auto
        w-screen top-0 left-0 h-screen">
      <div class="grid grid-cols-3 items-center">
        <h2 class="py-6 text-center col-start-2">{{ $t('message.add_a_new_quote') }}</h2>
        <div class="flex justify-end items-center">
          <h2 @click="toggleAddQuote(false)" class="cursor-pointer hover:text-white text-white/50 pr-10">X</h2>
        </div>
      </div>
      <div class="h-0.5 w-full bg-white/20"></div>
      <form class="p-5 flex flex-col gap-5" @submit.prevent="submitForm">
        <div class="flex items-center gap-4">
          <img :src="userStore.getUserProfile" alt="profile picture" class="w-14 rounded-full">
          <h2>{{ userStore.getUserName }}</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
                <textarea :placeholder='$t("message.quoteEn")' name="quote_en" v-model="quoteEn"
                          class="w-[calc(100%-4rem)] h-20 bg-transparent outline-0 px-2 resize-none"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">ENG</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
                <textarea :placeholder='$t("message.quoteKa")' name="quote_ka" v-model="quoteKa"
                          class="w-[calc(100%-4rem)] h-20 bg-transparent outline-0 px-2 resize-none"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">GEO</h2>
        </div>
        <BaseFile v-model="image"></BaseFile>
        <MovieDropdown v-model="selectedMovie" :locked="props.movieLock" :movies="movieList"></MovieDropdown>
        <BaseButton submit color="red">{{ $t('message.submit') }}</BaseButton>
      </form>
    </div>
    <div @click="toggleAddQuote(false)"
         class="fixed top-0 left-0 bg-black opacity-70 h-screen w-screen z-20"></div>
  </div>
</template>

<script setup>
import MovieDropdown from "@/components/MovieDropdown.vue";
import BaseButton from "@/components/BaseButton.vue";
import {computed, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useMoviesStore} from "@/stores/Movies";
import BaseFile from "@/components/BaseFile.vue";
import {storeQuote} from "@/services/quotes";
import {useQuoteStore} from "@/stores/Quotes";


const props = defineProps({movieLock: Object})
const emits = defineEmits(['toggleAddQuote'])
const userStore = useUserStore();
const quoteStore = useQuoteStore();

const image = ref(null);
const quoteEn = ref('');
const quoteKa = ref('');
const selectedMovie = ref(props.movieLock?.poster ? props.movieLock : null)

const submitForm = () => {
  const formData = new FormData();
  formData.append('image', image.value);
  formData.append('quote_en', quoteEn.value);
  formData.append('quote_ka', quoteKa.value);
  formData.append('movie_id', selectedMovie.value.id);
  formData.append('user_id', userStore.getUserID);
  storeQuote(formData)

  const fileReader = new FileReader();
  fileReader.onload = () => {
    let imageAsDataUrl = fileReader.result;
    quoteStore.addQuote(selectedMovie.value.id, quoteEn.value, quoteKa.value, imageAsDataUrl);
  };
  fileReader.readAsDataURL(image.value);
  toggleAddQuote(false)
}

const movieStore = useMoviesStore();
const movieList = computed(() => {
  return movieStore.getMovies;
})

const toggleAddQuote = (value) => {
  emits('toggleAddQuote', value)
}

</script>
