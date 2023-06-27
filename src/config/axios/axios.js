import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {
        Accept: 'application/json',
    },
});

const formDataInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: {"Content-Type": "multipart/form-data"},
});

export {instance, formDataInstance}