import { useEffect, useState } from "react"
import WarehouseCard from "../WarehouseCard/WarehouseCard"
import WarehousesMap from "../WarehousesMap/WarehousesMap"
import axios from 'axios'

const MapWithAllWarehouses = () => {

    const [warehousesInfo, setWarehousesInfo] = useState()
    const [flyToMap, setFlyToMap] = useState(null)

    useEffect(() => {
        axios.get('/visitor/getWarehouses').then((results) => {
            let data = results.data
            console.log(data)
            // setWarehousesInfo(data)
            // console.log(data[0])
        })


    }, [])
    return (
        <div className="d-flex p-2">


            <div className="d-flex d-sm-block flex-wrap col-sm-6  col-12">

                {
                    warehousesInfo && warehousesInfo.map((warehouse) => {
                        return (
                            <div onMouseEnter={() => {
                                setFlyToMap([warehouse.location[0], warehouse.location[1]] )
                            }}>
                                <WarehouseCard info={warehouse} key={warehouse.location} ></WarehouseCard>

                            </div>
                        )
                    })

                }

            </div>

            <div className="col-6">
                <WarehousesMap info={warehousesInfo}  flyToMap={flyToMap} ></WarehousesMap>
            </div>

        </div>
    )
}
export default MapWithAllWarehouses