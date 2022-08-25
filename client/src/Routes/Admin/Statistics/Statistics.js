import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import {BsPersonCircle} from 'react-icons/bs'

import * as React from 'react';
import { useEffect, useState } from 'react';
import CustomChart from '../../../Components/CustomChart/CustomChart';
import ui from '../../../themes'
import axios from 'axios'

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];



function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}


const columns = [
    { id: 'name', label: 'name', minWidth: 130 },
    { id: 'email', label: 'email', minWidth: 100 },
    {
        id: 'warehouses',
        label: `nothing`,
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];
const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const Statistics = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [allData, setAllData] = useState()

    const [earningGraphType, setEarningGraphType] = useState('doughnut')

    const currentMonth = new Date().getMonth()
    const months = allMonths.slice(0, currentMonth+1)

    const [revenueChartType, setRevenueChartType] = useState('Line')
    const [revenueData, setRevenueData] = useState(new Array(12))


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const showDateRange = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeEarningGrapthType = (type) => {
        setEarningGraphType(type)
    }
    useEffect(() => {

        axios.get('/admin/getAllStatistics').then((results) => {
            let data = results.data

            // @ [type, [arr], arr Of 11 for months]
            let arrOfAllObjects = Object.keys(data).map((key) => {
                let arr = new Array(11)

                for (let i = 0; i < arr.length; i++) {
                    arr[i] = []
                }
          
                if(key == 'owners'){
                    console.log(data[key])
                    data[key] = data[key].sort((a,b) => {
                        return a.myWarehouses - b.myWarehouses
                    })
                }

                return ([key, data[key], arr, 0])
            })

            let currentYear = new Date().getFullYear()

            for (let i = 0; i < arrOfAllObjects.length; i++) {

                let currentObject = arrOfAllObjects[i]
                let arrOfIncome = new Array(12)

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

            for(let j = 0 ; j < arrOfRequests.length ; j++){
                   let sum = 0

                for(let k = 0 ; k < arrOfRequests[j].length ;k++){
            
                    if(arrOfRequests[j][k].status == 'accepted'){
                        sum += parseInt(arrOfRequests[j][k].price * 0.05)
                    }
                }
                    arrOfIncomes[j] = sum
                }
                // console.log(arrOfIncomes)
                setRevenueData(arrOfIncomes)


                console.log(arrOfAllObjects)
            setAllData(arrOfAllObjects)

        })

    }, [])


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    if (allData == null || allData == undefined) {
        return (
            <div>

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

                <div className='col-7 rounded py-2 px-4' style={{ border: `1px solid ${ui.borders}`, height:'80%', backgroundColor: ` ${ui.lightBg}` }} >
                        <p style={{color: ` ${ui.normalText}`}}> Total Revenue Earned</p>
                        <CustomChart graphType={earningGraphType} graphTitle="" idHelper={`000000`} graphData={revenueData} graphLabels={months} ></CustomChart>
                        <div className='d-flex justify-content-between mt-4 col-7'>
                            <p style={{ border:`1px solid ${ui.borders}`, background: earningGraphType == 'line' ? `${ui.bigTitleSecondaryColor}` : '#ffffff' , borderRadius:'44%'}} className='px-3 py-1' onClick={() =>{changeEarningGrapthType('line')}}>Line</p>

                            <p style={{ border:`1px solid ${ui.borders}`, background: earningGraphType == 'bar' ? `${ui.bigTitleSecondaryColor}` : '#ffffff' , borderRadius:'44%'}} className='px-3 py-1' onClick={() =>{changeEarningGrapthType('bar')}}>Bar</p>

                            <p style={{ border:`1px solid ${ui.borders}`, background: earningGraphType == 'doughnut' ? `${ui.bigTitleSecondaryColor}` : '#ffffff' , borderRadius:'44%'}} className='px-3 py-1' onClick={() =>{changeEarningGrapthType('doughnut')}}>doughnut</p>

                            <p style={{ border:`1px solid ${ui.borders}`, background: earningGraphType == 'polarArea' ? `${ui.bigTitleSecondaryColor}` : '#ffffff' , borderRadius:'44%'}} className='px-3 py-1' onClick={() =>{changeEarningGrapthType('polarArea')}}>Polar</p>

                            <p style={{ border:`1px solid ${ui.borders}`, background: earningGraphType == 'radar' ? `${ui.bigTitleSecondaryColor}` : '#ffffff' , borderRadius:'44%'}} className='px-3 py-1' onClick={() =>{changeEarningGrapthType('radar')}}>Radar</p>

                        </div>
                </div>

                <div className='col-4 rounded px-2 py-1'  style={{ border: `1px solid ${ui.borders}`, backgroundColor: ` ${ui.lightBg}` } }>

                    <div  className='text-center mt-2'>
                        <h5 style={{color:`${ui.normalText}`}} >Most warehouse owners with rented warehouses</h5>
                        <div className='col-12'>
                            <hr style={{color: `${ui.normalText}`}}></hr>
                        </div>
                    </div>

                    <div className='mt-4' style={{ height:'400px', overflowY:'scroll'}}>
                        {allData[1][1].map((owner) => {
                            return(
                                <div className='d-flex justify-content-between col-10 m-auto'>
                                    <p className='col-2 d-flex justify-content-center' style={{color:'white'}}><BsPersonCircle size={35}></BsPersonCircle></p>
                                    <p className='col-5' style={{color: `${ui.normalText}`}}>{owner.email}</p>
                                    <p className='col-4' style={{color: `${ui.normalText}`}}>{owner.myWarehouses.length} warehouse</p>
                                </div>
                            )
                        })}
                    </div>

                </div>

                <div>
                    
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

{/* <div className='col-7'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }} >
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table" className='rounded'>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];
                                                    return (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {column.format && typeof value === 'number'
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                </div> */}
export default Statistics