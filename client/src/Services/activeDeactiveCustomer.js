import axios from "axios";
const apiUri="/admin/activedeactivecustomer";


export async function activeDeactiveCustomer(userId , status){ 
    return await axios.put(apiUri, {
        userId : userId,
        status : status
    })
        }
