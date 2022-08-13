import axios from "axios";
const apiUri="/warehouseOwner/login";

export async function loginWarehouseOwner(email,password){
    return await axios.post(apiUri, {email,password})
    .then(async (data) => {
        console.log('test')
        await console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })
}