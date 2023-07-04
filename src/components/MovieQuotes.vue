<template>
  <div class="grid grid-cols-5 gap-6">
    <QuoteMiniCard v-for="quote in quotes" :key="quote.id" :quoteId="quote.id"></QuoteMiniCard>
  </div>
</template>
<script setup>
import {computed} from "vue";
import {useQuoteStore} from "@/stores/Quotes";
import QuoteMiniCard from "@/components/QuoteMiniCard.vue";

const props = defineProps({movie: Object})
const quoteStore = useQuoteStore();

const quotes = computed(() => {
  return quoteStore.getQuotesByMovieId(props.movie.id);
});

</script>
