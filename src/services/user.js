import {formDataInstance} from "../config/axios/axios";

async function updateUser(userId, data){
    try {
        const response = await formDataInstance.post(`api/user/${userId}`, data);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}



export {updateUser}
