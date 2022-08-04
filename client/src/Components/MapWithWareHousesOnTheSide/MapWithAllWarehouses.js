import { useEffect, useState } from "react"
import WarehouseCard from "../WarehouseCard/WarehouseCard"


const MapWithAllWarehouses = () => {
    const [warehousesInfo, setWarehousesInfo] = useState()

    useEffect(() => {

        
        
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