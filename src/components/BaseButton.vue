<template>
  <button class="text-white h-8 min-w-[80px] px-3 rounded font-light flex justify-center items-center gap-2" :class="buttonTheme">
    <slot></slot>
  </button>
</template>

<script setup>
  import {computed} from "vue";

  const props = defineProps({'color': String, 'size':String});
  const buttonTheme = computed(()=>{
    return {
      'w-full':props.size === 'full',
      'bg-red-500 hover:bg-red-600': props.color === 'red',
      'hover:text-gray-300': props.color === 'none',
      'border border-white hover:bg-gray-800/50': !props.color,
    }
  })
</script>

<style scoped>
</style>