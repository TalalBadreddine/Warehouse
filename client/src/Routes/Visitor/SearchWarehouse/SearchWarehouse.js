import { useEffect, useState } from "react"
import WarehouseCard from "../../../Components/WarehouseCard/WarehouseCard"
import axios from 'axios'
import WarehousesMap from "../../../Components/WarehousesMap/WarehousesMap"
import SearchBar from "../../../Components/SearchBar/SearchBar"
import { Modal } from "react-bootstrap"
import styles from './SearchWarehousesCss.module.css'
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap"
import WarehousesSearchFilters from "../../../Components/WarehousesSearchFilters/WarehousesSearchFilters"
import { useNavigate } from "react-router-dom"
import ui from './../../../themes.js'

// const ui = {
//     bigTitle: '#ffffff',
//     bigTitleSecondaryColor: '#66b2ff',
//     backgroundColor: '#011e3c',
//     searchesInput: '#132f4c',
//     Buttons:'#027fff',
//     xsTexts: '#43586e',
//     lightBg: '#142f4c',
//     borders: '#4177b2'
// }

const SearchWarehouse = ({role}) => {

    const navigate = useNavigate()
    const [allWarehouses, setAllWarehouses] = useState()
    const [filtredWarehousesInfo, setFiltredWarehousesInfo] = useState()
    const [myLocation, setMylocation] = useState()
    const [showLocationNotification, setShowLocationNotification] = useState(false)
    const [flyToMap, setFlyToMap] = useState(null)
    const [searchValue, setSearchValue] = useState(null)
    const [getMyLocation, setGetMyLocation] = useState(false)
    const [canPin, setCanPin] = useState(false)
    const [pinLocation, setPinLocation] = useState([])
    const [searchBy, setSearchBy] = useState('name')
    const [isFlyToOn, setIsFlyToOn] = useState(false)
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

    useEffect( () => {
        if(role == 'visitor'){
            return
        }else{

            const startedFunction = async () => {
    
                 await axios.get('/user/checkUserValidation').then(async (data) => {

                    await axios.post('/userActivity',{
                        action: `navigated to search for a warehouse`,
                        role: 'customer'
                    }).then((results) => {
                    })
                    
                   
                }).catch((err) => {
                    if(err.response.data == 'forbidden'){navigate('/')}
                })

            }

            startedFunction()

        }
    },[])

    useEffect(() => {
        axios.get('/visitor/getWarehouses').then((results) => {
            let data = results.data
            let arrOfWarehouses = []
                                    
            for(let i = 0 ; i < data.length ; i++){
          
                for(let j = 0 ; j < data[i].warehouses.length; j++){
                    let warehouse = data[i].warehouses[j][0]
                    warehouse['Owner'] = data[i].warehouseOwner

                    arrOfWarehouses.push(warehouse)
                }
            }
        
            let maxPrice = -Infinity
            let minPrice = Infinity

            let maxSpace = -Infinity
            let minSpace = Infinity

            for (let i = 0; i < arrOfWarehouses.length; i++) {
                maxPrice = Math.max(maxPrice, arrOfWarehouses[i].pricePerDay)
                minPrice = Math.min(minPrice, arrOfWarehouses[i].pricePerDay)

                maxSpace = Math.max(maxSpace, parseInt(arrOfWarehouses[i].space))
                minSpace = Math.min(minSpace, parseInt(arrOfWarehouses[i].space))
            }

            setDefaultSettings({ ...defaultSettings, ['priceMin']: minPrice, ['priceMax']: maxPrice, ['spaceMin']: minSpace, ['spaceMax']: maxSpace })

            setAllWarehouses(arrOfWarehouses)
            setFiltredWarehousesInfo(arrOfWarehouses)
        })

    }, [])

    const onSearch = (e) => {
        let value = e.target.value
        setSearchValue(value)
        let warehouses = allWarehouses.filter((warehouse) => {
            return (value ? (searchBy == 'name' ? warehouse[searchBy].toLowerCase().includes(value.toLowerCase()) : warehouse[searchBy][0].includes(value)) : true) &&
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
   


        let warehouses = allWarehouses.filter((warehouse) => {
            let found = false
            if(new Date(date[0].startDate).getTime() != new Date(date[0].endDate).getTime() ){

                for (let i = 0; i < warehouse.datesAvailable.length; i++) {
                    if (checkDate(date, warehouse.datesAvailable[i])) {
                        found = true
                        break
                    }
                }
                                
            }else{
                found = true
            }
            

            return (value ? (searchBy == 'name' ? warehouse[searchBy].toLowerCase().includes(value.toLowerCase()) : warehouse[searchBy][0].includes(value)) : true) &&
                parseInt(warehouse.pricePerDay) >= filterSettings.priceMin &&
                parseInt(warehouse.pricePerDay) <= filterSettings.priceMax &&
                parseInt(warehouse.space) <= filterSettings.spaceMax &&
                parseInt(warehouse.space) >= filterSettings.spaceMin && found
        })
        setFiltredWarehousesInfo([...warehouses])

    }, [filterSettings, date, searchBy])

    const checkDate = (requestedDate, warehouseDates) => {
        let startDate = new Date(requestedDate[0].startDate).getTime()
        let endDate = new Date(requestedDate[0].endDate).getTime()
        //    if(startDate == endDate && new Date(startDate).getTime() == new Date().getTime()  )return true

        let warehouseStartDate = new Date(warehouseDates[0]).getTime()
        let warehouseEndDate = new Date(warehouseDates[1]).getTime()

        return parseInt(warehouseStartDate) <= parseInt(startDate) && parseInt(warehouseEndDate) >= parseInt(endDate)

    }

    const sortByAction = async (test) => {
        let sortType = test
        let sortedArr = []
        setCanPin(false)

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

        await axios.post('/userActivity',{
            action: `searched for warehouses and sorted them by ${sortType}`,
            role: 'customer'
        }).then((results) => {
            console.log(results.data)
        })

        setFiltredWarehousesInfo([...sortedArr])

    }

    const usingMyLocation = async () => {
        setFlyToMap([myLocation.coordinates.lat, myLocation.coordinates.lng])
        setShowLocationNotification(false)
        let sortedArr = filtredWarehousesInfo.sort((a, b) => {
            return Math.sqrt(Math.pow(myLocation.coordinates.lat - a.location[0], 2) + Math.pow(myLocation.coordinates.lng - a.location[1], 2)) - Math.sqrt(Math.pow(myLocation.coordinates.lat - b.location[0], 2) + Math.pow(myLocation.coordinates.lng - b.location[1], 2))
        })

        await axios.post('/userActivity',{
            action: `searched for warehouses and sorted them by neareset to his Location`,
            role: 'customer'
        }).then((results) => {
        })

        setFiltredWarehousesInfo([...sortedArr])
    }

    const pinOnMap = () => {
        setCanPin(true)
        setShowLocationNotification(false)
    }

    useEffect(() => {
        if (pinLocation.length == 0) return

        let sortedArr = filtredWarehousesInfo.sort((a, b) => {
            return Math.sqrt(Math.pow(pinLocation[0] - a.location[0], 2) + Math.pow(pinLocation[1] - a.location[1], 2)) - Math.sqrt(Math.pow(pinLocation[0] - b.location[0], 2) + Math.pow(pinLocation[1] - b.location[1], 2))
        })

        setFiltredWarehousesInfo([...sortedArr])

    }, [pinLocation])

    return (
        <div className="p-2 mt-2">

            <div className="col-12 mb-2">
                <WarehousesSearchFilters data={defaultSettings} setDate={setDate} date={date} priceChange={priceChange} spaceChange={spaceChange} sortByAction={sortByAction}></WarehousesSearchFilters>
            </div>

            <div className="col-sm-6 col-12 d-flex mt-sm-0 mt-3">
                <div className="col-6">
                    <SearchBar style={{backgroundColor: `${ui.searchesInput}`}} searchValue={searchValue} action={onSearch}></SearchBar>
                </div>
                <div className=" ms-3 col-6">
                    <Form className="d-flex">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            styles={{color: `red !important`}}
                            onChange={(e) => {
                                setIsFlyToOn(e.target.checked)

                            }}
                        />
                        <p style={{color: `${ui.normalText}`}}>Fly to Space</p>
                        <Form.Check
                            className="ms-3"
                            type="switch"
                            id="custom-switch"
                            onChange={(e) => {
                                e.target.checked ? setSearchBy('address') : setSearchBy('name')
                            }}
                        />
                        <p style={{color: `${ui.normalText}`}}>Search By Location</p>
                    </Form>
                </div>
            </div>

            <div className="col-12 p-2 d-flex">

                <Modal show={showLocationNotification} onHide={() => { setShowLocationNotification(false) }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Location</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please Choose the base from where we should calculate the distance </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { usingMyLocation() }}>
                            Use My Location
                        </Button>
                        <Button variant="primary" onClick={() => { pinOnMap() }}>
                            Pin on Map
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="d-flex d-sm-block flex-wrap col-sm-6  col-12">


                    <div className={`overflow-auto col-12 d-sm-block d-flex justify-content-center  ${styles.warehousesContainer}`} style={{overflowY:'auto', height:'600px'}}>

                        {
                            filtredWarehousesInfo && filtredWarehousesInfo.map((warehouse) => {
                                return (
                                    <div className="col-sm-12 col-5 ms-4 ms-sm-0 " key={warehouse.location[0]} onMouseEnter={() => {
                                        isFlyToOn &&
                                            setFlyToMap([warehouse.location[0], warehouse.location[1]])
                                    }}>
                                        <WarehouseCard info={warehouse} role={role} ></WarehouseCard>

                                    </div>
                                )
                            })

                        }

                    </div>
                </div>
{/* position-fixed ${styles.mapContainer} */}
                <div className={`col-6 `} style={{position:'fixed', top:'23%',right:'0'}}>
                    <WarehousesMap info={filtredWarehousesInfo} flyToMap={flyToMap} setMylocation={setMylocation} getMyLocation={getMyLocation} canPin={canPin} setPinLocation={setPinLocation}  ></WarehousesMap>
                </div>


            </div>

        </div>
    )
}
export default SearchWarehouse