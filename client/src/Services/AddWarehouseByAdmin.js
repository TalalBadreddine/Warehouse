import axios from "axios";
const apiUri="/admin/addWarehouse";


export async function AddWarehouseByAdmin(warehouse){ 
    let results
    await axios.post(apiUri, warehouse)
            .then((res) => {
               results = res.data
               console.log(results)
            }).catch((error) => {
                results = error.response.data.message
                console.log(error)
            });
            return results
        }

