import axios from 'axios';
 const apiUri="/user/getCurrentUser";

 export function getCurrentUser(){
     return axios.get(apiUri)
 }