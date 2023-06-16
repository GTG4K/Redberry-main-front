import {configure} from "vee-validate";
import {localize, setLocale} from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import ka from "@vee-validate/i18n/dist/locale/ka.json";

configure({
    generateMessage: localize({
        en: {
            ...en,
        },
        ka: {
            ...ka,
        },
    }),
});

setLocale('en');