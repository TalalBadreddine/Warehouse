import axios from 'axios';
const apiUri="/user/getAllUserRequests";

export function getRequests(warehouseOwner){
    return axios.post(apiUri, warehouseOwner)
}