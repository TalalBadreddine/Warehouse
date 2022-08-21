import axios from "axios";
const apiUri="/user/login";

export async function loginUser(email,password){
   
    const data=(email,password);
    return await axios.post(apiUri, {email,password})
    .then(async (data) => {

        
    })
    .catch((err) => {
        console.log(err.message)
   
      
    })
}