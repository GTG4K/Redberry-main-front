<template>
  <button class="text-white h-8 min-w-[80px] px-3 rounded font-light" :class="buttonTheme">
    <slot></slot>
  </button>
</template>

<script setup>
  import {computed} from "vue";

  const props = defineProps(['color']);
  const buttonTheme = computed(()=>{
    return {
      'bg-red-500': props.color === 'red',
      'border border-white': !props.color,
    }
  })
</script>

<style scoped>
</style>