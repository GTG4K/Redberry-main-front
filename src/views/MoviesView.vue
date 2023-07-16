<template>
  <HeaderComponent/>
  <main class="bg-background pt-header min-h-screen sm:pr-14 px-7">
    <NavigationBar v-if="!styleStore.deviceIsMobile"></NavigationBar>
    <aside class="sm:pl-52 py-5">
      <div class="flex flex-col gap-2">
        <div class="flex justify-between">
          <h2 class="text-white">My List of movies (Total {{ movieList.length }})</h2>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <img v-if="!styleStore.deviceIsMobile" src="../assets/svg/input-search.svg" alt="search" class="w-5 h-5">
              <input v-if="!styleStore.deviceIsMobile" type="text" v-model="search" placeholder="Search"
                     class="bg-transparent outline-0 py-1 w-[6rem] text-white transition-all border-white focus:w-72 focus:border-b">
            </div>
            <BaseButton @click="toggleAddMovie" color="red">new movie</BaseButton>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <img v-if="styleStore.deviceIsMobile" src="../assets/svg/input-search.svg" alt="search" class="w-5 h-5">
          <input v-if="styleStore.deviceIsMobile" type="text" v-model="search" placeholder="Search"
                 class="bg-transparent outline-0 py-1 w-[6rem] text-white transition-all border-white focus:w-full focus:border-b">
        </div>
      </div>
      <div class="grid xl:grid-cols-3 lg:grid-cols-2 pt-10 sm:gap-6 gap-14">
        <div v-for="movie in movieList" :key="movie.id" class="flex flex-col gap-2 hover:scale-105 transition-all"
             @click="router.push(`/movies/${movie.slug}`)">
          <img :src="movie.poster" alt="movie poster" class=" w-full h-80 object-cover cursor-pointer rounded">
          <h2 class="text-white text-2xl">{{ movie.title[languageStore.getLanguage] }} ({{ movie.release_date }})</h2>
          <h2 class="text-white text-md">{{ movie.quotes.length }} quotes(s)</h2>
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
import {useStyleStore} from "@/stores/style";

const search = ref(null);
const addMovie = ref(false);
const styleStore = useStyleStore();
const toggleAddMovie = (value) => {
  value ? addMovie.value = value : addMovie.value = !addMovie.value;
}

const router = useRouter();
const movieStore = useMoviesStore();
const languageStore = useLanguageStore()
const movieList = computed(() => {
  const movies = movieStore.getUserMovies;
  const query = search.value;
  if (!query) return movies;
  return movies.filter(movie =>
      movie.title.en.toLowerCase().includes(query.toLowerCase()) ||
      movie.title.ka.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.ka.toLowerCase().includes(query.toLowerCase()) ||
      movie.director.en.toLowerCase().includes(query.toLowerCase())
  );
})


</script>