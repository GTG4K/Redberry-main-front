<template>
  <div class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-form z-30 rounded p-12 flex flex-col gap-5 w-[500px]">
    <div v-if="props.title || props.description" class="flex flex-col gap-2 items-center">
      <h2 class="text-white text-2xl">{{ props.title }}</h2>
      <p class="text-white opacity-50 text-sm text-center">{{ props.description }}</p>
    </div>
    <slot></slot>
  </div>
  <div @click="emit('close')" class="fixed top-0 left-0 bg-black opacity-70 h-screen w-screen blur z-20"></div>
</template>

<script setup>
const props = defineProps({'title': String, 'description': String});
const emit = defineEmits(['close'])
</script>
