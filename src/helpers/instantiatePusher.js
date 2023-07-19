import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {instance} from "../config/axios/axios";

export default function instantiatePusher() {
    window.Pusher = Pusher;

    window.Echo = new Echo({
        authEndpoint: `${import.meta.env.VITE_API_BASE_URL}/broadcasting/auth`,
        broadcaster: 'pusher',
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        authorizer: (channel) => {
            return {
                authorize: (socketId, callback) => {
                    instance.post('/broadcasting/auth', {
                            socket_id: socketId,
                            channel_name: channel.name
                        }, {withCredentials: true}
                    ).then(response => {
                        callback(null, response.data);
                    }).catch(error => {
                        callback(error);
                    });
                }
            };
        },
    });

    return true;
}
