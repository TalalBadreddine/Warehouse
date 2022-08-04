import axios from "axios";
const apiUri="http://localhost:5001/warehouseOwner/register";


export function registerWarehouseOwner(warehouseOwner){ 
    axios.post(apiUri, warehouseOwner)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
    