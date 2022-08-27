import * as React from 'react';
import { useState , useEffect }  from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';

import { getAllCustomer } from '../../../Services/getAllUsers';
import AddUser from '../../../Components/AddUser/AddUser';
import { deleteCustomer } from '../../../Services/DeleteUserByAdmin';
import { activeDeactiveCustomer } from '../../../Services/activeDeactiveCustomer';
import { useNavigate } from 'react-router-dom';

const columns = [
  { id: 'userName', label: 'Username', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  {
    id: 'accountStatus',
    label: 'Account Status',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  
];

function createData(userName, email, accountStatus, action) {
  return { userName, email, accountStatus, action };
}




function ManageUsers() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [query , setQuery] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [searchedUsers, setSearchedUsers] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteCustomer = (email) => {
    deleteCustomer(email)
    let arr2 = allUsers.filter((user)=>{
        return user.email != email
    })
    setAllUsers(arr2)
  }

  const handleAddRow = (item) => {
    if(item === 'User already exists'){
      alert('User already exists')
      return 
    }
    setAllUsers([...allUsers,item])
  }

  const handleStatus = ( userId, status) => {
    activeDeactiveCustomer(userId, !status).then((result)=> {
      let status = result.data
      let arr4 = allUsers

      for(let i=0 ; i < arr4.length ; i++){
        if(arr4[i]._id == userId){
          arr4[i].isActive = status
        }
      }
      setAllUsers([...arr4])
      
    })
  }

  const handleUserHistory = (item) => {
    navigate('/admin/userDetails' , {state: item})
  }
  

  useEffect(()=>{
    if(query==""){
      setSearchedUsers(allUsers)
      return
    }
    let arr3 = allUsers.filter((user)=>{
      return user.email.toLowerCase().includes(query.toLowerCase())
    })
    setSearchedUsers(arr3)
  },[query])

  useEffect(()=>{
    setSearchedUsers(allUsers)
  },[allUsers])

  useEffect(()=>{
    if(searchedUsers == null || searchedUsers.length == 0)return

            let arr = searchedUsers.map((item ,i)=>{
            return (
                createData( item.userName , 
                            item.email , 
                            <Button onClick={()=>handleStatus(item._id ,item.isActive)} style={{borderColor: item.isActive ? 'green' : 'red',color: item.isActive ? 'green' : 'red'}}variant="outlined" >{item.isActive ? 'Active' : 'Deactive'}</Button>,
                            <>
                            <Button style={{color:'white', backgroundColor:'green', borderColor:'red' , margin: 5}}
                            onClick={()=>handleUserHistory(item)}
                                    variant="Contained" 
                                    size="medium">
                            User History
                            </Button> 
                            <Button style={{color:'white', backgroundColor:'red', borderColor:'red' , margin: 5}} 
                                    onClick={()=> {handleDeleteCustomer(item.email)}}
                                    variant="outlined" 
                                    size="medium">
                            Delete
                            </Button>
                            </>,
          
            )
            )
        })
        setRows([...arr])
  },[searchedUsers])

  //get all users axios req and the definition of the data
    
    useEffect(()=>{
        getAllCustomer().then(result => {
          if(result.data == 'forbidden'){
            navigate('/')
          }
        setAllUsers(result.data)
        setSearchedUsers(result.data)
  
    }).catch((err) => {
      if(err.response.data == 'forbidden'){navigate('/')}
  })
    },[]);

    //for the modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  

  return (

    <div>
    <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={2}></Grid>
    <Grid item xs={8}>
        <TextField onChange={(e) => setQuery(e.target.value)} style= {{width: '40%'}} sx={{m: 1}} id="outlined-basic" label="Search..." variant="outlined" size='small' />
            <Button 
                onClick={handleShow}
                style = {{backgroundColor: '#54d494', borderColor:'#54d494' , float: 'right'}} 
                startIcon={<AddIcon/>}sx={{m: 1}} 
                variant="contained" 
                size="medium">
                Create User
            </Button>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {rows && rows
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
          <Modal.Title>Add a new user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddUser addAction={handleAddRow} closeAction={()=>{handleClose()}}/>
        </Modal.Body>

        
      </Modal>




    </div>
  )
}

export default ManageUsers