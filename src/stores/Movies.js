import {defineStore} from 'pinia';
import {useUserStore} from "@/stores/user";
import {getMovies} from "@/services/movies";

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
        addMovieComment(movieId, comment) {
            this.movies.forEach(movie => {
                if (movie.id === movieId) movie.comments = [...movie.comments, comment]
            })
        },
        addMovie(DescriptionEn, DescriptionKa, DirectorEn, DirectorKa, titleEn, titleKa, genre, release_date, image) {
            const userStore = useUserStore();
            const movie = {
                user: userStore.getUserResource,
                quotes: [],
                description: {
                    en: DescriptionEn,
                    ka: DescriptionKa,
                },
                director: {
                    en: DirectorEn,
                    ka: DirectorKa,
                },
                title: {
                    en: titleEn,
                    ka: titleKa,
                },
                genre: genre,
                release_date: release_date,
                poster: image,
            }
            this.movies = [movie, ...this.movies];
            setTimeout(() => {
                this.updateMovies();
            }, 1000)

        },
        async updateMovies() {
            const response = await getMovies()
            this.setMovies(response);
            console.log("updated");
        },
        updateMovie(movieId, movieDetails) {
            const movie = this.movies.find(movie => movie.id === movieId);
            if (movieDetails.titleEn) movie.title.en = movieDetails.titleEn;
            if (movieDetails.titleKa) movie.title.ka = movieDetails.titleKa;
            if (movieDetails.descriptionEn) movie.description.en = movieDetails.descriptionEn;
            if (movieDetails.descriptionKa) movie.description.ka = movieDetails.descriptionKa;
            if (movieDetails.directorEn) movie.director.en = movieDetails.directorEn;
            if (movieDetails.directorKa) movie.director.ka = movieDetails.directorKa;
            if (movieDetails.genre) movie.genre = movieDetails.genre;
            if (movieDetails.poster) movie.poster = movieDetails.poster;
            if (movieDetails.releaseDate) movie.release_date = movieDetails.releaseDate;
            setTimeout(() => {
                this.updateMovies();
            }, 2000);
        },
        deleteMovie(movieId) {
            this.movies = this.movies.filter(movie => movie.id !== movieId);
            setTimeout(() => {
                this.updateMovies();
            }, 1000)
        },
        clearMovies() {
            this.movies = null;
            this.moviesExist = false;
        },
    },
    getters: {
        getMovies() {
            if (!this.moviesExist) this.updateMovies()
            return this.movies
        },
        getUserMovies() {
            if (!this.moviesExist) this.updateMovies()
            const userStore = useUserStore()
            const userMovies = [];
            if (this.moviesExist) {
                this.movies.forEach(movie => {
                    if (movie.user.id === userStore.getUserID) userMovies.push(movie);
                })
            }
            return userMovies
        },
        getMovieBySlug(state) {
            if (!this.moviesExist) this.updateMovies()
            return (slug) => state.movies.find((movie) => movie.slug === slug)
        },
        getMovieById(state) {
            return (id) => state.movies.find((movie) => movie.id === id)
        },
        getMoviesExist() {
            return this.moviesExist
        },
    }
});