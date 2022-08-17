import axios from "axios";
const apiUri="/admin/deleteWarehouse";


export function deleteWarehouseByAdmin(_Id){ 
    axios.delete(apiUri, {data:{_Id:_Id}})
            .then((res) => {
            }).catch((error) => {
                console.log(error)
            });
        }

