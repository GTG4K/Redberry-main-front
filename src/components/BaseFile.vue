<template>
  <div>
    <label v-if='!uploadedImage' for="image"
           class="relative transition-all w-full border border-white/20 rounded h-20 flex items-center text-sm px-2 hover:bg-red-300/20 cursor-pointer">
      Drag & drop or Choose file..</label>
    <label v-else for="image"
           class="relative flex gap-2 transition-all w-full border border-white/20 rounded flex items-center text-sm p-2 hover:bg-red-300/20 cursor-pointer">
      <img :src="uploadedImage" alt="image preview" class="h-20 object-cover rounded">
      select another file?
    </label>
    <input name="image" type="file" id="image" @change="updateFile" class="hidden"/>
  </div>
</template>

<script setup>

import {ref} from "vue";

const emits = defineEmits(['update:modelValue']);

const uploadedImage = ref(null);

const updateFile = (e) => {
  const files = e.target.files;
  const fileReader = new FileReader();

  const firstFile = files[0];
  emits('update:modelValue', firstFile);

  fileReader.onload = () => {
    uploadedImage.value = fileReader.result
  };

  fileReader.readAsDataURL(firstFile)
}
</script>