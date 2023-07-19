<template>
  <div class="lg:grid lg:grid-cols-5 gap-6 flex flex-col">
    <img :src="props.movie.poster" alt="movie poster" class="lg:col-span-3 lg:h-[32rem] h-60 w-full object-cover rounded-xl">
    <div class="flex flex-col gap-8 col-span-2">
      <div class="flex justify-between items-center">
        <h2 class="lg:text-2xl md:text-xl sm:text-lg text-md text-white">
          {{ props.movie.title[languageStore.getLanguage] }} ({{ props.movie.release_date }})</h2>
        <div class="flex items-center bg-header/80 rounded overflow-hidden h-10">
          <div class="flex items-center w-full h-full cursor-pointer px-4 hover:bg-white/10 transition-all"
               @click="emits('toggleEditMovie')">
            <img class="min-w-5 min-h-5" src="../assets/svg/pencil.svg" alt="edit">
          </div>
          <div class="w-0.5 h-2/3 bg-white/10"></div>
          <div class="flex items-center w-full h-full cursor-pointer px-4 hover:bg-red-500/10 transition-all"
               @click="handleDeleteMovie(props.movie.id)">
            <img class="min-w-5 min-h-5" src="../assets/svg/trash.svg" alt="trash">
          </div>
        </div>
      </div>
      <h3 class="bg-gray-400 rounded text-white lg:text-md text-sm w-fit px-2 py-1">{{ props.movie.genre }}</h3>
      <h2 class="lg:text-md text-sm text-white">{{ $t('message.director') }}: {{ props.movie.director[languageStore.getLanguage] }}</h2>
      <p class="lg:text-md text-sm text-white">{{ props.movie.description[languageStore.getLanguage] }}</p>
    </div>
  </div>
</template>
<script setup>
import {useLanguageStore} from "@/stores/language";
import {deleteMovie} from "@/services/movies";
import {useMoviesStore} from "@/stores/Movies";
import {useRouter} from "vue-router";

const languageStore = useLanguageStore();
const movieStore = useMoviesStore();
const props = defineProps({movie: Object});
const router = useRouter();

const emits = defineEmits(['toggleEditMovie'])

const handleDeleteMovie = (movieId) => {
  deleteMovie(movieId);
  router.push({name: 'movies'});
  movieStore.deleteMovie(movieId);
}


</script>


