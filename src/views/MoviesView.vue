<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-6 min-h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-span-5 py-5">
      <h2 class="text-white">My List of movies (Total {{movieList.length}})</h2>
      <div class="grid grid-cols-3 pt-10 pr-14 gap-6">
        <div v-for="movie in movieList" :key="movie.id" class="flex flex-col gap-2 hover:scale-105 transition-all" @click="router.push(`/movies/${movie.slug}`)">
          <img :src="movie.poster" alt="movie poster" class=" w-full h-80 object-cover rounded">
          <h2 class="text-white text-2xl">{{movie.title}} ({{movie.release_date}})</h2>
          <h2 class="text-white text-md">{{movie.quotes.length}} quotes(s)</h2>
        </div>
      </div>
    </aside>
  </main>
</template>

<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import {useMoviesStore} from "@/stores/Movies";
import {getMovies} from "@/services/movies";
import {computed} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const movieStore = useMoviesStore();
const movieList = computed(() => {
  return movieStore.getUserMovies;
})

const fetchMovies = async () => {
  const response = await getMovies()
  movieStore.setMovies(response);
  return response;
}

//update store if quotes dont exist
if (!movieStore.getMoviesExist) fetchMovies()
</script>


