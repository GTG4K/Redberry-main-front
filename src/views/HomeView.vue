<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-4 h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-span-2 py-5">
      <div class="flex gap-4">
        <div class="transition-all bg-input flex rounded gap-2 p-3 items-center cursor-pointer hover:bg-gray-600/50">
          <img src="../assets/svg/input-icon.svg" alt="input icon" class="w-6">
          <p class="text-white">Enter a quote</p>
        </div>
        <div class="flex gap-2 items-center cursor-pointer w-[75%] border-b-2 border-white/50">
          <img src="../assets/svg/input-search.svg" alt="input icon" class="w-6">
          <input type="text" class="text-white w-full py-3 bg-transparent outline-0 pl-2" placeholder="Enter @ to search movies, Enter # to search quotes">
        </div>
      </div>
    </aside>
  </main>
</template>

<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";

</script>


