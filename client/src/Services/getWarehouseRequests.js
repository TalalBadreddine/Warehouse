import axios from "axios";
const apiUri="/warehouseOwner/requests";


export function getRequest(){ 
    return axios.post(apiUri)
}
    