import {instance} from "../config/axios/axios";

async function user() {
    try {
        const response = await instance.get('api/user');
        return response.data
    } catch (error) {
        console.log(error);
    }
}

async function register(data) {
    try {
        const response = await instance.post('api/register', data);
        return response
    } catch (error) {
        return error.response;
    }
}

async function login(data) {
    try {
        await instance.get('/sanctum/csrf-cookie');
        const response = await instance.post('api/login', data);
        console.log(response);
        return await user();
    } catch (error) {
        console.log(error);
    }
}

async function forgotPassword(email) {
    try {
        const response = await instance.post(`api/forgot_password?email=${email}`);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function resetPassword(data) {
    try {
        const response = await instance.post(`api/reset_password`, data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function logout() {
    try {
        const response = await instance.post('api/logout');
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

export {register, login, user, logout, forgotPassword, resetPassword}