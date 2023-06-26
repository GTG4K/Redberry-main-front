import {formDataInstance, instance} from "@/config/axios/axios";

async function getQuotes(){
    try {
        const response = await instance.get('api/quotes');
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

async function storeQuote(data){
    try {
        const response = await formDataInstance.post('api/quotes', data);
        console.log(response);
    }catch (error){
        console.log(error.response.data);
    }
}

export {getQuotes, storeQuote}