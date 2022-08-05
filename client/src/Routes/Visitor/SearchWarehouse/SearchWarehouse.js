import { useEffect, useState } from "react"
import WarehouseCard from "../../../Components/WarehouseCard/WarehouseCard"
import axios from 'axios'
import WarehousesMap from "../../../Components/WarehousesMap/WarehousesMap"
import SearchBar from "../../../Components/SearchBar/SearchBar"
import styles from './SearchWarehousesCss.module.css'

const SearchWarehouse = () => {

    const [allWarehouses, setAllWarehouses] = useState()
    const [filtredWarehousesInfo, setFiltredWarehousesInfo] = useState()
    const [flyToMap, setFlyToMap] = useState(null)
    const [searchValue, setSearchValue] = useState(null)

    useEffect(() => {
        axios.get('/visitor/getWarehouses').then((results) => {
            let data = results.data
            setAllWarehouses(data)
            setFiltredWarehousesInfo(data)
        })

    }, [])

    const onSearch = (e) => {
        let value = e.target.value
        setSearchValue(value)

        if (value.split() == '') {
            setFiltredWarehousesInfo(allWarehouses)
            return
        }
        let warehouses = allWarehouses.filter((warehouse) => {
            return warehouse.name.includes(value)
        })

        setFiltredWarehousesInfo(warehouses)

    }

    return (
        <div className="p-2">

            <div className="col-3">
                <SearchBar searchValue={searchValue} action={onSearch}></SearchBar>
            </div>

            <div className="col-12 p-2 d-flex">


                <div className="d-flex d-sm-block flex-wrap col-sm-6  col-12">


                    <div className={`overflow-auto  ${styles.warehousesContainer}`}>

                        {
                            filtredWarehousesInfo && filtredWarehousesInfo.map((warehouse) => {
                                return (
                                    <div key={warehouse.location[0]} onMouseEnter={() => {
                                        setFlyToMap([warehouse.location[0], warehouse.location[1]])
                                    }}>
                                        <WarehouseCard info={warehouse} ></WarehouseCard>

                                    </div>
                                )
                            })

                        }

                    </div>
                </div>

                <div className={`col-6 position-fixed ${styles.mapContainer}`}>
                    <WarehousesMap info={filtredWarehousesInfo} flyToMap={flyToMap} ></WarehousesMap>
                </div>


            </div>

        </div>
    )
}
export default SearchWarehouse