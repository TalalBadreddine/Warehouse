import axios from "axios";
const apiUri="/user/register";


export function registerCustomer(customer){ 
    axios.post(apiUri, customer)
            .then((res) => {
            }).catch((error) => {
                console.log(error)
            });
        }