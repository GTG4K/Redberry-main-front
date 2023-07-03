<template>
  <div class="relative sm:h-screen h-[25rem] overflow-hidden">
    <img v-if="props.section === 1" src="../assets/img/landing_img1.png" alt="landingP1" class="w-full h-full  object-cover">
    <img v-if="props.section === 2" src="../assets/img/landing_img2.png" alt="landingP1" class="w-full h-full object-cover">
    <img v-if="props.section === 3" src="../assets/img/landing_img3.png" alt="landingP1" class="w-full h-full object-cover">
    <div class="flex sm:gap-2 gap-3 absolute sm:top-[35%] top-[25%] sm:left-20 left-10">
      <div class="h-[1px] w-10 mt-3 bg-white"></div>
      <div class="flex flex-col gap-3 w-2/3">
        <h2 class="sm:text-3xl text-xl text-white">{{ props.quote }}</h2>
        <p class="sm:text-md text-sm text-white sm:opacity-50 opacity-80">{{ props.movie }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({quote: String, movie: String, section: Number});

</script>
