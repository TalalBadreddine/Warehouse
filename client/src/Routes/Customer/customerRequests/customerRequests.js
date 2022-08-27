import React, { useState, useEffect, useRef } from "react"
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { IoIosReturnLeft } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import styles from './customerRequestsCss.module.css'
import { BsFillReplyAllFill } from 'react-icons/bs'
import { AiFillCaretDown } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import ui from '../../../themes'


function CustomerRequests() {

    const [show, setShow] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false)

    const [currentWarehouseData, setCurrentWarehouseData] = useState()
    const [currentWarehouseRequest, setCurrentWarehouseRequest] = useState()

    const [viewAllReply, setViewAllReply] = useState()

    const textAreaRef = useRef()

    const replyBtnRef = useRef([])
    const replyInputRef = useRef([])

    const handleCloseViewModal = () => setShowViewModal(false)

    const navigate = useNavigate()

    const handleShow = (ownerDetails) => {
        setShow(true)
        setOwnerDetails({ ...ownerDetails, ['email']: ownerDetails.warehouseOwnerEmail, ['phoneNumber']: ownerDetails.phoneNumber })
    };
    const handleClose = () => setShow(false);
    const [requests, setRequests] = useState([])

    const handleComment = async () => {

        let content = textAreaRef.current.value
        if (content == '') {
            alert('empty Comment Will not be added')
            return
        }

        await axios.post('/userActivity', {
            action: `add a feedback to  ${currentWarehouseData.name} warehouse, the comment content: ${content}`,
            role: 'customer'
        }).then((results) => {
        })

        let currentComment
        await axios.post('/user/addComment', { content, warehouseId: currentWarehouseData._id }).then((results) => {
            currentComment = results.data

        })

        textAreaRef.current.value = ''
        let warehouse = currentWarehouseData
        warehouse.feedback.push([currentComment])
        setCurrentWarehouseData({ ...currentWarehouseData, ['feedback']: warehouse.feedback })

    }

    const [ownerDetails, setOwnerDetails] = useState({
        email: null,
        phoneNumber: null
    })


    useEffect(() => {

        axios.get('/user/getAllUserRequests').then((results) => {
            if (results.data == 'forbidden') {
                navigate('/')
            }
            setRequests(results.data)
        })

    }, []);
    const statusColor = (status) => {
        if (status === 'pending') {
            return 'orange'
        }
        if (status === 'accepted') {
            return 'lightgreen'
        }
        else {
            return 'red'
        }
    }

    const handleViewBtn = (warehouseId) => {

        axios.post('/user/getWarehouseInfo', { warehouseId }).then((results) => {
            setCurrentWarehouseData(results.data)

            let arr = new Array(results.data.feedback.length).fill(0)
            setViewAllReply(arr)

        }).catch((err) => {
            console.log(err.message)
        })

        setShowViewModal(true)

    }

    const handleReplyBtn = (indexOfRef) => {
        let arr = viewAllReply
        arr[indexOfRef] = 10000
        setViewAllReply([...arr])

        for (let i = 0; i < replyBtnRef.current.length; i++) {
            if (i != indexOfRef) replyBtnRef.current[i].className = 'd-none'
        }

        let target = replyBtnRef.current[indexOfRef]
        if (target.className == ' ') {
            target.className = 'd-none'
        } else {
            target.className = " "
        }

    }

    const addReply = (arrIndex) => {
        let content = replyInputRef.current[arrIndex].value

        if (content == '') {
            alert('cannot add a empty comment')
            return
        }

        let feedbackObject = {
            comentorEmail: 'current User',
            content: content,
            warehouseId: currentWarehouseData._id
        }

        axios.post('/user/addReply', {

            arrIndex: arrIndex,
            content: content,
            warehouseId: currentWarehouseData._id

        }).then((results) => {

            console.log(results.data)
            let feedback = currentWarehouseData.feedback
            feedbackObject['addedIn'] = new Date()
            feedback[arrIndex].push(feedbackObject)
            setCurrentWarehouseData({ ...currentWarehouseData, ['feedback']: feedback })

        })
    }

    const calculateDaysDifference = (firstDate, secondDate) => {
        const date1 = new Date(firstDate);
        const date2 = new Date(secondDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    return (

        <div className='col-11 justify-content-center m-auto'>

            <div className='mt-4'>


                <span className={styles.returnBtn} onClick={() => { navigate(-1) }}><IoIosReturnLeft size={68} style={{ color: `${ui.borders}` }}></IoIosReturnLeft></span>

            </div>

            <div className='p-5'>
                <Table striped hover responsive="md" style={{ width: '75vw', marginLeft: '8%' }}>
                    <thead style={{ backgroundColor: `${ui.borders}`, color: 'white', fontSize: '18px', height: '8vh' }} >
                        <tr>
                            <th>Warehouse Name</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >

                        {requests != undefined &&
                            requests.map((item, i) => (
                                <tr key={i}>
                                    <td className='p-3' style={{ color: 'white' }}> {item.warehouseName}</td>
                                    <td className='p-3' style={{ color: 'white' }}>{item.warehouseOwnerEmail}</td>
                                    <td style={{ color: statusColor(item.status) }} className='p-3'>{item.status}</td>
                                    <td className='p-3' >
                                        <div style={{ display: 'inline-block' }} >
                                            <button style={{ color: 'white', backgroundColor: `${ui.backgroundColor}`, border: `solid 2px ${ui.borders}` }} onClick={() => { handleShow(item) }} href="#">Contact</button>

                                            <button className="ms-5" style={{ color: 'white', backgroundColor: `${ui.backgroundColor}`, border: `solid 2px ${ui.borders}` }} href="#" onClick={() => {
                                                handleViewBtn(item.WarehouseId)
                                                setCurrentWarehouseRequest(item)
                                            }}>View</button>

                                            {/* {item.status == 'accepted' && <button className="ms-5" style={{ color:'white', backgroundColor:`${ui.backgroundColor}`, border:`solid 2px ${ui.borders}`}} href="#" >Feedback</button>} */}
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
                <Modal.Header closeButton style={{ backgroundColor: `${ui.borders}` }}>
                    <h2 style={{ color: `${ui.normalText}` }}>{currentWarehouseData.name}</h2>
                </Modal.Header>
                <Modal.Body className='p-5' style={{ backgroundColor: `${ui.lightBg}`, color: `${ui.normalText}` }}>
                    <img style={{ height: '250px', width: '100%' }} src={currentWarehouseData.images[0]} alt={'no image'}></img>
                    <br></br>
                    <br></br>

                    <div className='d-flex'>

                        <div>
                            <h3>Details</h3>
                            <div className='mt-3 d-flex justify-content-between'>
                                <span className='fs-6'> <span style={{ fontWeight: 'bold', color: `${ui.borders}` }}>Address:</span>   <span style={{ fontWeight: 'lighter' }}>{currentWarehouseData.address[0].join(' , ')}</span> </span>
                            </div>

                            <div className='mt-3'>
                                <span className='fs-6'> <span style={{ fontWeight: 'bold', color: `${ui.borders}` }}>Price per Day:</span>   <span style={{ fontWeight: 'lighter' }}>${currentWarehouseData.pricePerDay}</span> </span>
                            </div>

                            <div className='mt-3'>
                                <span className='fs-6'> <span style={{ fontWeight: 'bold', color: `${ui.borders}` }}>Space:</span>   <span style={{ fontWeight: 'lighter' }}>{currentWarehouseData.space} </span>m<sup>2</sup>  </span>
                            </div>

                            <div className='mt-3'>
                                <span className='fs-6'> <span style={{ fontWeight: 'bold', color: `${ui.borders}` }}>Requested date: </span>   <span style={{ fontWeight: 'lighter' }}>{new Date(currentWarehouseRequest.startRentDate).toISOString().slice(0, 10)} => {new Date(currentWarehouseRequest.endRentDate).toISOString().slice(0, 10)}</span> </span>
                            </div>


                        </div>

                        <div>
                            <h3>Status: <span className='fs-4' style={{ color: statusColor(currentWarehouseRequest.status) }}> {currentWarehouseRequest.status.toUpperCase()}</span></h3>
                        </div>


                    </div>

                    <div className='mt-5'>
                        <h3>Feedback</h3>

                        <div className='col-11 m-auto mt-3'>
                            {currentWarehouseRequest.status == 'accepted' && <div>
                                <textarea ref={textAreaRef} className='col-12 rounded ps-2 pr-1' style={{ height: '100px', color: `${ui.normalText}`, backgroundColor: `${ui.backgroundColor}`, border: `solid 2px ${ui.borders}` }} placeholder={'Feedback...'}></textarea>
                                <div className='d-flex justify-content-end'>
                                    <Button className='col-2' onClick={() => { handleComment() }}>Comment</Button>
                                </div>

                            </div>}


                            <div className='mt-3' style={{height: currentWarehouseData.feedback.length > 0 ? '400px' : '0px', overflowY: 'scroll' }}>

                                <div className='ms-4'>

                                    {currentWarehouseData.feedback.map((commentArr, helperIndex) => {

                                        return (
                                            commentArr.map((comment, index) => {

                                                if (index == 0) {
                                                    return (
                                                        <div className='mt-4'>
                                                            <div>
                                                                <span style={{ fontSize: '1rem' }}><BiUserCircle size={37}></BiUserCircle> <span style={{ color: commentArr[index].comentorEmail == currentWarehouseRequest.warehouseOwnerEmail ? 'green' : 'white' }}>{commentArr[index].comentorEmail}</span> {currentWarehouseRequest.warehouseOwnerEmail == commentArr[index].comentorEmail && <span style={{ fontSize: '0.8rem' }}>(warehouse owner)</span>}</span>
                                                                <span className='ms-3' style={{ fontSize: '0.8rem', color: `${ui.xsTexts}` }}>{calculateDaysDifference(new Date(), commentArr[index].addedIn) > 0 ? `${calculateDaysDifference(new Date(), commentArr[index].addedIn)} day ago ` : 'Today'} </span>
                                                            </div>
                                                            <div className='col-12 ps-1 m-auto'>
                                                                <p style={{ marginLeft:'10%',color:`${ui.borders}`,fontWeight:'bolder',fontSize: '1rem' }}>"{commentArr[index].content}"</p>

                                                                <div className='d-flex'>

                                                                    {commentArr.length > 1 && <p className='ms-1' style={{ fontSize: '1rem', color: 'rgb(0,0,0, 0.6)' }} className={styles.returnBtn} onClick={() => {
                                                                        let arr = viewAllReply
                                                                        arr[helperIndex] = arr[helperIndex] == 0 ? 10000 : 0
                                                                        setViewAllReply([...arr])

                                                                    }}><AiFillCaretDown></AiFillCaretDown> View replies</p>}
                                                                    {currentWarehouseRequest.status == 'accepted' && <p style={{ fontSize: '1rem', color: `black`, float:'right' }} className={commentArr.length > 1 ? `ms-5 ${styles.returnBtn}` : `ms-2 ${styles.returnBtn}`} onClick={(e) => {
                                                                        let arr = viewAllReply
                                                                        arr[helperIndex] = 10000
                                                                        setViewAllReply([...arr])
                                                                        handleReplyBtn(helperIndex)

                                                                    }} ><BsFillReplyAllFill></BsFillReplyAllFill> REPLY</p>}
                                                                </div>
                                                                {index == commentArr.length - 1 &&
                                                                    <div className='d-none' ref={el => replyBtnRef.current[helperIndex] = el}>
                                                                        <div className='d-flex'>
                                                                            <textarea type='text' className='border rounded col-9' ref={(el) => { replyInputRef.current[helperIndex] = el }}></textarea>
                                                                            <Button className='ms-1' onClick={() => { addReply(helperIndex) }}>reply</Button>
                                                                        </div>
                                                                    </div>
                                                                }

                                                            </div>
                                                        </div>
                                                    )

                                                } else {

                                                    return (
                                                        index < parseInt(viewAllReply[helperIndex]) && <div>

                                                            <div className='ms-5' >
                                                                <div>
                                                                    <span style={{ fontSize: '1.3rem' }}> <BiUserCircle size={37}></BiUserCircle> <span style={{ color: commentArr[index].comentorEmail == currentWarehouseRequest.warehouseOwnerEmail ? 'green' : 'black' }}> {commentArr[index].comentorEmail}</span> {currentWarehouseRequest.warehouseOwnerEmail == commentArr[index].comentorEmail && <span style={{ fontSize: '0.8rem' }}>(warehouse owner)</span>} </span>
                                                                    <span className='ms-2' style={{ fontSize: '0.8rem', color: 'rgb(0,0,0, 0.6)' }}>{calculateDaysDifference(new Date(), commentArr[index].addedIn) > 0 ? `${calculateDaysDifference(new Date(), commentArr[index].addedIn)} day ago ` : 'Today'}</span>
                                                                </div>
                                                                <p style={{ fontSize: '1rem' }}>{commentArr[index].content}</p>
                                                            </div>
                                                            {index == commentArr.length - 1 &&
                                                                <div className='d-none' id={`${helperIndex}-${index}`} ref={el => replyBtnRef.current[helperIndex] = el} >
                                                                    <div className='d-flex'>
                                                                        <textarea type='text' className='border rounded col-9' ref={(el) => { replyInputRef.current[helperIndex] = el }} ></textarea>
                                                                        <Button className='ms-1' onClick={() => { addReply(helperIndex) }}>reply</Button>
                                                                    </div>
                                                                </div>
                                                            }

                                                        </div>

                                                    )

                                                }


                                            })

                                        )

                                    })

                                    }





                                    {/* If we have replies  => */}
                                    {/* <div className='ms-5'>
                                            <div>
                                                <span style={{ fontSize: '1.3rem' }}> User@user.com</span>
                                                <span className='ms-2' style={{ fontSize: '0.8rem', color: 'rgb(0,0,0, 0.6)' }}>2 days ago</span>
                                            </div>
                                            <p style={{ fontSize: '1rem' }}>Lorem LoremLoremLorem Lorem Lorem Lorem LoremLoremLorem Lorem LoremLorem LoremLoremLorem Lorem LoremLorem LoremLoremLorem Lorem Lorem</p>
                                        </div>
                                        <div className='ms-5'>
                                            <div>
                                                <span style={{ fontSize: '1.3rem' }}> User@user.com</span>
                                                <span className='ms-2' style={{ fontSize: '0.8rem', color: 'rgb(0,0,0, 0.6)' }}>2 days ago</span>
                                            </div>
                                            <p style={{ fontSize: '1rem' }}>Lorem LoremLoremLorem Lorem Lorem Lorem LoremLoremLorem Lorem LoremLorem LoremLoremLorem Lorem LoremLorem LoremLoremLorem Lorem Lorem</p>
                                        </div> */}




                                </div>
                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>}
        </div>
    );
}

export default CustomerRequests;