import axios from "axios";
const apiUri="/user/login";

export async function loginUser(email,password){
    return await axios.post(apiUri, {email,password})
}