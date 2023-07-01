<template>
  <div>
    <div
        class="fixed bg-backdrop top-[4.5rem] left-1/2 -translate-x-1/2 w-1/2 text-white z-30 rounded-xl max-h-[45rem] overflow-y-auto">
      <h2 class="py-6 text-center">Add New Movie</h2>
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
                    class="w-[calc(100%-4rem)] py-1 h-28 bg-transparent outline-0 px-2"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">ENG</h2>
        </div>
        <div class="relative w-full border border-white/20 rounded">
          <textarea placeholder='Description in georgian' name="description_ka" v-model="descriptionKa"
                    class="w-[calc(100%-4rem)] py-1 h-28 bg-transparent outline-0 px-2"></textarea>
          <h2 class="absolute top-2 right-2 text-sm">GEO</h2>
        </div>
        <div class="rounded-xl mb-4 overflow-hidden relative">
          <label for="image" class="relative group cursor-pointer w-full">
            <img :src="imageURL" alt="quote image" class="w-full object-cover">
            <span class="absolute top-1/2 left-1/2 -translate-x-1/2 transition-all
              -translate-y-1/2 bg-backdrop/60 w-60 h-40 rounded-xl flex justify-center items-center group-hover:bg-backdrop/80">
                Change Photo
              </span>
          </label>
          <input type="file" class="hidden" @change="updateImage" id="image">
        </div>
        <BaseButton submit color="red">Submit quote</BaseButton>
      </form>
    </div>
    <div @click="toggleEditMovie(false)"
         class="fixed top-0 left-0 bg-black opacity-70 h-screen w-screen z-20"></div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import BaseButton from "@/components/BaseButton.vue";
import {useUserStore} from "@/stores/user";
import {updateMovie} from "@/services/movies";
import {useMoviesStore} from "@/stores/Movies";

const props = defineProps({movieId: Number});
const emits = defineEmits(['toggleEditMovie'])
const userStore = useUserStore();
const movieStore = useMoviesStore();

const movie = movieStore.getMovieById(props.movieId);

const imageURL = ref(movie.poster);
const file = ref(null);

const descriptionEn = ref(movie.description.en);
const descriptionKa = ref(movie.description.ka);
const directorEn = ref(movie.director.en);
const directorKa = ref(movie.director.ka);
const titleEn = ref(movie.title.en);
const titleKa = ref(movie.title.ka);
const releaseDate = ref(movie.release_date);
const genre = ref(movie.genre);

const submitForm = () => {
  const formData = new FormData();
  formData.append('image', file.value);
  formData.append('title_en', titleEn.value);
  formData.append('title_ka', titleKa.value);
  formData.append('description_en', descriptionEn.value);
  formData.append('description_ka', descriptionKa.value);
  formData.append('director_en', directorEn.value);
  formData.append('director_ka', directorKa.value);
  formData.append('release_date', releaseDate.value);
  formData.append('genre', genre.value);
  formData.append('user_id', userStore.getUserID);

  const movieDetails = {
    descriptionEn: descriptionEn.value,
    descriptionKa: descriptionKa.value,
    directorEn: directorEn.value,
    directorKa: directorKa.value,
    titleEn: titleEn.value,
    titleKa: titleKa.value,
    genre: genre.value,
    poster: imageURL.value,
    releaseDate: releaseDate.value,
  }

  movieStore.updateMovie(movie.id, movieDetails);
  updateMovie(formData, movie.id);
  toggleEditMovie(false)
}

const updateImage = (event) => {
  const reader = new FileReader();
  const files = event.target.files;
  const firstFile = files[0];

  file.value = firstFile;
  reader.onload = () => {
    imageURL.value = reader.result;
  }

  reader.readAsDataURL(firstFile);
}

const toggleEditMovie = (value) => {
  emits('toggleEditMovie', value)
}

</script>
