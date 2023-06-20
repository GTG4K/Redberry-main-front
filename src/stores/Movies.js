import {defineStore} from 'pinia';

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: null,
        moviesExist: false
    }),
    actions: {
        setMovies(data) {
            this.movies = data;
        },
        setMoviesExist(data) {
            this.moviesExist = data;
        },
        clearMovies() {
            this.movies = null;
        },
    },
    getters: {
        getMovies() {
            return {...this.movies}
        },
        getMoviesExist() {
            return this.moviesExist
        },
    }
});