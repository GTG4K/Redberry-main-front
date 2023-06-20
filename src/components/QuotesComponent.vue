<template>
  <div v-for="quote in props.quotes" :key="quote.id" class="bg-black/25 rounded-xl p-5 flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      <img :src="quote.user.profile_picture" alt="user icon" class="w-12 rounded-full">
      <h3 class="text-white">{{ quote.user.name }}</h3>
    </div>
    <p class="text-white">"{{ quote.quote }}" Movie - {{ quote.movie.title }}. ({{ quote.movie.release_date }})</p>
    <img :src="quote.movie.poster" alt="movie poster" class="rounded-xl w-full">
    <div class="flex gap-4 text-white">
      <h1>{{quote.comments.length}} Comments</h1>
      <h1>43 likes</h1>
    </div>
    <div class="w-full h-0.5 bg-white/20"></div>
    <div class="text-white">
      <div v-for="comment in quote.comments" :key="comment.comment" class="flex flex-col">
        <div class="flex gap-3 items-center">
          <img :src="comment.user.profile_picture" alt="current user pfp" class="w-12 rounded-full">
          <h2 class="text-white text-sm">{{comment.user.name}}</h2>
        </div>
        <div class="pl-[4rem]">
          <h2 class="text-white/80 text-sm">{{comment.comment}}</h2>
          <div class="w-full h-0.5 bg-white/20 mt-3"></div>
        </div>
      </div>
    </div>
    <div class="flex gap-3 items-center">
      <img :src="userStore.getUserProfile" alt="current user pfp" class="w-12 rounded-full">
      <input type="text" placeholder="share your thoughts..."
             class="text-white/80 bg-input hover:bg-gray-600/50 h-10 px-4 outline-0 w-full rounded">
    </div>
  </div>
</template>


<script setup>
import {useUserStore} from "@/stores/user";

const userStore = useUserStore();
const props = defineProps({'quotes':Object})
</script>

