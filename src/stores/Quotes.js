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
        addQuoteComment(quoteId, comment){
            this.quotes.forEach(quote=>{
                if(quote.id === quoteId) quote.comments = [...quote.comments, comment]
            })
        }
    },
    getters: {
        getQuotes() {
            return this.quotes
        },
        getHomePageQuotes() {
        },
        getQuotesExist() {
            return this.quotesExist
        },
    }
});