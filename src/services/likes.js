import {instance} from "../config/axios/axios";

async function toggleLike(quoteId){
    try {
        const response = await instance.post(`api/likes/${quoteId}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export {toggleLike}
