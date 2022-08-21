import axios from "axios";
 const apiUri="/admin/getAllWarehouses";


 export function getAllWarehousesPending(){ 
     return axios.get(apiUri)
 }