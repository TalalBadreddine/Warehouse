import axios from "axios";
const apiUri="http://localhost:5001/admin/deleteCustomer";


export function deleteCustomer(email){ 
    axios.delete(apiUri, {data:{email:email}})
            .then((res) => {
                
            }).catch((error) => {
                console.log(error)
            });
        }

