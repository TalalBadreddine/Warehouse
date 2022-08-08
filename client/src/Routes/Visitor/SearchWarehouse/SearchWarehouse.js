import { useEffect, useState } from "react"
import WarehouseCard from "../../../Components/WarehouseCard/WarehouseCard"
import axios from 'axios'
import WarehousesMap from "../../../Components/WarehousesMap/WarehousesMap"
import SearchBar from "../../../Components/SearchBar/SearchBar"
import { Modal } from "react-bootstrap"
import styles from './SearchWarehousesCss.module.css'
import Button from "react-bootstrap/Button"
import Notification from "../../../Components/Notification/Notification"
import WarehousesSearchFilters from "../../../Components/WarehousesSearchFilter/WarehousesSearchFilters"

const SearchWarehouse = () => {

    const [allWarehouses, setAllWarehouses] = useState()
    const [filtredWarehousesInfo, setFiltredWarehousesInfo] = useState()
    const [myLocation, setMylocation] = useState()
    const [showLocationNotification, setShowLocationNotification] = useState(false)
    const [flyToMap, setFlyToMap] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [getMyLocation, setGetMyLocation] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    const [defaultSettings, setDefaultSettings] = useState({
        priceMin: 0,
        priceMax: 2000,
        spaceMin: 0,
        spaceMax: 2000
    })

    const [filterSettings, setFilterSettings] = useState({
        priceMin: 0,
        priceMax: Infinity,
        spaceMin: 0,
        spaceMax: Infinity
    })


    useEffect(() => {
        axios.get('/visitor/getWarehouses').then((results) => {
            let data = results.data
            let maxPrice = -Infinity
            let minPrice = Infinity

            let maxSpace = -Infinity
            let minSpace = Infinity


            for (let i = 0; i < data.length; i++) {
                maxPrice = Math.max(maxPrice, data[i].pricePerDay)
                minPrice = Math.min(minPrice, data[i].pricePerDay)

                maxSpace = Math.max(maxSpace, parseInt(data[i].space))
                minSpace = Math.min(minSpace, parseInt(data[i].space))
            }

            setDefaultSettings({ ...defaultSettings, ['priceMin']: minPrice, ['priceMax']: maxPrice, ['spaceMin']: minSpace, ['spaceMax']: maxSpace })

            setAllWarehouses(data)
            setFiltredWarehousesInfo(data)
        })

    }, [])

    const onSearch = (e) => {
        let value = e.target.value
        setSearchValue(value)

        let warehouses = allWarehouses.filter((warehouse) => {
            return (value ? warehouse.name.includes(value) : true) &&
                parseInt(warehouse.pricePerDay) >= filterSettings.priceMin &&
                parseInt(warehouse.pricePerDay) <= filterSettings.priceMax &&
                parseInt(warehouse.space) <= filterSettings.spaceMax &&
                parseInt(warehouse.space) >= filterSettings.spaceMin
        })

        setFiltredWarehousesInfo(warehouses)
    }


    const priceChange = (min, max) => {
        setFilterSettings({ ...filterSettings, ['priceMin']: min, ['priceMax']: max })
    }

    const spaceChange = (min, max) => {
        setFilterSettings({ ...filterSettings, ['spaceMin']: min, ['spaceMax']: max })
    }

    useEffect(() => {
        if (allWarehouses == null || allWarehouses.length == 0) return
        let value = searchValue
        setSearchValue(value)

        let warehouses = allWarehouses.filter((warehouse) => {

            let found = false

            for (let i = 0; i < warehouse.datesAvailable.length; i++) {
                console.log(warehouse.name)
                if (checkDate(date, warehouse.datesAvailable[i])) {
                    found = true
                    break
                }
            }

            return (value ? warehouse.name.includes(value) : true) &&
                parseInt(warehouse.pricePerDay) >= filterSettings.priceMin &&
                parseInt(warehouse.pricePerDay) <= filterSettings.priceMax &&
                parseInt(warehouse.space) <= filterSettings.spaceMax &&
                parseInt(warehouse.space) >= filterSettings.spaceMin && found
        })

        setFiltredWarehousesInfo(warehouses)

    }, [filterSettings, date])

    const checkDate = (requestedDate, warehouseDates) => {
        let startDate = new Date(requestedDate[0].startDate).getTime()
        let endDate = new Date(requestedDate[0].endDate).getTime()
        //    if(startDate == endDate && new Date(startDate).getTime() == new Date().getTime()  )return true

        let warehouseStartDate = new Date(warehouseDates[0]).getTime()
        let warehouseEndDate = new Date(warehouseDates[1]).getTime()

        return parseInt(warehouseStartDate) <= parseInt(startDate) && parseInt(warehouseEndDate) >= parseInt(endDate)

    }

    const sortByAction = (test) => {
        let sortType = test
        let sortedArr = []

        switch (sortType) {
            case 'location':
                setShowLocationNotification(true)
                sortedArr = filtredWarehousesInfo
                break;

            case 'lowPrice':
                sortedArr = filtredWarehousesInfo.sort((a, b) => {
                    return parseInt(a.pricePerDay) - parseInt(b.pricePerDay)
                })
                break;

            case 'highPrice':
                sortedArr = filtredWarehousesInfo.sort((a, b) => {
                    return parseInt(b.pricePerDay) - parseInt(a.pricePerDay)
                })
                break;

            case 'bigSpace':
                sortedArr = filtredWarehousesInfo.sort((a, b) => {
                    return parseInt(b.space) - parseInt(a.space)
                })
                break;

            case 'smallSpace':
                sortedArr = filtredWarehousesInfo.sort((a, b) => {
                    return parseInt(a.space) - parseInt(b.space)
                })
                break;



        }

        setFiltredWarehousesInfo([...sortedArr])

    }

    const usingMyLocation = () => {
        setFlyToMap([myLocation.coordinates.lat, myLocation.coordinates.lng])
        setShowLocationNotification(false)
        let sortedArr = filtredWarehousesInfo.sort((a, b) => {
            return Math.sqrt(Math.pow(myLocation.coordinates.lat - a.location[0],2) + Math.pow(myLocation.coordinates.lng - a.location[1],2)) - Math.sqrt(Math.pow(myLocation.coordinates.lat - b.location[0],2) + Math.pow(myLocation.coordinates.lng - b.location[1],2)) 
        })

        setFiltredWarehousesInfo([...sortedArr])
    }

    const pinOnMap = () => {
       
    }

    return (
        <div className="p-2">

            <div className="col-12 mb-2">
                <WarehousesSearchFilters data={defaultSettings} setDate={setDate} date={date} priceChange={priceChange} spaceChange={spaceChange} sortByAction={sortByAction}></WarehousesSearchFilters>
            </div>

            <div className="col-6">
                <SearchBar searchValue={searchValue} action={onSearch}></SearchBar>
            </div>

            <div className="col-12 p-2 d-flex">

                <Modal show={showLocationNotification} onHide={() => {setShowLocationNotification(false)}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Choose </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => {usingMyLocation()}}>
                            Use My Location
                        </Button>
                        <Button variant="primary" onClick={pinOnMap()}>
                            Pin on Map
                        </Button>
                    </Modal.Footer>
                </Modal>

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
                    <WarehousesMap info={filtredWarehousesInfo} flyToMap={flyToMap} setMylocation={setMylocation} getMyLocation={getMyLocation}  ></WarehousesMap>
                </div>


            </div>

        </div>
    )
}
export default SearchWarehouse