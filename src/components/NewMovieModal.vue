<template>
  <div>
    <div
        class="fixed bg-backdrop sm:top-[4.5rem] sm:left-1/2 sm:-translate-x-1/2
        sm:w-1/2 text-white z-30 sm:rounded-xl sm:h-[41rem] overflow-y-auto
        w-screen top-0 left-0 h-screen">
      <div class="grid grid-cols-3 items-center">
        <h2 class="py-6 text-center col-start-2">Add a new movie</h2>
        <div class="flex justify-end items-center">
          <h2 @click="toggleAddMovie(false)" class="cursor-pointer hover:text-white text-white/50 pr-10">X</h2>
        </div>
      </div>
      <div class="h-0.5 w-full bg-white/20"></div>
      <form class="p-5 flex flex-col gap-5" @submit.prevent="submitForm">
        <div class="flex items-center gap-4">
          <img :src="userStore.getUserProfile" alt="profile picture" class="w-14 rounded-full">
          <h2>{{ userStore.getUserName }}</h2>
        </div>
        <!--title-->
        <div class="relative w-full border border-white/20 rounded">
          <input type="text" placeholder='Title in english' name="title_en" v-model="titleEn"
                 class="w-[calc(100%-4rem)] py-1 bg-transparent outline-0 px-2 resize-none">
          <h2 class="absolute top-2 right-2 text-sm">ENG</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
          <input type="text" placeholder='Title in georgian' name="title_ka" v-model="titleKa"
                 class="w-[calc(100%-4rem)] py-1 bg-transparent outline-0 px-2 resize-none">
          <h2 class="absolute top-2 right-2 text-sm">GEO</h2>
        </div>
        <!--director-->
        <div class="relative w-full border border-white/20 rounded">
          <input type="text" placeholder='Director in english' name="director_en" v-model="directorEn"
                 class="w-[calc(100%-4rem)] py-1 bg-transparent outline-0 px-2 resize-none">
          <h2 class="absolute top-2 right-2 text-sm">ENG</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
          <input type="text" placeholder='Director in georgian' name="director_ka" v-model="directorKa"
                 class="w-[calc(100%-4rem)] py-1 bg-transparent outline-0 px-2 resize-none">
          <h2 class="absolute top-2 right-2 text-sm">GEO</h2>
        </div>
        <!--release date and genre -->
        <div class="relative w-full border border-white/20 rounded">
          <input type="number" placeholder='select release date' name="release_date" v-model="releaseDate"
                 class="w-full py-1 bg-transparent outline-0 px-2 resize-none">
        </div>
        <div class="relative w-full border border-white/20 rounded">
          <input type="text" placeholder='select genre' name="genre" v-model="genre"
                 class="w-full py-1 bg-transparent outline-0 px-2 resize-none">
        </div>
        <!--description-->
        <div class="relative w-full border border-white/20 rounded">
          <textarea placeholder='Description in english' name="description_en" v-model="descriptionEn"
                    class="w-[calc(100%-4rem)] py-1 h-14 bg-transparent outline-0 px-2 resize-none"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">ENG</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
          <textarea placeholder='Description in georgian' name="description_ka" v-model="descriptionKa"
                    class="w-[calc(100%-4rem)] py-1 h-14 bg-transparent outline-0 px-2 resize-none"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">GEO</h2>
        </div>
        <BaseFile v-model="image"></BaseFile>
        <BaseButton submit color="red">Submit quote</BaseButton>
      </form>
    </div>
    <div @click="toggleAddMovie(false)"
         class="fixed top-0 left-0 bg-black opacity-70 h-screen w-screen z-20"></div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useUserStore} from "@/stores/user";
import BaseFile from "@/components/BaseFile.vue";
import {storeMovie} from "@/services/movies";
import {useMoviesStore} from "@/stores/Movies";

const emits = defineEmits(['toggleAddMovie'])
const userStore = useUserStore();
const movieStore = useMoviesStore();

const image = ref(null);
const descriptionEn = ref('');
const descriptionKa = ref('');
const directorEn = ref('');
const directorKa = ref('');
const titleEn = ref('');
const titleKa = ref('');
const releaseDate = ref('');
const genre = ref('');

const submitForm = () => {
  const formData = new FormData();
  formData.append('image', image.value);
  formData.append('title_en', titleEn.value);
  formData.append('title_ka', titleKa.value);
  formData.append('description_en', descriptionEn.value);
  formData.append('description_ka', descriptionKa.value);
  formData.append('director_en', directorEn.value);
  formData.append('director_ka', directorKa.value);
  formData.append('release_date', releaseDate.value);
  formData.append('genre', genre.value);
  formData.append('user_id', userStore.getUserID);
  storeMovie(formData);

  const fileReader = new FileReader();
  fileReader.onload = () => {
    let imageAsDataUrl = fileReader.result;
    movieStore.addMovie(descriptionEn.value, descriptionKa.value, directorEn.value, directorKa.value, titleEn.value, titleKa.value, genre.value, releaseDate.value, imageAsDataUrl);
  };
  fileReader.readAsDataURL(image.value);
  toggleAddMovie(false)
}

const toggleAddMovie = (value) => {
  emits('toggleAddMovie', value)
}

</script>
