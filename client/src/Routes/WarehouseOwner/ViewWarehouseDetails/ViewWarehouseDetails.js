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

        console.log(props)
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