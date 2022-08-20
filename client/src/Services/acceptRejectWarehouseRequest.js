import axios from "axios";
const apiUri="/admin/acceptRejectWarehouseRequest";


export function acceptRejectWarehouseRequest(acceptReject){ 
    return axios.post(apiUri,acceptReject)
    // .then(
    //     (res)=>res.json()
    //     )
    //     .then((response) => {
    //             getData(response);
    //         })

        }