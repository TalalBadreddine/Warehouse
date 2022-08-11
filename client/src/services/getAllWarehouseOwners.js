import axios from 'axios';
const apiUri="/admin/getAllWarehouseOwners";

export function getAllWarehouseOwners(){
    return axios.get(apiUri)
}