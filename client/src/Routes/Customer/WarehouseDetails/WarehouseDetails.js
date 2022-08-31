import { IoIosReturnLeft } from 'react-icons/io'
import { AiOutlineMail } from "react-icons/ai"
import { FiPhone } from "react-icons/fi"
import { BiCctv } from 'react-icons/bi'
import sprinkler from '../../../Components/WarehouseCard/sprinkler.svg'
import { TbForklift } from 'react-icons/tb'
import { GrUserWorker } from 'react-icons/gr'
import ac from '../../../Components/WarehouseCard/air-conditioner.svg'
import worker from '../../../Components/WarehouseCard/worker.svg'


import { DateRange } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import osm from '../../../Components/WarehousesMap/TileLayer'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";

import Table from "react-bootstrap/Table"
import styles from './WarehouseDetailsCss.module.css'
import CreditCardForm from '../../../Components/CreditCard/CreditCardForm'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ui from '../../../themes'
import { Carousel } from 'react-bootstrap'
import StripePayment from '../../../Components/StripePaymentPage/StripePayment'



const WarehouseDetails = () => {
    const data = useLocation()
    const navigate = useNavigate();

    const [warehouseData, setWarehouseData] = useState(data.state)

    const [stripeUserSecret, setStripeUserSecret] = useState(data.state.clientSecret)
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



    const [windowWidth, setwindowWidth] = useState(window.innerWidth)


    const useWindowSize = () => {

        useLayoutEffect(() => {
            const updateSize = () => {
                setwindowWidth(window.innerWidth)
            };
            window.addEventListener("resize", updateSize)

        }, [])

    }

    useWindowSize()

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

    const manageRequest = async () => {
        if (!state.endDate || !state.endDate) {
            setDataSettings({ ...dataSettings, ['showDateAlert']: true })
            window.scroll({ top: dateRangeRef.current.offsetTop, left: 0 })
            return
        }

        await axios.post('/userActivity', {
            action: `requested to rent ${warehouseData.name} warehouse for ${datediff(state.startDate, state.endDate)} day from ${warehouseData.Owner.email} at a ${warehouseData.pricePerDay}$ per day`,
            role: 'customer'
        })

        await axios.post('/user/rentWarehouse', {
            warehouseData: warehouseData,
            rentingDate: [state.startDate, state.endDate],
            totalPrice: datediff(state.startDate, state.endDate) * parseInt(warehouseData.pricePerDay)
        }).then((data) => {

            if (data.data == 'forbidden') {
                navigate('/')
            }else{
                setStripeUserSecret(data.data.clientSecret)
                // window.location = `${data.data.url}`
                setShowPayments(true)
            }
        })
    }


    return (
        <div className="mt-3 d-sm-flex d-block">


            {stripeUserSecret != null && stripeUserSecret != undefined && <Modal
                show={showPayments}
                onHide={() => setShowPayments(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor:`${ui.lightBg}`}}>
                    <Modal.Title id="contained-modal-title-vcenter"  style={{ color:`${ui.normalText}`}}>
                        Payments
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor:`${ui.backgroundColor}`}}>
                     <StripePayment customerSecret={stripeUserSecret}></StripePayment>
                    {/* TODO: Use this in login */}
                    {/* <CreditCardForm></CreditCardForm> */}
                </Modal.Body>
            </Modal>}



            {/* <div className='position-absolute'>
            </div> */}

            <div className="col-2 ps-sm-5 ps-1">
                <IoIosReturnLeft onClick={() => navigate(-1)} size={50} style={{ color: `${ui.normalText}` }}></IoIosReturnLeft>

            </div>

            <div className="col-sm-9  p-sm-4 ps-4 mt-sm-0 mt-5 col-10 m-sm-0 m-auto">

                <div className="col-12">
                    <h1 style={{ color: `${ui.bigTitle}` }}>{warehouseData.name}</h1>
                    <h3 style={{ color: `${ui.bigTitleSecondaryColor}` }} className="d-flex">{warehouseData.address[0][0]} ,<h3 className="ms-2">{warehouseData.address[0][1]}</h3> </h3>
                </div>


                {windowWidth > 600 ? <div className="d-sm-flex d-block ">

                    <div style={{ height: '404px' }} >
                        <img src={warehouseData.images[0]} alt='warehouseImg' style={{ objectFit: 'cover' }} width={'300px'} height={'404px'} className="rounded border" ></img>
                    </div>

                    <div>

                        <div className="ms-sm-3 ms-0 mt-sm-0 mt-2">

                            <div>
                                <img src={warehouseData.images[1]} alt='warehouseImg' style={{ objectFit: 'cover' }} width={'300px'} height={'190px'} className="rounded m-1 border" ></img>
                                <img className='mt-sm-0 mt-2' src={warehouseData.images[2]} alt='warehouseImg' style={{ objectFit: 'cover' }} width={'300px'} height={'190px'} className="rounded ms-2 border" ></img>
                            </div>

                            <div className='d-sm-block d-none '>
                                <img src={warehouseData.images[3]} alt='warehouseImg' style={{ objectFit: 'cover' }} width={'610px'} height={'200px'} className="rounded m-1 border" ></img>
                            </div>

                        </div>


                    </div>

                </div>
                    :
                    <div className='col-8 m-auto'>
                        <Carousel style={{ width: '310px', height: '200px' }}>
                            {warehouseData.images && warehouseData.images.map((base64, index) => {

                                return (
                                    <Carousel.Item>

                                        <img
                                            key={index}
                                            src={base64}
                                            alt=""
                                            height={'200px'}
                                            width={'310px'}
                                        />

                                    </Carousel.Item>
                                )

                            })}
                        </Carousel>
                    </div>
                }

                <div className="mt-4 d-sm-flex d-block col-12">
                    <div className="col-6">


                        <h1 style={{ color: `${ui.bigTitle}` }}>Details:</h1>


                        <div className="mt-5">
                            <h4 style={{ color: `${ui.normalText}` }}>Property size: <span className="ms-1" style={{ fontWeight: '350', color: `${ui.normalText}` }}>{warehouseData.space} m<sup>2</sup> / {Math.floor(parseInt(warehouseData.space) * 10.7639)} ft<sup>2</sup></span> </h4>
                        </div>

                        <div className="mt-5">
                            <h4 style={{ color: `${ui.normalText}` }}>Cost per day: <span className="ms-1" style={{ fontWeight: '350', color: `${ui.normalText}` }}>${warehouseData.pricePerDay}</span></h4>
                        </div>

                        <div className="mt-5">
                            <h4 style={{ color: `${ui.normalText}` }}>Type: <span className="ms-1" style={{ fontWeight: '350', color: `${ui.normalText}` }}>{warehouseData.type}</span></h4>
                        </div>

                    </div>

                    <div className="col-sm-5 col-10 rounded-4 d-flex border border-dark mt-sm-0 mt-4 ">
                        <div className="p-3 col-12 rounded py-4">

                            <div className="col-12 px-1">
                                <Table bordered>
                                    <tbody style={{ borderColor: `${ui.borders}` }}>
                                        <tr style={{ borderColor: `${ui.borders}` }}>
                                            <td style={{ color: `${ui.normalText}`, borderColor: `${ui.borders}` }} className="w-50 p-2">From: {state.startDate ? new Date(state.startDate).toISOString().slice(0, 10) : 'No Date Selected'}</td>
                                            <td style={{ color: `${ui.normalText}`, borderColor: `${ui.borders}` }} className="w-50 p-2">Till: {state.endDate ? new Date(state.endDate).toISOString().slice(0, 10) : 'No Date Selected'}</td>
                                        </tr>
                                        <tr className={styles.requestBtn}>
                                            <td style={{ color: `${ui.Buttons}` }} colSpan={2} className={`text-center bg-primary text-white fs-5 `} onClick={() => {
                                                manageRequest()
                                            }}>Request</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>

                            <div className="mt-4 px-5">
                                <p style={{ color: `${ui.normalText}` }} className="fs-4">{datediff(state.startDate, state.endDate)} Day X {warehouseData.pricePerDay}$ Per Day</p>
                                <p style={{ color: `${ui.normalText}` }} className="col-12 m-auto"><hr></hr></p>
                                <p style={{ color: `${ui.normalText}` }} className=" fs-4">Total: {datediff(state.startDate, state.endDate) * parseInt(warehouseData.pricePerDay)}$</p>
                            </div>

                            <div className="mt-5 d-flex justify-content-between px-4">

                                <p style={{ color: `${ui.normalText}` }} className={`fs-4`} onClick={() => {
                                    setDataSettings({ ...dataSettings, ['showEmail']: true })
                                }}> {dataSettings.showEmail ? <p className="fs-5">{warehouseData.Owner.email} </p> : <p className={styles.emailIcon}><AiOutlineMail size={40}></AiOutlineMail> Mail </p>}</p>

                                <p style={{ color: `${ui.normalText}` }} className="fs-4" onClick={() => {
                                    setDataSettings({ ...dataSettings, ['showPhoneNumber']: true })
                                }}>{dataSettings.showPhoneNumber ? <p className="fs-5"> {warehouseData.Owner.phoneNumber} </p> : <p className={`${styles.emailIcon}`}><FiPhone size={40}></FiPhone> Phone </p>}</p>
                            </div>

                        </div>
                    </div>

                </div>

                <div className="mt-5 col-12">
                    <h3 style={{ color: `${ui.normalText}` }}>Features:</h3>

                    <div style={{ color: `${ui.normalText}` }} className="mt-4 justify-content-between d-flex flex-wrap w-75" >
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
                             <img src={worker} width={'25px'} style={{ opacity: 1, color: 'white' }} className="m-2 mt-1"></img>
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
                        <h3 style={{ color: `${ui.normalText}` }}>Description:</h3>
                        <p style={{ color: `${ui.normalText}` }} className="mt-4 ms-2 fs-5">{warehouseData.description}
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
                    <MapContainer  center={[warehouseData.location[0], warehouseData.location[1]]} zoom={14}  >
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
                    <h1 style={{ color: `${ui.normalText}` }}>Select Rental Date:</h1>
                    <p style={{ color: `${ui.normalText}` }}>Select a rental date so your request to rent the warehouse will be sent to the owner</p>
                    <p style={{ color: `${ui.normalText}` }}>Availble Dates: {warehouseData && warehouseData.datesAvailable.map((currentDate) => {
                        return <span className="ms-3 px-3 py-1 d-inline-block rounded-4" style={{ backgroundColor: `${ui.Buttons}` }}>{new Date(currentDate[0]).toISOString().slice(0, 10)} / {new Date(currentDate[1]).toISOString().slice(0, 10)}</span>
                    })}</p>
                    {state.endDate && <p className='rounded px-2' style={{color: `${ui.normalText}`,color: `${ui.normalText}`, border: ` 1px solid ${ui.borders}`, display:'inline-block', backgroundColor: `${ui.lightBg}`}}> From: {new Date(state.startDate).toISOString().slice(0, 10)}<span className="ms-3"></span> Till: {new Date(state.endDate).toISOString().slice(0, 10)}</p>}
                    {dataSettings.showDateAlert && <p className={`${styles.dateAlert} fs-4`}> Fill Date To Continue !</p>}
                    <div  ref={dateRangeRef}>
                        {dataSettings.endDate && (windowWidth > 600 ? <DateRangePicker 

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
                            direction={windowWidth > 600 ? "horizontal" : 'vertical'}
                        /> :
                            <DateRange style={{ backgtoundColor: `${ui.lightBg}` }}

                                onChange={item => {
                                    setState(item.selection)
                                    setFinalDate(item.selection)
                                    setDataSettings({ ...dataSettings, ['showDateAlert']: false })
                                }}
                                minDate={new Date()}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                maxDate={new Date(dataSettings.endDate)}
                                disabledDates={dataSettings.disabledDates}
                                ranges={[state]}
                            />)

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
