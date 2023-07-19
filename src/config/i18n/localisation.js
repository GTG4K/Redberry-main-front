import {createI18n} from 'vue-i18n'

import en from "./locales/en.json";
import ka from "./locales/ka.json";

export default createI18n({
    locale: 'ka',
    legacy: false,
    runtimeOnly: false,
    fallbackLocale: 'en',
    messages: {
        en: {
            message: en
        },
        ka: {
            message: ka
        }
    }
});