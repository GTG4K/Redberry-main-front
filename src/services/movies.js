import {formDataInstance, instance} from "../config/axios/axios";

async function getMovies(){
    try {
        const response = await instance.get('api/movies');
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

async function storeMovie(data){
    try {
        const response = await formDataInstance.post('api/movies', data);
        console.log(response);
    }catch (error){
        console.log(error);
    }
}

export {getMovies, storeMovie}