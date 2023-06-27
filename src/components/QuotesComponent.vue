<template>
  <div v-for="quote in quoteList" :key="quote.id" class="bg-backdrop rounded-xl p-5 flex flex-col gap-4">
    <div class="flex gap-3 items-center">
      <img :src="quote.user.profile_picture" alt="user icon" class="w-12 rounded-full">
      <h3 class="text-white">{{ quote.user.name }}</h3>
    </div>
    <p class="text-white">"{{ quote.quote[languageStore.getLanguage] }}" Movie -
      <b class="cursor-pointer text-yellow-600 hover:text-yellow-500"
         @click="router.push(`movies/${quote.movie.slug}`)">
        {{ quote.movie.title[languageStore.getLanguage] }}
      </b>. ({{ quote.movie.release_date }})
    </p>
    <img :src="quote.image" alt="movie poster" class="rounded-xl w-full">
    <div class="flex gap-4 text-white">
      <div class="flex gap-2 items-center py-2 px-4 rounded-full transition-all cursor-pointer hover:bg-blue-400/10">
        <h1 class="text-lg select-none">{{ quote.comments.length }} </h1>
        <img src="../assets/svg/comment.svg" alt="comment" class="w-5 h-5">
      </div>
      <div @click="handleLike(quote.id)"
           class="flex gap-2 items-center py-2 px-4 rounded-full transition-all cursor-pointer hover:bg-pink-400/10">
        <h1 class="text-lg select-none">{{ quote.likes.length }}</h1>
        <img src="../assets/svg/heart.svg" alt="heart" class="w-5 h-5" :class="{'pink': quote.likedByAuthUser}">
      </div>
    </div>
    <div class="w-full h-0.5 bg-white/20"></div>
    <div class="text-white">
      <div v-for="comment in quote.comments" :key="comment.comment" class="flex flex-col">
        <div class="flex gap-3 items-center">
          <img :src="comment.user.profile_picture" alt="current user pfp" class="w-12 rounded-full">
          <h2 class="text-white text-sm">{{ comment.user.name }}</h2>
        </div>
        <div class="pl-[4rem]">
          <h2 class="text-white/80 text-sm">{{ comment.comment }}</h2>
          <div class="w-full h-0.5 bg-white/20 mt-3"></div>
        </div>
      </div>
    </div>
    <Form as="div" v-slot="{handleSubmit, values, meta}" class="flex gap-3 items-center">
      <img :src="userStore.getUserProfile" alt="current user pfp" class="w-12 rounded-full">
      <form @submit="handleSubmit($event, storeComment(meta, values))" class="w-full">
        <Field v-model="commentField" type="text" name="comment" placeholder="share your thoughts..."
               class="text-white/80 bg-input hover:bg-gray-600/50 h-10 px-4 outline-0 w-full rounded" rules="required"/>
        <Field type="hidden" name="user_id" :value="userStore.getUserID"/>
        <Field type="hidden" name="movie_id" :value="quote.movie.id"/>
        <Field type="hidden" name="quote_id" :value="quote.id"/>
      </form>
    </Form>
  </div>
</template>


<script setup>
import {useUserStore} from "@/stores/user";
import {Field, Form} from "vee-validate";
import {computed, ref} from "vue";
import {storeComments} from "@/services/comments";
import {useQuoteStore} from "@/stores/Quotes";
import {useMoviesStore} from "@/stores/Movies";
import {useRouter} from "vue-router";
import {useLanguageStore} from "@/stores/language";
import {toggleLike} from "@/services/likes";

const commentField = ref('')
const quoteStore = useQuoteStore();
const movieStore = useMoviesStore();
const languageStore = useLanguageStore();

const router = useRouter();

const storeComment = (meta, values) => {
  if (meta.valid) {
    const comment = {
      comment: values.comment,
      user_id: values.user_id,
      quote_id: values.quote_id,
      movie_id: values.movie_id,
    }
    storeComments(comment);
    const commentData = {
      comment: values.comment,
      user: userStore.getUserResource,
    }
    quoteStore.addQuoteComment(values.quote_id, commentData);
    movieStore.addMovieComment(values.movie_id, commentData)
    commentField.value = '';
  }
}

const handleLike = async (quoteId) => {
  await toggleLike(quoteId);
  const likeData = {
    userId: userStore.getUserID,
    quoteId: quoteId,
  }
  quoteStore.toggleQuoteLike(quoteId, likeData);
}

const userStore = useUserStore();
const quoteList = computed(() => {
  return quoteStore.getQuotes;
})
</script>
<style scoped>
.pink {
  filter: invert(34%) sepia(48%) saturate(4338%) hue-rotate(328deg) brightness(95%) contrast(96%);
}
</style>