import { IoIosReturnLeft } from 'react-icons/io'
import { AiOutlineMail } from "react-icons/ai"
import { FiPhone } from "react-icons/fi"
import { BiCctv } from 'react-icons/bi'
import sprinkler from '../../../Components/WarehouseCard/sprinkler.png'
import { TbForklift } from 'react-icons/tb'
import { GrUserWorker } from 'react-icons/gr'
import ac from '../../../Components/WarehouseCard/air-conditioner.png'

import { DateRangePicker } from 'react-date-range';

import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import osm from '../../../Components/WarehousesMap/TileLayer'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import Table from "react-bootstrap/Table"
import styles from './WarehouseDetailsCss.module.css'
import CreditCardForm from '../../../Components/CreditCard/CreditCardForm'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'



const WarehouseDetails = () => {

    const [showPayments, setShowPayments] = useState(false)
    const [dataSettings, setDataSettings] = useState({
        endDate: null,
        disabledDates: [],
        showEmail: false,
        showPhoneNumber: false,
        showDateAlert: false
    })

    const dateRangeRef = useRef()
    const [state, setState] = useState(
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    );

    const [finalDate, setFinalDate] = useState(null)

    const markerIcon = new L.icon({
        iconUrl: require('../../../Components/WarehousesMap/warehouse.png'),
        iconSize: [30, 40]
    })

    const data = useLocation()
    const navigate = useNavigate();
    const [warehouseData, setWarehouseData] = useState(data.state)

    useEffect(() => {
        if (warehouseData == null) return
        let maxDate = -Infinity
        let disabledDates = []

        for (let i = 0; i < warehouseData.datesAvailable.length; i++) {
            maxDate = Math.max(maxDate, new Date(warehouseData.datesAvailable[i][1]).getTime())
        }

        for (let i = new Date(); i < new Date(maxDate); i.setDate(i.getDate() + 1)) {
            let currentDate = new Date(i)
            let allowed = false

            for (let j = 0; j < warehouseData.datesAvailable.length; j++) {
                if (new Date(warehouseData.datesAvailable[j][0]) <= currentDate && currentDate <= new Date(warehouseData.datesAvailable[j][1])) {
                    allowed = true
                }
            }

            if (!allowed) { disabledDates.push(currentDate) }
        }
        setDataSettings({ ...dataSettings, ['endDate']: maxDate, ['disabledDates']: disabledDates })

    }, [warehouseData])

    const manageRequest = () => {
        if (!state.endDate || !state.endDate) {
            setDataSettings({ ...dataSettings, ['showDateAlert']: true })
            window.scroll({ top: dateRangeRef.current.offsetTop, left: 0 })
            return
        }
        setShowPayments(true)
    }

    return (
        <div className="mt-3 d-flex">


            <Modal
                show={showPayments}
                onHide={() => setShowPayments(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreditCardForm></CreditCardForm>
                </Modal.Body>
            </Modal>



            {/* <div className='position-absolute'>
            </div> */}

            <div className="col-2 ps-5 ">
                <IoIosReturnLeft onClick={() => navigate(-1)} size={50}></IoIosReturnLeft>

            </div>

            <div className="col-9  p-4">

                <div className="col-12">
                    <h1>{warehouseData.name}</h1>
                    <h3 className="d-flex">{warehouseData.address[0][0]} ,<h3 className="ms-2">{warehouseData.address[0][1]}</h3> </h3>
                </div>


                <div className="d-flex">

                    <div style={{ height: '404px' }} >
                        <img src={warehouseData.images[0]} alt='warehouseImg' width={'300px'} height={'404px'} className="rounded border" ></img>
                    </div>

                    <div>

                        <div className="ms-3 ">

                            <div>
                                <img src={warehouseData.images[1]} alt='warehouseImg' width={'300px'} height={'190px'} className="rounded m-1 border" ></img>
                                <img src={warehouseData.images[2]} alt='warehouseImg' width={'300px'} height={'190px'} className="rounded ms-2 border" ></img>
                            </div>

                            <div>
                                <img src={warehouseData.images[0]} alt='warehouseImg' width={'610px'} height={'200px'} className="rounded m-1 border" ></img>
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

                    <div className="col-5 rounded-4 d-flex border border-dark ">
                        <div className="p-3 col-12 rounded py-4">

                            <div className="col-12 px-1">
                                <Table bordered>
                                    <tbody>
                                        <tr >
                                            <td className="w-50 p-2">From: {state.startDate ? new Date(state.startDate).toISOString().slice(0, 10) : 'No Date Selected'}</td>
                                            <td className="w-50 p-2">Till: {state.endDate ? new Date(state.endDate).toISOString().slice(0, 10) : 'No Date Selected'}</td>
                                        </tr>
                                        <tr className={styles.requestBtn}>
                                            <td colSpan={2} className={`text-center bg-success text-white fs-5 `} onClick={() => {
                                                manageRequest()
                                            }}>Request</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className="mt-4 px-5">
                                <p className="fs-4">{datediff(state.startDate, state.endDate)} Day X {warehouseData.pricePerDay}$ Per Day</p>
                                <p className="col-12 m-auto"><hr></hr></p>
                                <p className=" fs-4">Total: {datediff(state.startDate, state.endDate) * parseInt(warehouseData.pricePerDay)}$</p>
                            </div>

                            <div className="mt-5 d-flex justify-content-between px-4">

                                <p className={`fs-4`} onClick={() => {
                                    setDataSettings({ ...dataSettings, ['showEmail']: true })
                                }}> {dataSettings.showEmail ? <p className="fs-5">{warehouseData.Owner.email} </p> : <p className={styles.emailIcon}><AiOutlineMail size={40}></AiOutlineMail> Mail </p>}</p>

                                <p className="fs-4" onClick={() => {
                                    setDataSettings({ ...dataSettings, ['showPhoneNumber']: true })
                                }}>{dataSettings.showPhoneNumber ? <p className="fs-5"> {warehouseData.Owner.phoneNumber} </p> : <p className={`${styles.emailIcon}`}><FiPhone size={40}></FiPhone> Phone </p>}</p>
                            </div>

                        </div>
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
                        return <span className="ms-3 px-3 py-1 d-inline-block rounded-4" style={{ backgroundColor: '#90ee90' }}>{currentDate[0].replaceAll('/', '-')} / {currentDate[1].replaceAll('/', '-')}</span>
                    })}</p>
                    {state.endDate && <p> From: {new Date(state.startDate).toISOString().slice(0, 10)}<span className="ms-3"></span> Till: {new Date(state.endDate).toISOString().slice(0, 10)}</p>}
                    {dataSettings.showDateAlert && <p className={`${styles.dateAlert} fs-4`}> Fill Date To Continue !</p>}
                    <div ref={dateRangeRef}>
                        {dataSettings.endDate && <DateRangePicker

                            onChange={item => {
                                setState(item.selection)
                                setFinalDate(item.selection)
                                setDataSettings({ ...dataSettings, ['showDateAlert']: false })
                            }}
                            minDate={new Date()}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            maxDate={new Date(dataSettings.endDate)}
                            disabledDates={dataSettings.disabledDates}
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

function datediff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

export default WarehouseDetails
