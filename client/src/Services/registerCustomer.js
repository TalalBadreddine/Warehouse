import axios from "axios";
const apiUri="http://localhost:5001/user/register";


export function registerCustomer(customer){ 
    axios.post(apiUri, customer)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        }