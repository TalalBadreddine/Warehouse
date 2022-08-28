import { useLocation } from "react-router"
import { Modal } from "react-bootstrap"
import { Button } from 'react-bootstrap'
import { useState } from "react"
import { Carousel } from 'react-bootstrap'

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ui from '../../../themes'
import axios from "axios"
import { useRef } from "react"
import {BiUserCircle} from 'react-icons/bi'
import styles from './ViewWarehouseDetailsCss.module.css'
import { AiFillCaretDown } from 'react-icons/ai'
import { BsFillReplyAllFill } from 'react-icons/bs'


function createData(
    customerEmail,
    profit,
    startRentDate,
    endRentDate
) {
    return { customerEmail, profit, startRentDate, endRentDate };
}


const ViewWarehouseDetails = (props) => {
    let rows = []
    let conflicetedRequestRow = []
    const [currentWarehouseData, setCurrentWarehouseData] = useState( props.data ? props.data.warehouseInfo[0] : null)

    const textAreaRef = useRef()
    const replyBtnRef = useRef([])
    const replyInputRef = useRef([])
    console.log(props)
    const [viewAllReply, setViewAllReply] = useState( props.data != 'undefined'   ? new Array(props.data.warehouseInfo[0].feedback.length).fill(0) : null)

    const handleComment = async () => {

        let content = textAreaRef.current.value
        if (content == '') {
            alert('empty Comment Will not be added')
            return
        }

        await axios.post('/userActivity', {
            action: `add a feedback to  ${currentWarehouseData.name} warehouse, the comment content: ${content}`,
            role: 'owner'
        }).then((results) => {
        })

        let currentComment
        await axios.post('/warehouseOwner/addComment', { content, warehouseId: currentWarehouseData._id }).then((results) => {
            currentComment = results.data

        })

        textAreaRef.current.value = ''
        let warehouse = currentWarehouseData
        warehouse.feedback.push([currentComment])
        setCurrentWarehouseData({ ...currentWarehouseData, ['feedback']: warehouse.feedback })

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

        axios.post('/admin/addReply', {

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



    if (props && props.data && props.data.oldRequests) {

        let arr = props.data.oldRequests.map((request) => {
            return createData(request.userEmail, request.price, new Date(request.startRentDate).toISOString().slice(0, 10), new Date(request.endRentDate).toISOString().slice(0, 10))
        })
        rows = arr

        let helperArr = props.data.conflictedWarehouse.map((request) => {
            return createData(request.userEmail, request.price, new Date(request.startRentDate).toISOString().slice(0, 10), new Date(request.endRentDate).toISOString().slice(0, 10))
        })

        conflicetedRequestRow = helperArr
    }

    if (props != null && props != undefined) {
        let warehouseDetails = props.data.warehouseInfo[0]
        let thisRequest = props.data.thisRequest

        return (
            <Modal
                
                show={props.showState}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{backgroundColor:`${ui.backgroundColor}`, color:`${ui.normalText}` , borderColor: `${ui.borders}`}}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {warehouseDetails.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='p-0' style={{ height: '600px', overflowY: 'scroll',backgroundColor:`${ui.backgroundColor}`, color:`${ui.normalText}` , borderColor: `${ui.borders}` }}>

                    <div className='col-12'>
                        <Carousel>
                            {warehouseDetails.images.length > 0 && warehouseDetails.images.map((base64, index) => {

                                return (
                                    <Carousel.Item>

                                        <img
                                            className='w-100'
                                            key={index}
                                            src={base64}
                                            alt="slide"
                                            height={'300px'}

                                        />

                                    </Carousel.Item>
                                )

                            })

                            }
                        </Carousel>
                        <div className='p-3' >

                            <div >
                                <h2 style={{color:`${ui.bigTitleSecondaryColor}`}}>Details</h2>
                                <div className='mt-3 d-flex justify-content-between'>
                                    <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Address:</span>   <span>{warehouseDetails.address[0].join(' , ')}</span> </span>
                                    <span className='fs-5 mx-5'> <span style={{ fontWeight: 'bold' }}>Rent date: </span>   <span>{new Date(thisRequest.startRentDate).toISOString().slice(0, 10) } => {new Date(thisRequest.endRentDate).toISOString().slice(0, 10)  }</span> </span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Price per Day:</span>   <span>${warehouseDetails.pricePerDay}</span> </span>
                                </div>

                                <div className='mt-3'>
                                    <span className='fs-5'> <span style={{ fontWeight: 'bold' }}>Space:</span>   <span>{warehouseDetails.space} </span>m<sup>2</sup>  </span>
                                </div>

                                <div className='col-11 m-auto mt-4'>
                                    <hr></hr>
                                </div>

                            </div>

                            {props.data.oldRequests.length > 0 && <div className='mt-5'>

                                <div>

                                    <h2 style={{color:`${ui.bigTitleSecondaryColor}`}}>Old Customers</h2>

                                    <div>

                                        {rows && <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead  style={{backgroundColor:`${ui.borders}`}}>
                                                    <TableRow>
                                                        <TableCell style={{color:`${ui.normalText}`}}>User Email</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">Profit</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">Start rent date</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">End rent date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody  style={{backgroundColor:`${ui.lightBg}`}}>
                                                    {rows.map((row) => (
                                                        <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell style={{color:`${ui.normalText}`}} component="th" scope="row">
                                                                {row.customerEmail}
                                                            </TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">${row.profit}</TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">{row.startRentDate}</TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">{row.endRentDate}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>}



                                    </div>

                                </div>

                            </div>}

                           { props.data.conflictedWarehouse.length > 0 && <div className='mt-5'>

                                <div>

                                    <h2 style={{color:`${ui.bigTitleSecondaryColor}`}}>Conflicted Requests</h2>

                                    <div>

                                        {conflicetedRequestRow && <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead style={{backgroundColor:`${ui.borders}`}}>
                                                    <TableRow>
                                                        <TableCell style={{color:`${ui.normalText}`}}>User Email</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">Profit</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">Start rent date</TableCell>
                                                        <TableCell style={{color:`${ui.normalText}`}} align="right">End rent date</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody style={{backgroundColor:`${ui.lightBg}`}}>

                                                <TableRow
                                                        key={thisRequest.name}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        style={{background: '#d3d3d3'}}
                                                    >
                                                        <TableCell component="th" scope="row" style={{fontWeight:'bold'}} >
                                                            {thisRequest.userEmail}
                                                        </TableCell>
                                                        <TableCell align="right" style={{fontWeight:'bold',color:`${ui.normalText}`}} >${thisRequest.price}</TableCell>
                                                        <TableCell align="right" style={{fontWeight:'bold',color:`${ui.normalText}`}} >{new Date(thisRequest.startRentDate).toISOString().slice(0, 10) }</TableCell>
                                                        <TableCell align="right" style={{fontWeight:'bold',color:`${ui.normalText}`}} >{new Date(thisRequest.endRentDate).toISOString().slice(0, 10)}</TableCell>
                                                    </TableRow>

                                                    {conflicetedRequestRow.map((conflicetedRequestRow) => (
                                                        <TableRow
                                                            key={conflicetedRequestRow.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >
                                                            <TableCell style={{color:`${ui.normalText}`}} component="th" scope="row">
                                                                {conflicetedRequestRow.customerEmail}
                                                            </TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">${conflicetedRequestRow.profit}</TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">{conflicetedRequestRow.startRentDate}</TableCell>
                                                            <TableCell style={{color:`${ui.normalText}`}} align="right">{conflicetedRequestRow.endRentDate}</TableCell>
                                                        </TableRow>
                                                    ))}

                                                </TableBody>
                                            </Table>
                                        </TableContainer>}



                                    </div>

                                </div>

                            </div>}

                        <div>
                            <h2 style={{color:`${ui.bigTitleSecondaryColor}`}} className='mt-3'>Feedback</h2>
                            <div>



                            <div className='col-11 m-auto mt-3'>
                                
                            <div>
                                <textarea ref={textAreaRef} className='col-12 rounded ps-2 pr-1' style={{ height: '100px', color: `${ui.normalText}`, backgroundColor: `${ui.backgroundColor}`, border: `solid 2px ${ui.borders}` }} placeholder={'Feedback...'}></textarea>
                                <div className='d-flex justify-content-end'>
                                    <Button className='col-2' onClick={() => { handleComment() }}>Comment</Button>
                                </div>

                            </div>


                            <div className='mt-3' style={{height: warehouseDetails.feedback.length > 0 ? '400px' : '0px', overflowY: 'scroll' }}>

                                <div className='ms-4'>

                                    {currentWarehouseData.feedback.map((commentArr, helperIndex) => {

                                        return (
                                            commentArr.map((comment, index) => {

                                                if (index == 0) {
                                                    return (
                                                        <div className='mt-4'>
                                                            <div>
                                                                <span style={{ fontSize: '1rem' }}><BiUserCircle size={37}></BiUserCircle> <span style={{ color: commentArr[index].comentorEmail == thisRequest.warehouseOwnerEmail ? 'green' : 'white' }}>{commentArr[index].comentorEmail}</span> {thisRequest.warehouseOwnerEmail == commentArr[index].comentorEmail && <span style={{ fontSize: '0.8rem' }}>(warehouse owner)</span>}</span>
                                                                <span className='ms-3' style={{ fontSize: '0.8rem', color: `${ui.xsTexts}` }}>{calculateDaysDifference(new Date(), commentArr[index].addedIn) > 0 ? `${calculateDaysDifference(new Date(), commentArr[index].addedIn)} day ago ` : 'Today'} </span>
                                                            </div>
                                                            <div className='col-12 ps-1 m-auto'>
                                                                <p style={{ marginLeft:'10%',color:`${ui.borders}`,fontWeight:'bolder',fontSize: '1rem' }}>{commentArr[index].content}</p>

                                                                <div className='d-flex'>

                                                                    {commentArr.length > 1 && <p className='ms-1' style={{ fontSize: '1rem', color: 'rgb(0,0,0, 0.6)' }} className={styles.returnBtn} onClick={() => {
                                                                        let arr = viewAllReply
                                                                        arr[helperIndex] = arr[helperIndex] == 0 ? 10000 : 0
                                                                        setViewAllReply([...arr])

                                                                    }}><AiFillCaretDown></AiFillCaretDown> View replies</p>}
                                                                     <p style={{ fontSize: '1rem', color: `black`, float:'right' }} className={commentArr.length > 1 ? `ms-5 ${styles.returnBtn}` : `ms-2 ${styles.returnBtn}`} onClick={(e) => {
                                                                        let arr = viewAllReply
                                                                        console.log(viewAllReply)
                                                                        arr[helperIndex] = 10000
                                                                        setViewAllReply([...arr])
                                                                        handleReplyBtn(helperIndex)

                                                                    }} ><BsFillReplyAllFill></BsFillReplyAllFill> REPLY</p>
                                                                </div>
                                                                {index == commentArr.length - 1 &&
                                                                    <div className='d-none' ref={el => replyBtnRef.current[helperIndex] = el}>
                                                                        <div className='d-flex'>
                                                                            <textarea type='text' className='border rounded col-9' style={{color: `${ui.normalText}`, backgroundColor: `${ui.backgroundColor}`, border: `solid 2px ${ui.borders}`}} ref={(el) => { replyInputRef.current[helperIndex] = el }}></textarea>
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
                                                                    <span style={{ fontSize: '1.3rem' }}> <BiUserCircle size={37}></BiUserCircle> <span style={{ color: commentArr[index].comentorEmail == thisRequest.warehouseOwnerEmail ? 'green' : 'black' }}> {commentArr[index].comentorEmail}</span> {thisRequest.warehouseOwnerEmail == commentArr[index].comentorEmail && <span style={{ fontSize: '0.8rem' }}>(warehouse owner)</span>} </span>
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
                        </div>

                        </div>
             

                    </div>

                </Modal.Body>
                <Modal.Footer style={{backgroundColor:`${ui.backgroundColor}`, color:`${ui.normalText}` , borderColor: `${ui.borders}`}}>
                    <Button style={{backgroundColor:`${ui.Buttons}`}} onClick={() => { props.hideAction() }}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }


}

export default ViewWarehouseDetails

const calculateDaysDifference = (firstDate, secondDate) => {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
}