<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-6 min-h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-span-5 flex flex-col gap-6 py-5 pr-14">
      <h2 class="text-white">Movie description</h2>
      <MovieStats :movie="selectedMovie"></MovieStats>
      <div class="flex items-center gap-4">
        <h2 class="text-white text-xl">Quotes (total {{ selectedMovie.quotes.length }})</h2>
        <div class="w-0.5 h-full bg-white/20"></div>
        <BaseButton color="red" @click="toggleAddQuote">Add quote</BaseButton>
      </div>
      <MovieQuotes :movie="selectedMovie"></MovieQuotes>
    </aside>
  </main>
  <NewQuoteModal v-if="addQuote" :movieLock="selectedMovie" @toggleAddQuote="toggleAddQuote"/>
</template>
<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

import {useRoute} from "vue-router";
import {useMoviesStore} from "@/stores/Movies";
import {computed, ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import MovieStats from "@/components/MovieStats.vue";
import MovieQuotes from "@/components/MovieQuotes.vue";
import NewQuoteModal from "@/components/NewQuoteModal.vue";

const route = useRoute();
const movieStore = useMoviesStore();

const addQuote = ref(false);
const toggleAddQuote = (value) => {
  value ? addQuote.value = value : addQuote.value = !addQuote.value;
}

const selectedMovie = computed(() => {
  return movieStore.getMovie(route.params.slug)
})

</script>