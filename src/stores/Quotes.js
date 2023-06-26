import {defineStore} from 'pinia';
import {useUserStore} from "@/stores/user";

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
        addQuoteComment(quoteId, comment) {
            this.quotes.forEach(quote => {
                if (quote.id === quoteId) quote.comments = [...quote.comments, comment]
            })
        },
        toggleQuoteLike(quoteId, like) {
            const userStore = useUserStore();
            this.quotes.forEach(quote => {
                if (quote.id === quoteId) {
                    if (!quote.likedByAuthUser) {
                        quote.likedByAuthUser = true
                        quote.likes = [...quote.likes, like];
                    } else {
                        quote.likes.forEach((like) => {
                            like.userId === userStore.getUserID && quote.likes.splice(quote.likes.indexOf(like), 1);
                            quote.likedByAuthUser = false
                        })
                    }
                }
            })
        },
    },
    getters: {
        getQuotes() {
            return this.quotes;
        },
        getHomePageQuotes() {
        },
        getQuotesExist() {
            return this.quotesExist;
        },
    }
});