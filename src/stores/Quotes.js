import {defineStore} from 'pinia';
import {useUserStore} from "@/stores/user";
import {useMoviesStore} from "@/stores/Movies";
import {getQuotes} from "@/services/quotes";

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
        clearQuotes() {
            this.quotes = null;
            this.quotesExist = false;
        },
        async updateQuotes() {
            const response = await getQuotes()
            this.setQuotes(response);
        },
        updateQuote(quoteId, quoteDetails) {
            const quote = this.quotes.find(quote => quote.id === quoteId);
            if (quoteDetails.quoteEn) quote.quote.en = quoteDetails.quoteEn;
            if (quoteDetails.quoteKa) quote.quote.ka = quoteDetails.quoteKa;
            if (quoteDetails.image) quote.image = quoteDetails.image;
            setTimeout(() => {
                this.updateQuotes();
            }, 2000);
        },
        addQuote(movieId, quoteEn, quoteKa, image) {
            const movieStore = useMoviesStore();
            const userStore = useUserStore();
            const quote = {
                comments: [],
                likes: [],
                movie: movieStore.getMovieById(movieId),
                user: userStore.getUserResource,
                quote: {
                    en: quoteEn,
                    ka: quoteKa,
                },
                likedByAuthUser: false,
                image: image,
            }
            this.quotes = [quote, ...this.quotes];
            setTimeout(() => {
                this.updateQuotes();
            }, 2000)
        },
        addQuoteComment(quoteId, comment) {
            this.quotes.forEach(quote => {
                if (quote.id === quoteId) quote.comments = [...quote.comments, comment]
            })
        },
        deleteLike(likeResource) {
            const {id, quoteId, userId} = likeResource;
            const userStore = useUserStore();
            const quote = this.quotes.find((quote) => quote.id === quoteId);
            if (userStore.getUserID === userId) quote.likedByAuthUser = false;
            quote.likes.forEach((like) => {
                like.id === id && quote.likes.splice(quote.likes.indexOf(like), 1);
            })
        },
        addLike(likeResource) {
            const {quoteId, userId} = likeResource;
            const userStore = useUserStore();
            const quote = this.quotes.find((quote) => quote.id === quoteId);
            if (userStore.getUserID === userId) quote.likedByAuthUser = true;
            quote.likes.push(likeResource);
        },
        deleteQuote(quoteId) {
            this.quotes = this.quotes.filter(quote => quote.id !== quoteId);
            setTimeout(() => {
                this.updateQuotes();
            }, 1000)
        },
    },
    getters: {
        getQuotes() {
            if (!this.quotes) this.updateQuotes();
            return this.quotes
        },
        getQuoteById(state) {
            return (quoteId) => state.quotes.find((quote) => quote.id == quoteId)
        },
        getQuotesByMovieId(state) {
            return (movieId) => state.quotes.filter((quote) => quote.movie.id === movieId)
        },
        getQuotesExist() {
            return this.quotesExist;
        },
    }
});