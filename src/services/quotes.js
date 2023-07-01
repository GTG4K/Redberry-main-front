import {formDataInstance, instance} from "@/config/axios/axios";

async function getQuotes() {
    try {
        const response = await instance.get('api/quotes');
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

async function getQuote(quoteId) {
    try {
        const response = await instance.get(`api/quotes/${quoteId}`);
        return response.data.data
    } catch (error) {
        console.log(error);
    }
}

async function storeQuote(data) {
    try {
        const response = await formDataInstance.post('api/quotes', data);
        console.log(response);
    } catch (error) {
        console.log(error.response.data);
    }
}

async function deleteQuote(quoteId) {
    try {
        const response = await instance.post(`api/quotes/${quoteId}`);
        console.log(response);
    } catch (error) {
        console.log(error.response.data);
    }
}

async function updateQuote(quoteId, data) {
    try {
        const response = await formDataInstance.post(`api/quotes/update/${quoteId}`, data);
        console.log(response);
    } catch (error) {
        console.log(error.response.data);
    }
}

export {getQuote, getQuotes, storeQuote, deleteQuote, updateQuote}