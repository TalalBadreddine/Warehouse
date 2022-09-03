import axios from "axios";
 const apiUri="/admin/getAllWarehousesPending";


 export function getAllWarehousesPending(){ 
     return axios.get(apiUri)
 }