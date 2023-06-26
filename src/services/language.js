import {instance} from "../config/axios/axios";

async function getLanguage(){
    try {
        const response = await instance.get('api/language');
        return response.data
    } catch (error) {
        console.log(error);
    }
}

async function setLanguage(data){
    try {
        const response = await instance.post('api/language', data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export {setLanguage, getLanguage}