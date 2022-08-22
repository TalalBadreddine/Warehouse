import axios from "axios";
const apiUri="/warehouseOwner/acceptDeclineRequest";


export function acceptDeclineRequest(acceptingDeclining){
    return axios.post(apiUri,acceptingDeclining)
}