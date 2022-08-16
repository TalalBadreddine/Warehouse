import axios from "axios";
const apiUri="/warehouseOwner/register";


export function registerWarehouseOwner(warehouseOwner){ 
    return axios.post(apiUri, warehouseOwner)
}
    