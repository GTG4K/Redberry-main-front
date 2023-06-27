import {defineStore} from 'pinia';
import {useUserStore} from "@/stores/user";

export const useMoviesStore = defineStore('movies', {
    state: () => ({
        movies: null,
        moviesExist: false
    }),
    actions: {
        setMovies(data) {
            this.movies = data;
            this.moviesExist = true;
        },
        addMovieComment(movieId, comment){
            this.movies.forEach(movie=>{
                if(movie.id === movieId) movie.comments = [...movie.comments, comment]
            })
        },
        clearMovies() {
            this.movies = null;
            this.moviesExist = false;
        },
    },
    getters: {
        getMovies() {
            return {...this.movies}
        },
        getUserMovies(){
            const userStore = useUserStore()
            const userMovies = [];
            if(this.moviesExist){
                this.movies.forEach(movie=>{
                    if(movie.user.id === userStore.getUserID) userMovies.push(movie);
                })
            }
            return userMovies
        },
        getMovie(state){
            return (slug) => state.movies.find((movie) => movie.slug === slug)
        },
        getMoviesExist() {
            return this.moviesExist
        },
    }
});