import axios from "axios";
const apiUri="/warehouseOwner/register";


export function registerWarehouseOwner(warehouseOwner){ 
    axios.post(apiUri, warehouseOwner)
            .then((res) => {
            }).catch((error) => {
                console.log(error)
            });
        }
    