import { useEffect, useState } from "react"
import WarehouseCard from "../WarehouseCard/WarehouseCard"
import axios from 'axios'


const MapWithAllWarehouses = () => {
    const [warehousesInfo, setWarehousesInfo] = useState()

    useEffect(() => {
       axios.get('/visitor/getWarehouses').then((results) => {
        console.log(results)
       })
        
        
    },[])
    return(
        <div>


        <div className="d-flex d-sm-block flex-wrap col-sm-6  col-12">
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
            <WarehouseCard></WarehouseCard>
        </div>
        <div>

        </div>

        </div>
    )
}
export default MapWithAllWarehouses