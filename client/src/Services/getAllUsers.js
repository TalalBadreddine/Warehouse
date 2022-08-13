import axios from "axios";
const apiUri="/admin/getAllCustomer";


export function getAllCustomer(){ 
    return axios.get(apiUri)

        }