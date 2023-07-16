<template>
  <div class="relative">
    <div class="relative w-8 cursor-pointer p-1" @click="toggleActive">
      <img src="../assets/svg/notification.svg" alt="bell" class="w-full">
      <div v-if="newNotifications > 0"
           class="w-4 h-4 rounded-full bg-orange-600 text-xs flex justify-center items-center absolute top-0 right-0 select-none text-white">
        {{ newNotifications }}
      </div>
    </div>
    <div v-if="!styleStore.deviceIsMobile"
         class="transition-all text-white absolute bg-black w-[35rem] -right-64 top-14 overflow-hidden px-5 rounded-xl"
         :class="{'max-h-[40rem] py-5': isActive, 'max-h-0': !isActive}">
      <div class="flex justify-between items-center pb-5">
        <h2 class="select-none">Notifications</h2>
        <h2 @click="handleAllNotificationsSeen"
            class="hover:text-white text-white/80 select-none cursor-pointer underline text-xs">Mark all as read</h2>
      </div>
      <div class="flex flex-col gap-3 max-h-[35rem] overflow-y-auto pr-2">
        <div v-for="notification in notifications" :key="notification.id"
             class="border border-white/20 rounded p-2 flex gap-4 cursor-pointer hover:bg-white/10"
             @click="viewNotification(notification.quote.id, notification.id)">
          <img :src="notification.sender.profile_picture" alt="sender pfp" class="w-[4rem] h-[4rem] rounded-full">
          <div class="flex justify-between items-center w-full">
            <div class="flex flex-col gap-2">
              <h2 class="text-xs">{{ notification.sender.name }}</h2>
              <div v-if="notification.type === 'comment'" class="flex items-center gap-2">
                <img src="../assets/svg/comment.svg" alt="comment" class="w-4 h-4">
                <h2 class="text-xs">Commented on your quote</h2>
              </div>
              <div v-else class="flex items-center gap-2">
                <img src="../assets/svg/heart.svg" alt="heart" class="w-4 h-4">
                <h2 class="text-xs">Liked your quote</h2>
              </div>
            </div>
            <div class="flex flex-col gap-2 items-end">
              <h2 class="text-xs">{{ notification.timeAgo }}</h2>
              <h2 v-if="!notification.is_read" class="text-xs text-green-500/80">New</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else
         class="transition-all text-white fixed bg-black w-screen right-0 top-[60px] overflow-hidden px-5"
         :class="{'h-screen py-5': isActive, 'max-h-0': !isActive}">
      <div class="flex justify-between items-center pb-5">
        <h2 class="select-none">Notifications</h2>
        <h2 @click="handleAllNotificationsSeen"
            class="hover:text-white text-white/80 select-none cursor-pointer underline text-xs">Mark all as read</h2>
      </div>
      <div class="flex flex-col gap-3 max-h-[calc(100%-6rem)] overflow-y-auto pr-2">
        <div v-for="notification in notifications" :key="notification.id"
             class="border border-white/20 rounded p-2 flex gap-4 cursor-pointer hover:bg-white/10"
             @click="viewNotification(notification.quote.id, notification.id)">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <img :src="notification.sender.profile_picture" alt="sender pfp" class="w-[4rem] h-[4rem] rounded-full">
              <div class="flex flex-col gap-3">
                <h2 class="text-xs">{{ notification.sender.name }}</h2>
                <div v-if="notification.type === 'comment'" class="flex items-center gap-2">
                  <img src="../assets/svg/comment.svg" alt="comment" class="w-4 h-4">
                  <h2 class="text-xs">Commented on your quote</h2>
                </div>
                <div v-else class="flex items-center gap-2">
                  <img src="../assets/svg/heart.svg" alt="heart" class="w-4 h-4">
                  <h2 class="text-xs">Liked your quote</h2>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <h2 class="text-xs text-green-500/80 w-[4rem] text-center">{{notification.is_read === 0 ? 'New' : ''}}</h2>
              <h2 class="text-xs">{{ notification.timeAgo }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useNotificationStore} from "@/stores/notifications";
import {computed, ref} from "vue";
import router from "@/router";
import {notificationAllSeen, notificationSeen} from "@/services/notifications";
import {useStyleStore} from "@/stores/style";

const notificationsStore = useNotificationStore()
const newNotifications = computed(() => {
  const notificationData = notificationsStore.getNotifications;
  return notificationData?.new
})
const notifications = computed(() => {
  const notificationData = notificationsStore.getNotifications;
  return notificationData?.notifications
})
const styleStore = useStyleStore();

const viewNotification = (quoteId, notificationId) => {
  isActive.value = false;
  router.push(`/quote/${quoteId}`);
  notificationsStore.setSeen(notificationId);
  notificationSeen(notificationId);
}

const handleAllNotificationsSeen = () => {
  notificationsStore.setAllSeen();
  notificationAllSeen();
}

const isActive = ref(false);
const toggleActive = () => {
  isActive.value = !isActive.value
}
</script>
