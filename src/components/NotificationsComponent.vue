<template>
  <div class="relative">
    <div class="relative w-8 cursor-pointer p-1" @click="toggleActive">
      <img src="../assets/svg/notification.svg" alt="bell" class="w-full">
      <div v-if="newNotifications > 0"
          class="w-4 h-4 rounded-full bg-orange-600 text-xs flex justify-center items-center absolute top-0 right-0 select-none text-white">
        {{ newNotifications }}
      </div>
    </div>
    <div
        class="transition-all overflow-hidden absolute top-14 -right-[16rem] text-white rounded-xl bg-header shadow w-[40rem]"
        :class="isActive ? 'max-h-[32.5rem]' : 'max-h-0'">
      <div class="flex justify-between p-6">
        <h2 class="text-xl select-none">Notifications</h2>
        <p class="text-xs select-none cursor-pointer hover:text-blue-400 transition-all" @click="handleAllNotificationsSeen">Mark all as read</p>
      </div>
      <div class="px-6 pb-6 ">
        <div class="flex flex-col gap-4 max-h-[28rem] overflow-y-auto ">
          <div v-if="notifications?.length === 0" class="flex items-center justify-center pb-5">Nothing to see here...
          </div>
          <div v-for="notification in notifications" :key="notification.id"
               @click="viewNotification(notification.quote.id, notification.id)"
               class="py-2 px-4 transition-all border border-white/50 rounded flex gap-5 items-center cursor-pointer hover:bg-white/10">
            <img :src="notification.sender.profile_picture" class="w-[3.4rem] h-[3.4rem] rounded-full">
            <div class="flex flex-col w-full gap-2">
              <div class="flex space-between justify-between items-center w-full">
                <p class="text-xs">{{ notification.sender.name }}</p>
                <p class="text-xs">{{ notification.timeAgo }}</p>
              </div>
              <div class="flex space-between justify-between items-center w-full">
                <div class="flex gap-2 items-center">
                  <img v-if="notification.notification_type === 'like'" src="../assets/svg/heart.svg" alt="reply"
                       class="w-5 h-5">
                  <img v-else src="../assets/svg/comment.svg" alt="reply" class="w-5 h-5">
                  <p class="text-xs">{{ notification.message }}</p>
                </div>
                <p v-if="!notification.is_read" class="text-xs text-green-400">New</p>
              </div>
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

const notificationsStore = useNotificationStore()
const newNotifications = computed(() => {
  const notificationData = notificationsStore.getNotifications;
  return notificationData?.new
})
const notifications = computed(() => {
  const notificationData = notificationsStore.getNotifications;
  return notificationData?.notifications
})

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
