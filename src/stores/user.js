import {defineStore} from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null, // Initial user state is null
    }),
    actions: {
        setUser(user) {
            this.user = user; // Set the user state
        },
        setUserName(name) {
            this.user.name = name;
        },
        setUserPFP(imageURL) {
            this.user.profile_picture = imageURL;
        },
        clearUser() {
            this.user = null; // Clear the user state
        },
    },
    getters: {
        getUserProfile(){
            return this.user?.profile_picture;
        },
        getUserName(){
            return this.user?.name;
        },
        getUserEmail(){
            return this.user?.email;
        },
        getUserID(){
            return this.user?.id;
        },
        getUserResource(){
          return {
              id: this.user.id,
              name: this.user.name,
              email: this.user.email,
              profile_picture: this.user.profile_picture,
          }
        }
    }
});