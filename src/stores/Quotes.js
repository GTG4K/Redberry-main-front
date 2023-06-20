import {defineStore} from 'pinia';

export const useQuoteStore = defineStore('quotes', {
    state: () => ({
        quotes: null,
        quotesExist: false
    }),
    actions: {
        setQuotes(data) {
            this.quotes = data;
            this.quotesExist = true;
        },
        clearMovies() {
            this.movies = null;
            this.quotesExist = false;
        },
    },
    getters: {
        getQuotes() {
            return {...this.quotes}
        },
        getQuotesExist() {
            return this.quotesExist
        },
    }
});