import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"
import WarehouseCard from "../../../Components/WarehouseCard/WarehouseCard"

const MyWarehouses = () => {

    const [myWarehouses, setMyWarehouses] = useState()

    useEffect( () => {
        axios.get('/warehouseOwner/').then((results) => {
            let warehouses = results.data
            setMyWarehouses(warehouses)
            console.log(warehouses)
            
        })
    },[])

    return(
        <div className=" col-8 justify-content-center m-auto">
            <div>
                <div className="d-flex justify-content-center ">
                    <Button variant="success"> Add Warehouse</Button>
                </div>
                <div  >
                   { myWarehouses && myWarehouses.map((warehouse) => {

                    return(
                        <div className="m-2">
                            <WarehouseCard info={warehouse} role={'owner'} ></WarehouseCard>
                        </div>
                    )
                   })}
                </div>

            </div>
        </div>
    )
}

export default MyWarehouses