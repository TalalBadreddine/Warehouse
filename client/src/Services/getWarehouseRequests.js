import axios from "axios";
const apiUri="http://localhost:5001/warehouseOwner/requests";


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
    