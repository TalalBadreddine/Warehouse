import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import { BiUserCircle } from 'react-icons/bi'
import ui from '../../../themes'
import { useNavigate } from 'react-router-dom';

// logged in icon
import loginIcon from './../../../Assets/loggedIn.svg'

// logged out
import logoutIcon from './../../../Assets/loggedOut.svg'

// rent
import rentIcon from './../../../Assets/rent.svg'

// accept
import acceptedIcon from './../../../Assets/accept.svg'

// reject
import rejectIcon from './../../../Assets/reject.svg'

// search
import {FcSearch} from 'react-icons/fc'

// feeddback
import feedback from '../../../Assets/feedback.svg'


import DatePicker from "react-datepicker";

import { useEffect, useState } from 'react';
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css";


function createData(email, userName, registerDate, id) {
    return { email, userName, registerDate, id };
}

const formatDate = (date) => {
    const currentDate = new Date(date)
    const isoDate = `${new Date(currentDate).toISOString()}`.split('T')
    const YYYYMMDD = isoDate[0]
    const HHMMSS = isoDate[1].slice(0, isoDate[1].length - 5)

    return (
    <div>
        <p>{convertMilitaryTimeToStandard(HHMMSS)}</p>
        <p>{YYYYMMDD}</p>
        </div>
        )

}

const getIcon = (content) => {
    let line = content.toLowerCase()
    console.log(line)
    if(line.includes('logged in')){
        return(<img src={loginIcon} width='40px' height='40px'></img>)
    }

    if(line.includes('logged out')){
        return(<img src={logoutIcon} width='40px' height='40px'></img>)
    }

    if(line.includes('search')){
        return(<FcSearch size={40}></FcSearch>)
    }

    if(line.includes('accepted')){
        return(<img src={acceptedIcon} width='40px' height='40px'></img>)
    }

    if(line.includes('rejected')){
        return(<img src={rejectIcon} width='40px' height='40px'></img>)
    }

    if(line.includes('feedback')){
        return(<img src={feedback} width='40px' height='40px'></img>)
    }

    if(line.includes('rent')){
        return(<img src={rentIcon} width='40px' height='40px'></img>)
    }
}

const convertMilitaryTimeToStandard = (time) => {

    time = time.split(':');

    var hours = Number(time[0]);
    var minutes = Number(time[1]);
    var seconds = Number(time[2]);

    var timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue = "" + hours;
    } else if (hours > 12) {
        timeValue = "" + (hours - 12);
    } else if (hours == 0) {
        timeValue = "12";
    }

    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;
    timeValue += (hours >= 12) ? " PM" : " AM";

    return timeValue
}


const isDateInRange = (date, range) => {

    let currentDate = new Date(date).getTime()
    let startRangeDate = new Date(range[0]).getTime()
    let endRangeDate = new Date(range[1]).getTime()

    return currentDate <= endRangeDate && currentDate >= startRangeDate
}


