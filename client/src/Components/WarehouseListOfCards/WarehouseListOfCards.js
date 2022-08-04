import { useEffect, useState } from "react"
import WarehouseCard from "../WarehouseCard/WarehouseCard"
import axios from 'axios'

const MapWithAllWarehouses = (props) => {

    const [warehousesInfo, setWarehousesInfo] = useState(props.warehouses)

    return(
        <div>


        <div className="d-flex d-sm-block flex-wrap col-sm-6  col-12">
            
            {
                warehousesInfo && warehousesInfo.map((warehouse) => {
                    return <WarehouseCard info={warehouse} key={warehouse.location}  ></WarehouseCard>
                })

            }

        </div>
        <div>

        </div>

        </div>
    )
}
export default MapWithAllWarehouses