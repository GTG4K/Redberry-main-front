<template>
  <div class="overflow-hidden">
    <div v-if="!selectedMovie" @click="toggleDropdown" class="relative transition-all w-full rounded h-20 flex items-center text-sm px-2 cursor-pointer bg-black">Choose movie</div>
    <div v-if="selectedMovie" class="group cursor-pointer relative rounded overflow-hidden w-full" @click="toggleDropdown">
      <img :src="selectedMovie.poster" alt="selected movie" class="transition-all w-full h-20 blur-sm object-cover">
      <h2 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl select-none">Selected: {{selectedMovie.title[languageStore.getLanguage]}}</h2>
    </div>
    <div class="transition-all overflow-y-auto" :class="dropdownOpen ? 'max-h-80 ' : 'max-h-0'">
      <div v-for="movie in props.movies" :key="movie.id" @click="setMovie(movie)" class="group cursor-pointer relative">
        <img :src="movie.poster" alt="movie picture" class="transition-all w-full h-20 blur-sm group-hover:blur-none object-cover">
        <h2 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl select-none">{{movie.title[languageStore.getLanguage]}}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useLanguageStore} from "@/stores/language";

const props = defineProps(['movies','modelValue','locked']);
const emits = defineEmits(['update:modelValue']);
const languageStore = useLanguageStore();

const selectedMovie = ref(props.modelValue || null);
const dropdownOpen = ref(false);
const toggleDropdown = () => {
  if(props.locked) return;
  dropdownOpen.value = !dropdownOpen.value;
}
const setMovie = (movie) => {
  if(props.locked) return;
  selectedMovie.value = movie;
  // eslint-disable-next-line no-undef
  emits('update:modelValue',movie);
  toggleDropdown();
}
</script>