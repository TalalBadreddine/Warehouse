import * as React from 'react';
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';

import { getAllWarehouseOwners } from "../../../services/getAllWarehouseOwners"
import { deleteWarehouseOwnerByAdmin } from "../../../services/deleteWarehouseOwnerByAdmin"
import AddWarehouseOwner from '../../../Components/AddWarehouseOwner/AddWarehouseOwner';

const columns = [
    { id: 'userName', label: 'Warehouse Owner', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 100 },

    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center',
        format: (value) => value.toLocaleString('en-US'),
    },

];

function createData(userName, email, action) {
    return { userName, email, action };
}




function ManageUsers() {
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleLogs = (info) => {
        navigate('/admin/WarehouseOwnerDetails', { state: info })
    }
    const [searchedWarehouseOwner, setSearchedWarehouseOwner] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();


    //get all users axios req and the definition of the data
    const [requests, setRequests] = useState([]);

    const handleDeleteWarehouseOwner = (email) => {
        deleteWarehouseOwnerByAdmin(email)
        let arr2 = requests.filter((warehouseOwner) => {
            return warehouseOwner.email != email
        })
        setRequests(arr2)
    }

    const handleAddRow = (item) => {
        
        if (item === 'Warehouse Owner already exists') {
            alert('Warehouse Owner already exists')
           
        }
        console.log(item)
        setRequests([...requests, item.message])
    }

    useEffect(() => {
        if (query == "") {
            setSearchedWarehouseOwner(requests)


        }
        // console.log(requests)
        let arr3 = requests.filter((warehouseOwner) => {
            // console.log(warehouseOwner);
            // console.log(query);

            return warehouseOwner.userName.includes(query)
        })
        setSearchedWarehouseOwner(arr3)
    }, [query])

    useEffect(() => {
        setSearchedWarehouseOwner(requests)
    }, [requests])

    useEffect(() => {

        let arr = searchedWarehouseOwner.map((item, i) => {

            return (

                createData(item.userName,
                    item.email,
                    <>
                        <Button style={{ color: 'white', backgroundColor: '#54d494', margin: 5, boxShadow: '3px 3px 6px green' }} onClick={() => { handleLogs(item) }}
                            variant="Contained"
                            size="medium">
                            CheckLog
                        </Button>
                        <Button className="ms-4" style={{ color: 'white', backgroundColor: 'red', borderColor: 'red', margin: 5, boxShadow: '3px 3px 6px #792727' }}
                            onClick={() => { handleDeleteWarehouseOwner(item.email) }}
                            variant="outlined"
                            size="medium">
                            Delete
                        </Button>
                    </>,
                )
            )
        })
        setRows([...arr])
    }, [searchedWarehouseOwner])

    // useEffect(() => {
    //     getAllWarehouseOwners().then(result => {
    //         setRequests(result.data)
          
    //         let arr = result.data.map((item, i) => {
               
    //             return (
    //                 createData(item.userName,
    //                     item.email,
                        
    //                 )
    //             )
    //         })
    //         setRows([...arr])
    //         console.log(result.data)

    //     })
    // }, []);
    useEffect(()=>{ 
        getAllWarehouseOwners().then(result => {        
          setRequests(result.data)   
          setSearchedWarehouseOwner(result.data) 

          console.log(result.data)

        }).catch((err) => { 
        if(err.response.data == 'forbidden'){navigate('/')} 
        }) 
        },[]);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



    return (
        <div>
            <Grid container spacing={2} sx={{ m: 2 }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <TextField style={{ width: '40%' }} sx={{ m: 1 }} id="outlined-basic" label="Search for a Warehouse Owner..." variant="outlined" size='small' onChange={(e) => setQuery(e.target.value)} />
                    <Button
                        style={{ backgroundColor: 'gray', borderColor: '#54d494', float: 'right', boxShadow: '3px 3px 6px black' }}
                        startIcon={<AddIcon />} sx={{ m: 1 }}
                        onClick={handleShow}
                        variant="contained"
                        size="medium">
                        Create
                    </Button>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{ marginTop: '5%' }}>
                        <TableContainer sx={{ maxHeight: 500 }} >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, fontSize: '20px', backgroundColor: 'lightgrey' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows && rows
                                        .slice()
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell
                                                                key={column.id}
                                                                align={column.align}
                                                                style={{ fontSize: '17px' }}
                                                            >
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

                    </Paper>
                </Grid>
                <Grid item xs={2}></Grid>
            </Grid>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a Warehouse Owner</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <AddWarehouseOwner addAction={handleAddRow} closeAction={() => { handleClose() }} />
                </Modal.Body>


            </Modal>
        </div>
    )
}

export default ManageUsers;