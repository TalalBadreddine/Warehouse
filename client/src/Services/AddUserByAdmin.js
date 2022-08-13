import axios from "axios";
const apiUri="/admin/addCustomer";


export async function addCustomer(customer){ 
    let results
    await axios.post(apiUri, customer)
            .then((res) => {
               results = res.data
            }).catch((error) => {
                results = error.response.data.message
                console.log(error)
            });
            return results
        }

