<template>
  <button @click="redirect" :type="props.submit ? 'submit' : 'button'"
          class="text-white h-8 sm:min-w-[6rem] min-w-[4rem] sm:px-3 px-1.5 rounded sm:text-sm text-xs flex justify-center items-center gap-2"
          :class="buttonTheme" :form="props.form">
    <slot></slot>
  </button>
</template>

<script setup>
import {computed} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const redirect = () => {
  if (props.href) {
    router.push(props.href)
  }
}
const props = defineProps({'color': String, 'size': String, 'submit': Boolean, 'form': String, 'href': String});
const buttonTheme = computed(() => {
  return {
    'w-full': props.size === 'full',
    'bg-red-500 hover:bg-red-600': props.color === 'red',
    'hover:text-gray-300': props.color === 'none',
    'border border-white hover:bg-gray-800/50': !props.color,
  }
})
</script>

<style scoped>
</style>