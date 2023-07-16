<template>
  <HeaderComponent/>
  <main class="bg-background pt-header sm:px-7 min-h-screen">
    <NavigationBar v-if="!styleStore.deviceIsMobile"></NavigationBar>
    <aside class="lg:pl-96 sm:pl-52 sm:py-5 lg:w-[calc(100vw/1.35)]">
      <div class="flex gap-4 sm:pb-5">
        <div @click="toggleAddQuote(true)"
             class="transition-all bg-input flex sm:rounded gap-2 p-3 items-center sm:w-auto w-full cursor-pointer hover:bg-gray-600/50">
          <img src="../assets/svg/input-icon.svg" alt="input icon" class="w-6">
          <p class="text-white">Enter a quote</p>
        </div>
        <div v-if="!styleStore.deviceIsMobile"
             class="flex gap-2 items-center cursor-pointer w-[75%] border-b-2 border-white/50">
          <img src="../assets/svg/input-search.svg" alt="input icon" class="w-6">
          <input type="text" class="text-white w-full py-3 bg-transparent outline-0 pl-2" v-model="search"
                 placeholder="Enter @ to search movies, Enter # to search quotes">
        </div>
      </div>
      <div class="flex flex-col gap-8 relative">
        <QuotesComponent :search="search"/>
        <NewQuoteModal v-if="addQuote" @toggleAddQuote="toggleAddQuote"/>
      </div>
    </aside>
  </main>
</template>

<script setup>
import HeaderComponent from "../components/HeaderComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import QuotesComponent from "@/components/QuotesComponent.vue";
import {onMounted, ref} from "vue";
import NewQuoteModal from "@/components/NewQuoteModal.vue";
import {useStyleStore} from "@/stores/style";
import instantiatePusher from "@/helpers/instantiatePusher";

const search = ref('');

const addQuote = ref(false);
const styleStore = useStyleStore();

// const pusherActive = ref(false);
// onMounted(()=>{
//   pusherActive.value = instantiatePusher();
// })

const toggleAddQuote = (value) => {
  value ? addQuote.value = value : addQuote.value = !addQuote.value;
}

</script>


