import {defineStore} from 'pinia';

const useStyleStore = defineStore('style', {
    state: () => ({
        deviceWidth: window.innerWidth,
        deviceHeight: window.innerHeight,
    }),
    actions: {
        calculateScreenSize() {
            window.addEventListener("resize", () => {
                this.deviceWidth = window.innerWidth;
                this.deviceHeight = window.innerHeight;
            });
        }
    },
    getters: {
        deviceIsMobile() {
            return this.deviceWidth <= 640;
        }
    }
});

const styleStore = useStyleStore();
styleStore.calculateScreenSize();

export {useStyleStore};