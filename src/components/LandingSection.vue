<template>
  <div class="relative h-screen">
    <img v-if="props.section === 1" src="../assets/img/landing_img1.png" alt="landingP1" class="w-full h-full object-cover">
    <img v-if="props.section === 2" src="../assets/img/landing_img2.png" alt="landingP1" class="w-full h-full object-cover">
    <img v-if="props.section === 3" src="../assets/img/landing_img3.png" alt="landingP1" class="w-full h-full object-cover">
    <div class="flex gap-2 absolute top-[35%] left-20">
      <div class="h-[1px] w-10 mt-3 bg-white"></div>
      <div class="flex flex-col gap-3 w-1/2">
        <h2 class="text-3xl text-white">{{ props.quote }}</h2>
        <p class="text-md text-white opacity-50">{{ props.movie }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({quote: String, movie: String, section: Number});

</script>
