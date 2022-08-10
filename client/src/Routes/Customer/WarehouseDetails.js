import { useLocation, useNavigate } from "react-router-dom"
import { IoIosReturnLeft } from 'react-icons/io'
import { useEffect, useState } from "react";
import { addDays } from 'date-fns';


import { BiCctv } from 'react-icons/bi'
import sprinkler from '../../Components/WarehouseCard/sprinkler.png'
import { TbForklift } from 'react-icons/tb'
import { GrUserWorker } from 'react-icons/gr'
import ac from '../../Components/WarehouseCard/air-conditioner.png'
import WarehousesMap from '../../Components/WarehousesMap/WarehousesMap.js'
import osm from '../../Components/WarehousesMap/TileLayer'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { DateRangePicker } from 'react-date-range';


const WarehouseDetails = () => {
    // const [state, setState] = useState({
    //     selection: {
    //       startDate: new Date(),
    //       endDate: null,
    //       key: 'selection'
    //     },
    //     compare: {
    //       startDate: new Date(),
    //       endDate: addDays(new Date(), 10),
    //       key: 'selection'
    //     }
    //   })

    const [dataSettings, setDataSettings] = useState({
        endDate: null,
        disabledDates: []
    })

    const [state, setState] = useState(
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }
      );

    const [finalDate , setFinalDate] = useState(null)

    const markerIcon = new L.icon({
        iconUrl: require('../../Components/WarehousesMap/warehouse.png'),
        iconSize: [30, 40]
    })

    const data = useLocation()
    const navigate = useNavigate();
    const [warehouseData, setWarehouseData] = useState(data.state)
    console.log(data.state)

    useEffect(() => {
        if(warehouseData == null)return
        let maxDate = -Infinity
        let disabledDates = []

        for(let i = 0 ; i < warehouseData.datesAvailable.length ; i++){
            maxDate = Math.max(maxDate, new Date(warehouseData.datesAvailable[i][1]).getTime())
        }

        setDataSettings({...dataSettings, ['endDate']: maxDate})
        console.log(`max Date => ${maxDate}`)

    },[warehouseData])

    return (
        <div className="mt-3 d-flex">


            <div className="col-2 ps-5 ">
                <IoIosReturnLeft onClick={() => navigate(-1)} size={50}></IoIosReturnLeft>

            </div>

            <div className="col-9  p-4">

                <div className="col-12">
                    <h1>{warehouseData.name}</h1>
                    <h3 className="d-flex">{warehouseData.address[0][0]} ,<h3 className="ms-2">{warehouseData.address[0][1]}</h3> </h3>
                </div>


                <div className="d-flex">

                    <div style={{ height: '404px' }} className="bg-primary">
                        <img src='#' alt='warehouseImg' width={'300px'} height={'404px'} className="rounded" ></img>
                    </div>

                    <div>


                        <div className="ms-3 ">

                            <div>
                                <img src='#' alt='warehouseImg' width={'300px'} height={'190px'} className="rounded m-1" ></img>
                                <img src='#' alt='warehouseImg' width={'300px'} height={'190px'} className="rounded ms-2" ></img>
                            </div>

                            <div>
                                <img src='#' alt='warehouseImg' width={'610px'} height={'200px'} className="rounded m-1 " ></img>
                            </div>

                        </div>


                    </div>

                </div>

                <div className="mt-4 d-flex col-12">
                    <div className="col-6">


                        <h1>Details:</h1>

                        <div className="mt-5">
                            <h4>Property size: <span className="ms-1" style={{ fontWeight: '350' }}>{warehouseData.space} m<sup>2</sup> / {Math.floor(parseInt(warehouseData.space) * 10.7639)} ft<sup>2</sup></span> </h4>
                        </div>

                        <div className="mt-5">
                            <h4>Cost per day: <span className="ms-1" style={{ fontWeight: '350' }}>${warehouseData.pricePerDay}</span></h4>
                        </div>

                        <div className="mt-5">
                            <h4>Type: <span className="ms-1" style={{ fontWeight: '350' }}>{warehouseData.type}</span></h4>
                        </div>

                    </div>

                    <div className="col-5 bg-success">
                        <h1> I am the payment</h1>
                    </div>

                </div>

                <div className="mt-5 col-12">
                    <h3>Features:</h3>

                    <div className="mt-4 justify-content-between d-flex flex-wrap w-75" >
                        {warehouseData.isSecurityCameras &&

                            <div className="d-flex m-4">
                                <BiCctv size={38}></BiCctv>
                                <p className="ms-3 fs-4">CCTV</p>
                            </div>
                        }
                        {warehouseData.isFireSafe &&

                            <div className="d-flex m-4">
                                <img src={sprinkler} width={'35px'} height={'40px'}></img>
                                <p className="ms-3 fs-4">Sprinklers</p>
                            </div>
                        }
                        {warehouseData.isAirConditioning &&

                            <div className="d-flex m-4">
                                <img src={ac} width={'35px'} height={'40px'}></img>
                                <p className="ms-3 fs-4">Air Conditioner</p>
                            </div>
                        }
                        {warehouseData.isWorkers &&

                            <div className="d-flex m-4">
                                <GrUserWorker size={38}></GrUserWorker>
                                <p className="ms-3 fs-4">Workers</p>
                            </div>
                        }
                        {warehouseData.isForklift &&

                            <div className="d-flex m-4">
                                <TbForklift size={38}></TbForklift>
                                <p className="ms-3 fs-4">ForkLift</p>
                            </div>
                        }

                    </div>
                </div>

                <div className="mt-4 d-flex col-12">
                    <div className="col-12">
                        <h3>Description:</h3>
                        <p className="mt-4 ms-2 fs-5">{warehouseData.description}
                            Offering over 2000SQM of elegant working space, Best Option For to Open Gym . This well-presented Gym is arranged on the 3 floors level with a lovely Place within a calm surrounding.
                            This Gym comprises generous open space and 2 Sauna room , with bright interiors and very good finishing, and Many bathrooms For Male & Female , in addition there Is Pool & Private Rooms For Managers , …. etc .
                        </p>

                    </div>

                </div>

                <div className="col-12 mb-5 ">
                    <div className="col-10 m-auto">
                        <hr></hr>
                    </div>
                </div>

                <div>
                    <MapContainer center={[warehouseData.location[0], warehouseData.location[1]]} zoom={14}  >
                        <TileLayer
                            url={osm.maptiler.url}
                            attribution={osm.maptiler.attribution}
                        />
                        <Marker position={[warehouseData.location[0], warehouseData.location[1]]} icon={markerIcon}>
                            <Popup>
                                <div>
                                    <h4>{warehouseData.name}</h4>
                                </div>
                            </Popup>
                        </Marker>


                    </MapContainer>
                </div>


                <div className="col-12 mt-5 ">
                    <div className="col-10 m-auto">
                        <hr></hr>
                    </div>
                </div>

                <div>
                    <h1>Select Rental Date:</h1>
                    <p>Select a rental date so your request to rent the warehouse will be sent to the owner</p>
                    <p>Availble Dates: {warehouseData && warehouseData.datesAvailable.map((currentDate) => {
                        return <span className="ms-3 px-3 py-1 d-inline-block rounded-4" style={{backgroundColor: 'red'}}>{currentDate[0].replaceAll('/','-')} / {currentDate[1].replaceAll('/','-')}</span>
                    })}</p>
                    <div>
                       {dataSettings.endDate && <DateRangePicker

                            onChange={item => { 
                                setState(item.selection)
                                setFinalDate(item.selection)
                            }}
                            minDate={new Date()}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            maxDate={ new Date(dataSettings.endDate) }
                            ranges={[state]}
                            direction="horizontal"
                        />
                            }
                    </div>
                </div>

            </div>

        </div>
    )
}

export default WarehouseDetails
