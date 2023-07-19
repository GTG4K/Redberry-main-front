<template>
  <HeaderComponent/>
  <main class="bg-background pt-header min-h-screen px-3">
    <NavigationBar v-if="!styleStore.deviceIsMobile"></NavigationBar>
    <aside class="sm:pl-52 py-5 flex flex-col gap-6">
      <h2 class="text-white">{{$t("message.movie_description")}}</h2>
      <MovieStats :movie="selectedMovie" @toggleEditMovie="toggleEditMovie"></MovieStats>
      <div class="flex sm:flex-row sm:items-center sm:gap-4 gap-2 flex-col">
        <h2 v-if="!styleStore.deviceIsMobile" class="text-white text-xl">{{ $t('message.quotes') }} ({{$t('message.total')}} {{ selectedMovie.quotes.length }})</h2>
        <div v-if="!styleStore.deviceIsMobile" class="w-0.5 h-full bg-white/20"></div>
        <BaseButton color="red" @click="toggleAddQuote">{{ $t('message.add_quote') }}</BaseButton>
        <div v-if="styleStore.deviceIsMobile" class="w-full h-0.5 bg-white/20 mt-6 mb-4"></div>
        <h2 v-if="styleStore.deviceIsMobile" class="text-white text-sm">{{ $t('message.quotes') }} ({{$t('message.total')}} {{ selectedMovie.quotes.length }})</h2>
      </div>
      <MovieQuotes v-if="!styleStore.deviceIsMobile" :movie="selectedMovie"></MovieQuotes>
    </aside>
  </main>
  <MovieQuotes v-if="styleStore.deviceIsMobile" :movie="selectedMovie"></MovieQuotes>
  <EditMovieModal v-if="editMovie" :movieId="selectedMovie.id" @toggleEditMovie="toggleEditMovie"></EditMovieModal>
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
import EditMovieModal from "@/components/EditMovieModal.vue";
import {useStyleStore} from "@/stores/style";

const route = useRoute();
const movieStore = useMoviesStore();
const styleStore = useStyleStore();

const addQuote = ref(false);
const editMovie = ref(false);


const toggleEditMovie  = (value) => {
  value ? editMovie.value = value : editMovie.value = !editMovie.value;
}

const toggleAddQuote = (value) => {
  value ? addQuote.value = value : addQuote.value = !addQuote.value;
}

const selectedMovie = computed(() => {
  return movieStore.getMovieBySlug(route.params.slug)
})

</script>