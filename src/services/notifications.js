import {instance} from "../config/axios/axios";

async function getNotifications() {
    try {
        const response = await instance.get('api/notifications');
        return response.data
    } catch (error) {
        console.log(error);
    }
}

async function notificationSeen(notificationId) {
    try {
        const response = await instance.post(`api/notifications/${notificationId}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function notificationAllSeen() {
    try {
        const response = await instance.post(`api/notifications/`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export {getNotifications, notificationSeen, notificationAllSeen}