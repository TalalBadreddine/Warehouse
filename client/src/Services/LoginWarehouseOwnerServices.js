import axios from "axios";
// import {useNavigate} from 'react-router-dom';

const apiUri="/warehouseOwner/login";

export async function LoginWarehouseOwnerService(email,password){
    // const navigate=useNavigate();
    const data=(email,password);
    return await axios.post(apiUri, {email,password})
    .then(async (data) => {
    // navigate('/postNewWarehouse');
        
    })
    .catch((err) => {
        console.log(err.message)
         if(err.message === 'Request failed with status code 400'){
        window.alert("User does not exist");
        console.log("User does not exist");
         }
          else if(err.message === 'Request failed with status code 403');{
           window.alert("Wrong Password");
            console.log("Wrong Password");
      }
      
    })
  
}