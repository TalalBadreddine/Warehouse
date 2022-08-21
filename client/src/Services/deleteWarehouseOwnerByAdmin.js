import axios from "axios";
 const apiUri = "/admin/deleteWarehouseOwners";


 export function deleteWarehouseOwnerByAdmin(email) {
     axios.delete(apiUri, { data: { email: email } })
         .then((res) => {
         }).catch((error) => {
             console.log(error)
         });
 }