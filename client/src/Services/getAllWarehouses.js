import axios from "axios";
 const apiUri="/admin/getAllWarehouses";


 export function getAllWarehousesAdmin(){ 
     return axios.get(apiUri)

         }