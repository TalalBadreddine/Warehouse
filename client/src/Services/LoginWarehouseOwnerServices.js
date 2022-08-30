import axios from "axios";
// import {useNavigate} from 'react-router-dom';

const apiUri="/warehouseOwner/login";

export async function LoginWarehouseOwnerService(email,password){
    return await axios.post(apiUri, {email,password})
  
}