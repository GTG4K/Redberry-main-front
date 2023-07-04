<template>
  <div class="fixed sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 top-0
  left-0 bg-form z-30 sm:rounded sm:p-12 p-6 flex flex-col gap-5 sm:w-[500px] w-full sm:h-auto h-screen" :class="props.class">
    <div v-if="props.title || props.description" class="flex flex-col gap-2 items-center sm:mt-0 mt-[20%]">
      <h2 class="text-white text-2xl sm:text-left text-center">{{ props.title }}</h2>
      <p class="text-white opacity-50 text-sm text-center">{{ props.description }}</p>
    </div>
    <slot></slot>
  </div>
  <div @click="emit('close')" class="fixed top-0 left-0 bg-black opacity-70 h-screen w-screen blur z-20"></div>
</template>

<script setup>
const props = defineProps({'title': String, 'description': String, 'class': String});
const emit = defineEmits(['close'])
</script>
