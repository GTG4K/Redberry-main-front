import instance from "../config/axios/axios";

async function getQuotes(){
    try {
        const response = await instance.get('api/quotes');
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

export {getQuotes}