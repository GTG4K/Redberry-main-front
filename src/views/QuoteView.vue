<template>
  <HeaderComponent/>
  <main class="bg-background pt-header grid grid-cols-4 min-h-screen">
    <NavigationBar></NavigationBar>
    <aside class="col-start-2 col-span-2 py-5">
      <div class="w-full bg-backdrop rounded text-white">
        <!-- header -->
        <div class="grid grid-cols-3 items-center p-4">
          <div v-if="!editMode && quote.user.id === userStore.getUserID" class="flex gap-2 min-h-4 items-center">
            <div class="hover:bg-white/10 p-2 rounded cursor-pointer" @click="toggleEditMode">
              <img src="../assets/svg/pencil.svg" alt="edit">
            </div>
            <div class="w-0.5 h-4 bg-white/20 rounded"></div>
            <div class="hover:bg-red-400/10 p-2 rounded cursor-pointer" @click="handleDeleteQuote">
              <img src="../assets/svg/trash.svg" alt="delete">
            </div>
          </div>
          <div v-if="editMode && quote.user.id === userStore.getUserID">
            <div class="flex gap-2 items-center hover:bg-red-400/10 p-2 rounded cursor-pointer w-fit"
                 @click="handleDeleteQuote">
              <img src="../assets/svg/trash.svg" alt="delete">
              <h2 class="text-sm">delete</h2>
            </div>
          </div>
          <div v-if="quote.user.id !== userStore.getUserID"></div>
          <h2 class="text-center select-none">Quote</h2>
          <h2 class="text-end">close</h2>
        </div>
        <div class="w-full h-0.5 bg-white/10"></div>
        <div class="p-4">
          <!-- user -->
          <div class="flex gap-3 items-center">
            <img :src="quote.user.profile_picture" alt="user icon" class="w-12 rounded-full">
            <h3 class="text-white">{{ quote.user.name }}</h3>
          </div>
          <!-- quotes -->
          <div v-if="!editMode" class="flex flex-col gap-3 py-4">
            <div class="relative w-full border border-white/20 rounded p-2">
              <h2 class="text-sm">"{{ quote.quote.en }}"</h2>
              <h2 class="absolute top-1/2 -translate-y-1/2 right-2 text-xs text-white/20">ENG</h2>
            </div>
            <div class="relative w-full border border-white/20 rounded p-2">
              <h2 class="text-sm">"{{ quote.quote.ka }}"</h2>
              <h2 class="absolute top-1/2 -translate-y-1/2 right-2 text-xs text-white/20">GEO</h2>
            </div>
          </div>
          <div v-else class="flex flex-col gap-3 py-4">
            <div class="relative w-full border border-white/20 rounded p-2">
              <textarea v-model="quoteEn"
                        class="text-sm bg-transparent border-none w-[calc(100%-4rem)] h-20 resize-none outline-0"/>
              <h2 class="absolute top-1/2 -translate-y-1/2 right-2 text-xs text-white/20">ENG</h2>
            </div>
            <div class="relative w-full border border-white/20 rounded p-2">
              <textarea v-model="quoteKa"
                        class="text-sm bg-transparent border-none w-[calc(100%-4rem)] h-20 resize-none outline-0"/>
              <h2 class="absolute top-1/2 -translate-y-1/2 right-2 text-xs text-white/20">GEO</h2>
            </div>
          </div>
          <img v-if="!editMode" :src="quote.image" alt="quote image" class="rounded-xl mb-4 w-full">
          <div v-else class="rounded-xl mb-4 overflow-hidden relative">
            <label for="image" class="relative group cursor-pointer w-full">
              <img v-if="!imageURL" :src="quote.image" alt="quote image" class="w-full object-cover">
              <img v-else :src="imageURL" alt="quote image" class="w-full object-cover">
              <span class="absolute top-1/2 left-1/2 -translate-x-1/2 transition-all
              -translate-y-1/2 bg-backdrop/60 w-60 h-40 rounded-xl flex justify-center items-center group-hover:bg-backdrop/80">
                Change Photo
              </span>
            </label>
            <input type="file" class="hidden" @change="updateImage" id="image">
          </div>
          <!-- likes & comments -->
          <div v-if="!editMode" class="flex gap-4 text-white">
            <div class="flex gap-1 items-center p-2 transition-all cursor-pointer hover:bg-blue-400/20 rounded">
              <h2>{{ quote.comments.length }}</h2>
              <img src="../assets/svg/comment.svg" alt="comments" class="h-5">
            </div>
            <div class="flex gap-1 items-center p-2 transition-all cursor-pointer hover:bg-pink-400/20 rounded"
                 @click="handleLike(quote.id)">
              <h2 :class="{'pink': quote.likedByAuthUser}">{{ quote.likes.length }}</h2>
              <img src="../assets/svg/heart.svg" alt="likes" class="h-5" :class="{'pink': quote.likedByAuthUser}">
            </div>
          </div>
          <!-- comments -->
          <div v-if="!editMode" class="text-white py-2">
            <div v-for="comment in quote.comments" :key="comment.comment" class="flex flex-col py-3">
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
          <!-- write comment -->
          <Form v-if="!editMode" as="div" v-slot="{handleSubmit, values, meta}" class="flex gap-3 items-center">
            <img :src="userStore.getUserProfile" alt="current user pfp" class="w-12 rounded-full">
            <form @submit="handleSubmit($event, storeComment($event, meta, values))" class="w-full">
              <Field v-model="commentField" type="text" name="comment" placeholder="share your thoughts..."
                     class="text-white/80 bg-input hover:bg-gray-600/50 h-10 px-4 outline-0 w-full rounded"
                     rules="required"/>
              <Field type="hidden" name="user_id" :value="userStore.getUserID"/>
              <Field type="hidden" name="movie_id" :value="quote.movie.id"/>
              <Field type="hidden" name="quote_id" :value="quote.id"/>
            </form>
          </Form>
          <BaseButton size="full" color="red" v-if="editMode" @click="handleUpdateQuote">Submit Changes</BaseButton>
        </div>
      </div>
    </aside>
  </main>
