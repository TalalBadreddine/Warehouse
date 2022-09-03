import axios from "axios";
const apiUri="/warehouseOwner/add";
export async function addWarehouse(warehouse){ 
    await axios.post(apiUri, warehouse)
            .then((res) => {
                
            }).catch((error) => {
            });
}
    