<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-6 min-h-screen pr-14">
    <NavigationBar></NavigationBar>
    <aside class="col-start-2 col-span-5 py-5">
      <div class="flex justify-between">
        <h2 class="text-white">My List of movies (Total {{movieList.length}})</h2>
        <BaseButton @click="toggleAddMovie" color="red">new movie</BaseButton>
      </div>
      <div class="grid grid-cols-3 pt-10 gap-6">
        <div v-for="movie in movieList" :key="movie.id" class="flex flex-col gap-2 hover:scale-105 transition-all" @click="router.push(`/movies/${movie.slug}`)">
          <img :src="movie.poster" alt="movie poster" class=" w-full h-80 object-cover cursor-pointer rounded">
          <h2 class="text-white text-2xl">{{movie.title[languageStore.getLanguage]}} ({{movie.release_date}})</h2>
          <h2 class="text-white text-md">{{movie.quotes.length}} quotes(s)</h2>
        </div>
      </div>
    </aside>
  </main>
  <NewMovieModal v-if="addMovie" @toggleAddMovie="toggleAddMovie"></NewMovieModal>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import {useMoviesStore} from "@/stores/Movies";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useLanguageStore} from "@/stores/language";
import BaseButton from "@/components/BaseButton.vue";
import NewMovieModal from "@/components/NewMovieModal.vue";

const addMovie = ref(false);
const toggleAddMovie = (value) => {
  value ? addMovie.value = value : addMovie.value = !addMovie.value;
}

const router = useRouter();
const movieStore = useMoviesStore();
const languageStore = useLanguageStore()
const movieList = computed(() => {
  return movieStore.getUserMovies;
})


</script>