const UserActivity = () => {
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState()
    const [customers, setCustomers] = useState()
    const [warehouseOwners, setWarehouseOwners] = useState()
    const [usersTableRows, setUsersTableRows] = useState(null)
    const [usersTableRole, setUsersTableRole] = useState()


    const [allLogs, setAllLogs] = useState()
    const [customersLogs, setCustomersLogs] = useState()
    const [warehouseOwnersLogs, setWarehouseOwnersLogs] = useState()

    const [currentLogs, setCurrentLogs] = useState()
    const [currentUser, setCurrentUser] = useState()

    const [searchValue, setSearchValue] = useState()

    const [dateError, setDateError] = useState(null)

    const [selectedDate, setSelectedDate] = useState({
        startDate: new Date(),
        endDate: new Date()
    })

    useEffect(() => {

        const getData = async () => {

            axios.get('/admin/getAllCustomerAndOwnersAndLogs').then((results) => {
                if(results.data == 'forbidden'){navigate('/')}
                let data = results.data

                setAllUsers([...data.customers, ...data.warehouseOwners])
                setCustomers(data.customers)
                setWarehouseOwners(data.warehouseOwners)

                let logs = data.logs
                let fetchedCustomersLogs = []
                let fetchedWarehouseOwnersLogs = []

                for (let i = 0; i < logs.length; i++) {
                    logs[i].role == 'customer' ? fetchedCustomersLogs.push(logs[i]) : fetchedWarehouseOwnersLogs.push(logs[i])
                }

                setCustomersLogs(fetchedCustomersLogs)
                setWarehouseOwnersLogs(fetchedWarehouseOwnersLogs)
                setAllLogs(logs)

            }).catch((err) => {
                if(err.response.data == 'forbidden'){navigate('/')}
            })

        }

        getData()

    }, [])

    useEffect(() => {
        const changeUsersInTable = async () => {
            let usersArr = []
            let logs = []
            if (allUsers == null) return

            if(new Date(selectedDate.startDate).getTime() > new Date(selectedDate.endDate).getTime()){
                setDateError('The start Date is grater than the end Date !!')
            }

            if (usersTableRole == null || usersTableRole == 'all') {
                usersArr = allUsers
                logs = allLogs

            } else if (usersTableRole == 'customer') {
                usersArr = customers
                logs = customersLogs

            } else {
                usersArr = warehouseOwners
                logs = warehouseOwnersLogs

            }

            if(searchValue != '' && searchValue != null && searchValue != undefined){
                usersArr = usersArr.filter((user) => {
                    return user.email.toLowerCase().includes(searchValue.toLowerCase())
                })
            }

            let row = usersArr.map((user) => {
                return createData(user.email, user.userName, user.registrationDate ? new Date(user.registrationDate).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10), user._id)
            })

            logs = logs.filter((log) => {
                return isDateInRange(log.date, [selectedDate.startDate, selectedDate.endDate])
            })

            logs = logs.sort((a, b) => {
                let dateA = new Date(a.date).getTime()
                let dateB = new Date(b.date).getTime()

                return dateA - dateB
            })

            setUsersTableRows([...row])
            setCurrentLogs(logs)
        }

        changeUsersInTable()


    }, [usersTableRole, allUsers, selectedDate, searchValue])

    const getCurrentUserLogs = (user) => {
        let type = usersTableRole
        let targetId = user.id
        let currentUserLogs = []

        if (type == 'all' || type == undefined) {
            currentUserLogs = allLogs.filter((log) => {
                return log.userId == targetId
            })

        } else if (type == 'customer') {

            currentUserLogs = customersLogs.filter((log) => {
                return log.userId == targetId
            })

        } else {

            currentUserLogs = warehouseOwnersLogs.filter((log) => {
                return log.userId == targetId
            })

        }
        console.log(currentUserLogs)
        setCurrentUser(user)
        setCurrentLogs(currentUserLogs)
    }


    return (
        <div className='m-auto col-11 mt-5 '>
            <div className='d-flex col-7 mb-2  justify-content-between'>

                <div className='col-4 d-flex'>

                    <input style={{'height':'42px', marginTop:'auto'}} className="rounded border py-1 px-2 col-12 " placeholder='Search' onChange={(e) => {setSearchValue(e.target.value)}} value={searchValue} ></input>

                </div>

                <div className='col-3 ms-5'>
                    <FormControl  fullWidth>
                        <InputLabel style={{color:`${ui.normalText}`}} id="demo-simple-select-label">Type</InputLabel>
                        <Select style={{color:`${ui.normalText}`}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={usersTableRole}
                            label="Age"
                            onChange={(e) => { setUsersTableRole(e.target.value) }}
                        >
                            <MenuItem value={'all'}>All Users</MenuItem>
                            <MenuItem value={'customer'}>Customer</MenuItem>
                            <MenuItem value={'warehouseOwner'}>Warehouse Owner</MenuItem>
                        </Select>
                    </FormControl>
                </div>

            </div>

            <div className='d-flex'>

                <div className='col-7'>

                    {usersTableRows && <TableContainer component={Paper} >
                        <Table  style={{backgroundColor:`${ui.lightBg} `, borderColor:`${ui.borders}`, color:`${ui.normalText} `}}  sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead style={{backgroundColor:`${ui.borders}` }}>
                                <TableRow>
                                    <TableCell style={{color:`${ui.normalText}`}}>user name</TableCell>
                                    <TableCell style={{color:`${ui.normalText}`}} align="center">email</TableCell>
                                    <TableCell style={{color:`${ui.normalText}`}} align="center">register date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usersTableRows.map((row, index) => (
                                    <TableRow onClick={() => { getCurrentUserLogs(row) }}
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell style={{color:`${ui.normalText}`}} component="th" scope="row" >
                                            {row.userName}
                                        </TableCell>
                                        <TableCell style={{color:`${ui.normalText}`}} align="center">{row.email}</TableCell>
                                        <TableCell style={{color:`${ui.normalText}`}} align="center">{row.registerDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>}
                </div>

                <div className='col-5 ps-5'>

                    <div className='border rounded' >

                        {currentUser &&

                            <div className='p-3'>
                                <span style={{color:`${ui.normalText}`}}> <h4><span><BiUserCircle size={35}></BiUserCircle> </span>user: {currentUser.userName}</h4></span>

                                <div className='mt-3 d-flex'>

                                    <div className='col-6 d-flex'>
                                        <span className='d-flex col-2' style={{color:`${ui.normalText}`}} >From</span>
                                        <DatePicker
                                            selected={selectedDate.startDate}
                                            onSelect={(e) => setSelectedDate({ ...selectedDate, ['startDate']: e })} 
                                            onChange={() => setDateError(null)}
                                            className='rounded border col-8 ms-3 px-2'
                                        />

                                    </div>




                                    <div className='col-6 d-flex'>
                                        <span className='ms-2 dd-flex col-2' style={{color:`${ui.normalText}`}}>Till</span>
                                        <DatePicker
                                            selected={selectedDate.endDate}
                                            onSelect={(e) => setSelectedDate({ ...selectedDate, ['endDate']: e })} //when day is clicked
                                            onChange={() => setDateError(null)}
                                            className='rounded border col-8 px-2'
                                        />

                                    </div>
                                </div>
                                {dateError && <p style={{color:'red'}}>{dateError}</p>}
                                {/* <hr style={{ opacity: '.2' }}></hr> */}
                            </div>

                        }




                        {currentLogs ?

                            <div className='mt-3' style={{ height: '300px', display: 'block', overflowY: 'auto' }}>
                                {currentLogs.map((log) => {
                                    return (
                                        <div>

                                            <div className='ps-3 d-flex mb-0'>

                                                <div className='col-2'>
                                                    {getIcon(log.action)}
                                                </div>

                                                <div className='col-7'>
                                                    <p  style={{color:`${ui.normalText}`}}>{log.action}</p>
                                                </div>

                                                <div className='col-3' style={{ fontSize: '0.8rem' }}>
                                                    <p style={{color: 'white'}}>{formatDate(log.date)}</p>
                                                </div>

                                            </div>

                                            <div className='col-10 mx-auto ' style={{ marginTop: '-5px' }}>
                                                <hr  style={{color:`${ui.normalText}`}}></hr>
                                            </div>

                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className='p-4 fs-3'>
                                <p  style={{color:`${ui.normalText}`}}>NO LOGS </p>
                            </div>
                        }

                    </div>

                </div>

            </div>

        </div >
    )
}
export default UserActivity