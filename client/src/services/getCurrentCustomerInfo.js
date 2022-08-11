import axios from 'axios';
const apiUri="/admin/getAllWarehouseOwnersWarehouses";

export function getCurrentCustomerInfo(warehouseOwnerEmail){
    return axios.post(apiUri, {warehouseOwnerEmail})
}