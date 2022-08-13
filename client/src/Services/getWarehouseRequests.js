import axios from "axios";
const apiUri="/warehouseOwner/requests";


export function getRequest(warehouseOwner){ 
    return axios.post(apiUri,warehouseOwner)
    // .then(
    //     (res)=>res.json()
    //     )
    //     .then((response) => {
    //             console.log(response);
    //             getData(response);
    //         })

        }
    