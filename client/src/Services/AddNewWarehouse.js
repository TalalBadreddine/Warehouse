import axios from "axios";
const apiUri="/warehouseOwner/add";
export function addWarehouse(warehouse){ 
    axios.post(apiUri, warehouse)
            .then((res) => {
            }).catch((error) => {
            });
        }
    