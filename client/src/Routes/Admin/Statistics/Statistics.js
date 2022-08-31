import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { BsPersonCircle } from 'react-icons/bs'

import * as React from 'react';
import { useEffect, useState } from 'react';
import CustomChart from '../../../Components/CustomChart/CustomChart';
import ui from '../../../themes'
import axios from 'axios'
import { Carousel } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom';

import Loading from '../../../Components/Loading/Loading'


const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const Statistics = () => {
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null);
    const [allData, setAllData] = useState()

    const [earningGraphType, setEarningGraphType] = useState('doughnut')

    const currentMonth = new Date().getMonth()
    const months = allMonths.slice(0, currentMonth + 1)

    const [revenueChartType, setRevenueChartType] = useState('Line')
    const [revenueData, setRevenueData] = useState(new Array(12))


    const changeEarningGrapthType = (type) => {
        setEarningGraphType(type)
    }
    useEffect(() => {

        axios.get('/admin/getAllStatistics').then((results) => {
            if(results.data == 'forbidden'){navigate('/')}
            let data = results.data
            
            let arrOfAllObjects = Object.keys(data).map((key) => {
                let arr = new Array(11)

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = []
                }

                if (key == 'owners') {
                    data[key] = data[key].sort((a, b) => {
                        return a.myWarehouses - b.myWarehouses
                    })
                }

                if (key == 'customer') {
                    data[key] = data[key].sort((a, b) => {
                        return a.arrOfRequests - b.arrOfRequests
                    })
                }

                if (key == 'warehousesMap') {

                    data[key] = data[key].sort((a, b) => {
                        return Object.values(b)[0].timesRented - Object.values(a)[0].timesRented
                    })

                }

                return ([key, data[key], arr, 0])
            })

            let currentYear = new Date().getFullYear()

            for (let i = 0; i < arrOfAllObjects.length; i++) {
                if (arrOfAllObjects[i][0] == 'warehousesMap') continue

                let currentObject = arrOfAllObjects[i]

                currentObject[1].map((element) => {
                    let year = parseInt(element.registrationDate.split('T')[0].split('-')[0])
                    if (year < currentYear) return
                    currentObject[2][getMonthIndexFromDate(element.registrationDate)].push(element)
                    if (Math.floor((new Date().getTime() - new Date(element.registrationDate).getTime()) / (1000 * 60 * 60 * 24)) < 1) {
                        currentObject[3]++
                    }

                })

            }

            let arrOfRequests = arrOfAllObjects[2][2]
            let arrOfIncomes = new Array(12).fill(0)

            for (let j = 0; j < arrOfRequests.length; j++) {
                let sum = 0

                for (let k = 0; k < arrOfRequests[j].length; k++) {

                    if (arrOfRequests[j][k].status == 'accepted') {
                        sum += parseInt(arrOfRequests[j][k].price * 0.05)
                    }
                }
                arrOfIncomes[j] = sum
            }
            
            setRevenueData(arrOfIncomes)


            
            setAllData(arrOfAllObjects)

        }).catch((err) => {
            if(err.response.data == 'forbidden'){navigate('/')}
        })

    }, [])


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (allData == null || allData == undefined) {
        return (
            <div>
                <Loading></Loading>
            </div>
        )
    }


    return (
        <div className='px-3' >

            {/* @Dashboard */}
            <div>

                {/* @ */}
                <div className='col-12 d-flex justify-content-between m-auto mt-4  '>




                    <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                        <CustomChart graphType={'line'} graphTitle="" idHelper={`${allData[0][0]}`} graphData={allData[0][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                        <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[0][3] > 0 ? `We have ${allData[0][3]} new users  Today ` : 'No new Users'}</p>
                    </div>



                    <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                        <CustomChart graphType={'polarArea'} graphTitle="" idHelper={`${allData[1][0]}`} graphData={allData[1][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                        <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[1][3] > 0 ? `We have ${allData[1][3]} new warehouse owners Today ` : 'No new warehouse owners today '}</p>
                    </div>



                    <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>

                        <CustomChart graphType={'doughnut'} graphTitle="" idHelper={`${allData[2][0]}`} graphData={allData[2][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                        <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[2][3] > 0 ? `We have ${allData[2][3]} new requests to rent a warehouse  Today ` : 'No new requests today'}</p>
                    </div>



                    <div style={{ width: '23%', background: `${ui.lightBg}`, padding: '.2rem 1rem', border: `1px solid ${ui.borders}` }} className='rounded'>
                        <CustomChart graphType={'bar'} graphTitle="" idHelper={`${allData[3][0]}`} graphData={allData[3][2].map((arr) => { return arr.length })} graphLabels={months} ></CustomChart>
                        <p className='mt-4 fs-5 text-center' style={{ color: `${ui.normalText}` }}>{allData[3][3] > 0 ? `We have ${allData[3][3]} new warehouses added Today ` : 'No new warehouses added today'}</p>
                    </div>


                </div>


            </div>

            <div className='col-12 mt-5 d-flex justify-content-between'>

                <div className='col-7 rounded py-2 px-4' style={{ border: `1px solid ${ui.borders}`, height: '80%', backgroundColor: ` ${ui.lightBg}` }} >
                    <p style={{ color: ` ${ui.bigTitleSecondaryColor}` }}> Total Revenue Earned</p>
                    <CustomChart graphType={earningGraphType} graphTitle="" idHelper={`000000`} graphData={revenueData} graphLabels={months} ></CustomChart>
                    <div className='d-flex justify-content-between mt-4 col-7'>
                        <p style={{ border: `1px solid ${ui.borders}`, background: earningGraphType == 'line' ? `${ui.bigTitleSecondaryColor}` : `${ui.backgroundColor}`, borderRadius: '7px', border: `1px solid ${ui.borders}`,color:`${ui.normalText}` }} className='px-3 py-1' onClick={() => { changeEarningGrapthType('line') }}>Line</p>

                        <p style={{ border: `1px solid ${ui.borders}`, background: earningGraphType == 'bar' ? `${ui.bigTitleSecondaryColor}` : `${ui.backgroundColor}`, borderRadius: '7px', border: `1px solid ${ui.borders}`,color:`${ui.normalText}` }} className='px-3 py-1' onClick={() => { changeEarningGrapthType('bar') }}>Bar</p>

                        <p style={{ border: `1px solid ${ui.borders}`, background: earningGraphType == 'doughnut' ? `${ui.bigTitleSecondaryColor}` : `${ui.backgroundColor}`, borderRadius: '7px', border: `1px solid ${ui.borders}`,color:`${ui.normalText}` }} className='px-3 py-1' onClick={() => { changeEarningGrapthType('doughnut') }}>doughnut</p>

                        <p style={{ border: `1px solid ${ui.borders}`, background: earningGraphType == 'polarArea' ? `${ui.bigTitleSecondaryColor}` : `${ui.backgroundColor}`, borderRadius: '7px', border: `1px solid ${ui.borders}`,color:`${ui.normalText}` }} className='px-3 py-1' onClick={() => { changeEarningGrapthType('polarArea') }}>Polar</p>

                        <p style={{ border: `1px solid ${ui.borders}`, background: earningGraphType == 'radar' ? `${ui.bigTitleSecondaryColor}` : `${ui.backgroundColor}`, borderRadius: '7px', border: `1px solid ${ui.borders}`,color:`${ui.normalText}` }} className='px-3 py-1' onClick={() => { changeEarningGrapthType('radar') }}>Radar</p>

                    </div>
                </div>

                <div className='col-4 rounded px-2 py-1' style={{ border: `1px solid ${ui.borders}`, backgroundColor: ` ${ui.lightBg}` }}>

                    <div className='text-center mt-2'>
                        <h4 style={{ color: `${ui.bigTitleSecondaryColor}` }} >Most owner with owned warehouses</h4>
                        <div className='col-12'>
                            <hr style={{ color: `${ui.normalText}` }}></hr>
                        </div>
                    </div>

                    <div className='mt-4' style={{ height: '400px', overflowY: 'scroll' }}>
                        {allData[1][1].map((owner) => {
                            return (
                                <div className='d-flex justify-content-between col-12 m-auto mt-3'>
                                    <p className='col-2 d-flex justify-content-center my-auto' style={{ color: 'white' }}><img src={`${owner.image}`} width='40px' height={'40px'} style={{borderRadius:'100%'}}></img></p>
                                    <p className='col-6 my-auto' style={{ color: `${ui.normalText}`, wordWrap:'break-word' }}>{owner.email}</p>
                                    <p className='col-4 my-auto ms-1' style={{ color: `${ui.normalText}` }}>{owner.myWarehouses.length} warehouse</p>
                                </div>
                            )
                        })}
                    </div>

                </div>

            </div>

            <div className='mt-5'>

                <div className='col-12 rounded px-5 py-2' style={{ backgroundColor: `${ui.lightBg}`, border: `1px solid ${ui.borders}` }}>
                    <div>
                        <h2 style={{ color: `${ui.bigTitleSecondaryColor}` }}>Most Rented Warehouses </h2>
                    </div>

                    <div style={{height:'300px', overflowY:'scroll'}}>
                        {allData[4][1].map((object, index) => {
                            let values = Object.values(object)[0]
                            let warehouse = values.warehouseDetails
                            let timesRented = values.timesRented

                            return (
                                <div>
                                    <div className='d-flex mt-4 justify-content-between' style={{ color: `${ui.normalText}` }}>
                                        <p className='col-2'>
                                            <Carousel style={{ width: '100%', height: '100%' }}>
                                                {warehouse.images.map((base64, index) => {
                                                    return (
                                                        <Carousel.Item>

                                                            <img
                                                                key={index}
                                                                src={base64}
                                                                alt=""
                                                                width={'210px'}
                                                                height={'130px'}
                                                                style={{
                                                                    borderRadius: '10px'
                                                                }}
                                                            />

                                                        </Carousel.Item>
                                                    )
                                                })}

                                            </Carousel>
                                        </p>
                                        <p className='col-2'>Name: {warehouse.name} <br></br> Space: {warehouse.space} m <sup>2</sup> <br></br> Cost Per Day: {warehouse.pricePerDay} $ <br></br>Owner Email: {values.owner}</p>
                                        <p className='col-2'>Address: {`${warehouse.address[0]}, ${warehouse.address[1]} `}</p>
                                        <p className='col-2'>Profit Made For Owner: <span className='fs-5'>{values.profit * 0.95}$</span> <br></br> Profit Made for Admin:<span className='fs-5'> {values.profit * 0.05}$</span> </p>
                                        <p className='col-2'>Description: {warehouse.description}</p>
                                        <p className='col-1'>Times Rented: {timesRented}</p>




                                    </div>
                                    { index != (allData[4][1].length - 1) &&  
                                    <div>
                                        <hr style={{ color: 'white' }}></hr>
                                    </div>}
                                    
                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>

        </div>
    )
}

const getDateDifference = (date1, date2) => {
    let firstDateInSeconds = new Date(date1).getTime()
    let secondDateInSeconds = new Date(date2).getTime()

    return firstDateInSeconds - secondDateInSeconds
}

const getMonthIndexFromDate = (date) => {
    return (parseInt(date.split('T')[0].split('-')[1]) - 1)
}


export default Statistics