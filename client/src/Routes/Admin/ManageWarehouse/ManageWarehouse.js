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
import AddWarehouse from '../../../Components/AddWarehouse/AddWarehouse';

import { getAllWarehousesAdmin } from '../../../Services/getAllWarehouses';
import { deleteWarehouseByAdmin } from '../../../Services/DeleteWarehouseByAdmin';
import { useNavigate } from 'react-router-dom';


const Warehousecolumns = [
    { id: 'warehouseName', label: 'Warehouse Name', minWidth: 170 },
  { id: 'warehouseSpace', label: 'Warehouse Space', minWidth: 100 },
  {
    id: 'warehouseType',
    label: 'Warehouse Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'dateAvailable',
    label: 'Date Available',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'location',
    label: 'Location',
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

function createWarehouseData(warehouseName, warehouseSpace, warehouseType,dateAvailable, price,location,action) {
  return { warehouseName, warehouseSpace, warehouseType,dateAvailable, price,location,action };
}

function ManageWarehouse() {
    const navigate = useNavigate()
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [query , setQuery] = useState("")
    const [allWarehouses, setAllWarehouses] = useState([])
    const [searchedWarehouses, setSearchedWarehouses] = useState([])

    
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteWarehouse = (warehouseId) => {
    deleteWarehouseByAdmin(warehouseId)
    let arr2 = allWarehouses.filter((warehouse)=>{
        return warehouse._id != warehouseId
    })
    setAllWarehouses(arr2)
  }

  const handleAddRow = (item) => {
    if(item === 'Warehouse already exists'){
      alert('Warehouse already exists')
      return 
    }
    setAllWarehouses([...allWarehouses,item])
  }

  
  

  useEffect(()=>{
    if(query==""){
      setSearchedWarehouses(allWarehouses)
      return
 
    }
console.log(allWarehouses)
    let arr3 = allWarehouses.filter((warehouse)=>{
         console.log(warehouse);
         console.log(query);
         //TODO:lezem hot mahal id name bs yzbato
      return warehouse._id.includes(query)
    })
    setSearchedWarehouses(arr3)
  },[query])

  useEffect(()=>{
    setSearchedWarehouses(allWarehouses)
  },[allWarehouses])

  useEffect(()=>{
         console.log(searchedWarehouses)
            let arr = searchedWarehouses.map((item ,i)=>{ 
                console.log(item.name);
  return (
   
    createWarehouseData( item.name , 
        item.space , 
        item.type,
        item.dateAvailable,
        item.pricePerDay,
        item.address[0],
    
        <>
           
       <Button style={{color:'white', backgroundColor:'red', borderColor:'red' , margin: 5}} 
                onClick={()=> {handleDeleteWarehouse(item._id)}}
                variant="outlined" 
                size="medium">
        Delete
        </Button>
        </>,

) 
)
})
setRows([...arr])
},[searchedWarehouses])

//get all users axios req and the definition of the data

useEffect(()=>{
getAllWarehousesAdmin().then(result => {
  console.log(result.data)
setAllWarehouses(result.data)
setSearchedWarehouses(result.data)

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
Create Warehouse
</Button>
<Paper sx={{ width: '100%', overflow: 'hidden' }}>
<TableContainer sx={{ maxHeight: 440 }}>
<Table stickyHeader aria-label="sticky table">
<TableHead>
<TableRow>
{Warehousecolumns.map((column) => (
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
{Warehousecolumns.map((column) => {
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
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
keyboard={false}
>
<Modal.Header closeButton>
<Modal.Title>Add a new Warehouse</Modal.Title>
</Modal.Header>

<Modal.Body>
<AddWarehouse
 addAction={handleAddRow} closeAction={()=>{handleClose()}}/>
</Modal.Body>


</Modal>




</div>
  )
}
export default ManageWarehouse