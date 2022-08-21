import axios from "axios"; 
const apiUri="/admin/addWarehouseOwners"; 
 
 
export async function AddWarehouseOwnerByAdmin(warehouseOwner){  
    let results 
    await axios.post(apiUri, warehouseOwner) 
            .then((res) => { 
               results = res.data 
               console.log(results)
            }).catch((error) => { 
                results = error.response.data.message 
                console.log(error) 
            }); 
            return results 
        }