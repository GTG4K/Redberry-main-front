<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-6 min-h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-span-5 flex flex-col gap-6 py-5 pr-14">
      <h2 class="text-white">Movie description</h2>
      <div class="grid grid-cols-5 gap-6">
        <img :src="selectedMovie.poster" class="w-full col-span-3 h-[32rem] object-cover rounded-xl">
        <div class="flex flex-col gap-8 col-span-2">
          <h2 class="text-2xl text-white">{{selectedMovie.title}} ({{selectedMovie.release_date}})</h2>
          <h3 class="bg-gray-400 rounded text-white w-fit px-2 py-1">{{selectedMovie.genre}}</h3>
          <h2 class="text-md text-white">Director: {{selectedMovie.director}}</h2>
          <p class="text-white">{{selectedMovie.description}}</p>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <h2 class="text-white text-xl">Quotes (total {{selectedMovie.quotes.length}})</h2>
        <div class="w-0.5 h-full bg-white/20"></div>
        <BaseButton color="red">Add quote</BaseButton>
      </div>
      <div class="grid grid-cols-5 gap-6">
        <div v-for="quote in selectedMovie.quotes" :key="quote.id" class="bg-black/20 col-span-3 rounded p-8">
          <div class="grid grid-cols-6 gap-6 items-center">
            <img :src="quote.image" alt="quote image" class="w-full h-40 object-cover rounded col-span-2">
            <h2 class="text-white/60 text-xl col-span-4">"{{quote.quote}}"</h2>
          </div>
          <div class="w-full h-0.5 bg-white/20 mt-6 mb-4"></div>
          <div class="flex gap-6">
            <h2 class="text-white">{{quote.comments.length}} Comments</h2>
            <h2 class="text-white">0 Likes</h2>
          </div>
        </div>
      </div>
    </aside>
  </main>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

import {useRoute} from "vue-router";
import {useMoviesStore} from "@/stores/Movies";
import {computed} from "vue";
import BaseButton from "@/components/BaseButton.vue";

const route = useRoute();
const movieStore = useMoviesStore();

const selectedMovie = computed(()=>{
  return movieStore.getMovie(route.params.slug)
})

</script>