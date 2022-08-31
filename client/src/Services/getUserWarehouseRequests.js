import axios from 'axios';
 const apiUri="/user/getWarehouserequests";

 export function getUserWarehouseRequests(userEmail){
     return axios.post(apiUri, {userEmail})
 }