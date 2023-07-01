import {defineStore} from 'pinia';
import {getNotifications} from "@/services/notifications";

export const useNotificationStore = defineStore('notifications', {
    state: () => ({
        notifications: null,
    }),
    actions: {
        setNotifications(notifications) {
            this.notifications = notifications;
        },
        setReadableTime() {
            const notifsToReturn = this.notifications;
            if (this.notifications?.notifications) {
                notifsToReturn.notifications.forEach((notification) => {
                    const createdAt = notification.created_at;

                    const createdDate = new Date(createdAt);
                    const currentDate = new Date();

                    const msDiff = currentDate - createdDate;
                    const secondsDiff = Math.floor(msDiff / 1000);

                    // Calculate the appropriate time units (e.g., minutes, hours, days, etc.)
                    let timeAgo;
                    if (secondsDiff < 60) {
                        timeAgo = secondsDiff + ' seconds ago';
                    } else if (secondsDiff < 3600) {
                        const minutes = Math.floor(secondsDiff / 60);
                        timeAgo = minutes + ' minutes ago';
                    } else if (secondsDiff < 86400) {
                        const hours = Math.floor(secondsDiff / 3600);
                        timeAgo = hours + ' hours ago';
                    } else {
                        const days = Math.floor(secondsDiff / 86400);
                        timeAgo = days + ' days ago';
                    }

                    notification.timeAgo = timeAgo;
                })
            }
            return notifsToReturn
        },
        async updateNotifications() {
            const response = await getNotifications()
            this.setNotifications(response);
        },
        setSeen(notificationId) {
            const notification = this.notifications.notifications.find(notification => notification.id === notificationId)
            notification.is_read = 1;
            this.notifications.new--;
            setTimeout(() => {
                this.updateNotifications();
            }, 1000);
        },
        setAllSeen() {
            this.notifications.notifications.forEach(notification => notification.is_read = 1);
            this.notifications.new = 0;
            setTimeout(() => {
                this.updateNotifications();
            }, 1000);
        },
        clearNotifications() {
            this.notifications = null;
        },
    },
    getters: {
        getNotifications() {
            if (!this.notifications) this.updateNotifications()
            return this.setReadableTime();
        },
    }
});