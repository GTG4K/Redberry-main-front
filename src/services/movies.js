import instance from "../config/axios/axios";

async function getMovies(){
    try {
        const response = await instance.get('api/movies');
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

export {getMovies}