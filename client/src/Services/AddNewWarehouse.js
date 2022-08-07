import axios from "axios";
const apiUri="";

http://localhost:5001/warehouseOwner/add
export function addWarehouse(warehouse){ 
    axios.post(apiUri, warehouse)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
    