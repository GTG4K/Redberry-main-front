import {defineStore} from 'pinia';
import {setLocale} from "@vee-validate/i18n";
import {getLanguage} from "@/services/language";

export const useLanguageStore = defineStore('language', {
    state: () => ({
        language: null,
    }),
    actions: {
        setLanguage(language) {
            this.language = language;
        },
        async updateLanguage(){
            const response = await getLanguage()
            this.setLanguage(response);
            setLocale(response);
        }
    },
    getters: {
        getLanguage(){
            return this.language;
        },
    }
});