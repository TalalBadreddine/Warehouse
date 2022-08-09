import axios from "axios";
const apiUri="http://localhost:5001/user/login";

export async function loginUser(email,password){
    return await axios.post(apiUri, {email,password})
    .then(async (data) => {
        await console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
}