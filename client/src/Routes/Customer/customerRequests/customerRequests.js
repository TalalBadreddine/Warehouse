import React, { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { IoIosReturnLeft } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import styles from './customerRequestsCss.module.css'



function CustomerRequests() {

    const [show, setShow] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false)

    const [currentWarehouseData, setCurrentWarehouseData] = useState()
    const [currentWarehouseRequest, setCurrentWarehouseRequest ] = useState()

    const handleCloseViewModal = () => setShowViewModal(false)

    const navigate = useNavigate()

    const handleShow = (ownerDetails) => {
        setShow(true)
        setOwnerDetails({ ...ownerDetails, ['email']: ownerDetails.warehouseOwnerEmail, ['phoneNumber']: ownerDetails.phoneNumber })
    };
    const handleClose = () => setShow(false);
    const [requests, setRequests] = useState([])

    const [ownerDetails, setOwnerDetails] = useState({
        email: null,
        phoneNumber: null
    })


    useEffect(() => {

        axios.get('/user/getAllUserRequests').then((results) => {
            setRequests(results.data)
        })

    }, []);
    const statusColor = (status) => {
        if (status === 'pending') {
            return 'purple'
        }
        if (status === 'accepted') {
            return 'green'
        }
        else {
            return 'red'
        }
    }

    const handleViewBtn = (warehouseId) => {

        axios.post('/user/getWarehouseInfo', { warehouseId }).then((results) => {
            setCurrentWarehouseData(results.data)
            console.log(results.data)
        }).catch((err) => {
            console.log(err.message)
        })

        setShowViewModal(true)

    }


    return (

        <div className='col-11 justify-content-center m-auto'>

            <div className='mt-4'>


                <span className={styles.returnBtn} onClick={() => { navigate(-1) }}><IoIosReturnLeft size={68}></IoIosReturnLeft></span>

            </div>

            <div className='p-5'>
                <Table striped bordered hover responsive="md" style={{ height: '60vh', width: '80vw', margin: 'auto' }}>
                    <thead >
                        <tr>
                            <th>Warehouse Name</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            requests.map((item, i) => (
                                <tr key={i}>
                                    <td className='p-3'> {item.warehouseName}</td>
                                    <td className='p-3'>{item.warehouseOwnerEmail}</td>
                                    <td style={{ color: statusColor(item.status) }} className='p-3'>{item.status}</td>
                                    <td className='p-3' >
                                        <div style={{ display: 'inline-block' }} >
                                            <a style={{ color: 'darkblue' }} onClick={() => { handleShow(item) }} href="#">Contact</a>

                                            <a className="ms-5" style={{ color: 'darkblue' }} href="#" onClick={() => { 
                                                handleViewBtn(item.WarehouseId)
                                                setCurrentWarehouseRequest(item)
                                                 }}>View</a>

                                            {item.status == 'accepted' &&
                                                <a className="ms-5" style={{ color: 'darkblue' }} href="#" >Feedback</a>}
                                        </div>
                                    </td>
                                </tr>

                            ))}

                    </tbody>
                </Table>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}

            >
                <Modal.Body style={{
                    backgroundImage: `url("https://dr-job.net/wp-content/uploads/2021/01/Contact-banner.jpg")`, backgroundRepeat: 'no-repeat', width: 'auto', height: '350px', color: 'white', borderRadius: '8px', boxShadow: '8px 8px 9px black'
                }} >

                    <Button variant="secondary" onClick={handleClose} style={{ borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', width: '45px', height: '40px', boxShadow: '1px 1px 9px white' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" color="black" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Button>
                    <br></br>
                    <div style={{ marginTop: '39%', marginLeft: '5%' }}>
                        <button style={{ marginBottom: '2%', borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', boxShadow: '1px 1px 9px black' }}>Email: {ownerDetails.email}</button> <br></br>
                        <button style={{ marginBottom: '2%', borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', boxShadow: '1px 1px 9px black' }}>Phone Number : {ownerDetails.phoneNumber} </button><br></br>


                    </div>
                </Modal.Body>

            </Modal>

            {currentWarehouseData && <Modal
                show={showViewModal}
                onHide={handleCloseViewModal}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}

            >
                <Modal.Header closeButton>
                    <h2>{currentWarehouseData.name}</h2>
                </Modal.Header>
                <Modal.Body className='p-4' >
                <img style={{height:'350px', width:'100%'}} src={currentWarehouseData.images[0]} alt={'no image'}></img>

                    <div className='d-flex'>

                    <div>
                        <h2>Details</h2>
                        <div className='mt-3 d-flex justify-content-between'>
                            <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Address:</span>   <span>{currentWarehouseData.address[0].join(' , ')}</span> </span>
                        </div>

                        <div className='mt-3'>
                            <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Price per Day:</span>   <span>${currentWarehouseData.pricePerDay}</span> </span>
                        </div>

                        <div className='mt-3'>
                            <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Space:</span>   <span>{currentWarehouseData.space} </span>m<sup>2</sup>  </span>
                        </div>

                        <div className='mt-3'>
                            <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Requested date: </span>   <span>{new Date(currentWarehouseRequest.startRentDate).toISOString().slice(0, 10)} => {new Date(currentWarehouseRequest.endRentDate).toISOString().slice(0, 10)}</span> </span>
                        </div>


                    </div>
                    
                    <div>
                        <h2>Status: <span className='fs-3' style={{color: statusColor(currentWarehouseRequest.status)}}> {currentWarehouseRequest.status.toUpperCase()}</span></h2>
                    </div>
                        
                    </div>

                    <div className='mt-5'>
                        <h2>Feedback</h2>
                    </div>
                </Modal.Body>

            </Modal>}
        </div>
    );
}

export default CustomerRequests;