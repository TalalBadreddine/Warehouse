import axios from "axios";
const apiUri="/user/register";


export const registerCustomer =  async (customer) => { 
    return await axios.post(apiUri, customer)
    }