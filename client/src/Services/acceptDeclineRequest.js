import axios from "axios";
const apiUri="http://localhost:5001/warehouseOwner/acceptDeclineRequest";


export function acceptDeclineRequest(acceptingDeclining){ 
    return axios.post(apiUri,acceptingDeclining)
    // .then(
    //     (res)=>res.json()
    //     )
    //     .then((response) => {
    //             console.log(response);
    //             getData(response);
    //         })

        }