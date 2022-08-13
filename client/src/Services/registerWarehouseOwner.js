import axios from "axios";
const apiUri="/warehouseOwner/register";


export function registerWarehouseOwner(warehouseOwner){ 
    axios.post(apiUri, warehouseOwner)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }
    