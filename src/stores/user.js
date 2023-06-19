import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // Initial user state is null
    }),
    actions: {
        setUser(user) {
            this.user = user; // Set the user state
        },
        clearUser() {
            this.user = null; // Clear the user state
        },
    },
});