</template>

<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import NavigationBar from "@/components/NavigationBar.vue";
import {useUserStore} from "@/stores/user";
import {useRoute} from "vue-router";
import {computed, onBeforeUnmount, ref, watch} from "vue";
import {useQuoteStore} from "@/stores/Quotes";
import {toggleLike} from "@/services/likes";
import {Field, Form} from "vee-validate";
import {storeComments} from "@/services/comments";
import {useMoviesStore} from "@/stores/Movies";
import {deleteQuote, updateQuote} from "@/services/quotes";
import router from "@/router";
import BaseButton from "@/components/BaseButton.vue";

const route = useRoute();
const userStore = useUserStore();
const quoteStore = useQuoteStore();
const movieStore = useMoviesStore();

const commentField = ref('');
const selectedQuoteId = ref(route.params.id)
const editMode = ref(route.query.edit || false);

watch(
    () => route.params.id,
    (newId) => {
      selectedQuoteId.value = newId;
    }
)

onBeforeUnmount(() => {
  stop()
})

const quote = computed(() => {
  return quoteStore.getQuoteById(selectedQuoteId.value);
})

const quoteEn = ref(quote.value.quote.en);
const quoteKa = ref(quote.value.quote.ka);
const imageURL = ref(null);
const file = ref(null);

const handleUpdateQuote = () => {
  const formData = new FormData();
  if(file.value) formData.append('image', file.value);
  if(quoteEn.value) formData.append('quote_en', quoteEn.value);
  if(quoteKa.value) formData.append('quote_ka', quoteKa.value);
  const quoteDetails = {image: imageURL, quoteEn: quoteEn.value, quoteKa: quoteKa.value};
  quoteStore.updateQuote(quote.value.id, quoteDetails);
  editMode.value = false;
  updateQuote(quote.value.id, formData);
}

const updateImage = (event) => {
  const reader = new FileReader();
  const files = event.target.files;
  const firstFile = files[0];

  file.value = firstFile;
  reader.onload = () => {
    imageURL.value = reader.result;
  }

  reader.readAsDataURL(firstFile);
}

const toggleEditMode = (value) => {
  value ? editMode.value = value : editMode.value = !editMode.value;
}

const handleLike = async (quoteId) => {
  await toggleLike(quoteId);
  const likeData = {
    userId: userStore.getUserID,
    quoteId: quoteId,
  }
  quoteStore.toggleQuoteLike(quoteId, likeData);
}

const storeComment = (event, meta, values) => {
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

const handleDeleteQuote = () => {
  deleteQuote(quote.value.id);
  quoteStore.deleteQuote(quote.value.id);
  router.push({name: 'home'});
}

</script>

<style scoped>
.pink {
  filter: invert(34%) sepia(48%) saturate(4338%) hue-rotate(328deg) brightness(95%) contrast(96%);
}
</style>