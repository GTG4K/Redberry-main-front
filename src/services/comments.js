import {instance} from "../config/axios/axios";

async function storeComments(data){
    try {
        const response = await instance.post('api/comments', data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export {storeComments}