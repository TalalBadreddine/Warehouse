import * as React from 'react';
import { useState, useEffect } from 'react'
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
import ui from '../../../themes'


const Warehousecolumns = [
  { id: 'warehouseName', label: 'Warehouse Name', minWidth: 170 ,align:'left'},
  { id: 'warehouseSpace', label: 'Warehouse Space', minWidth: 100 ,align:'center' },
  {
    id: 'warehouseType',
    label: 'Warehouse Type',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },

];

function createWarehouseData(warehouseName, warehouseSpace, warehouseType, dateAvailable, price, location, action) {
  return { warehouseName, warehouseSpace, warehouseType, dateAvailable, price, location, action };
}

function ManageWarehouse() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [query, setQuery] = useState("")
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
    let arr2 = allWarehouses.filter((warehouse) => {
      return warehouse._id != warehouseId
    })
    setAllWarehouses(arr2)
  }

  const handleAddRow = (item) => {
    if (item === 'Warehouse already exists') {
      alert('Warehouse already exists')
      return
    }
    setAllWarehouses([...allWarehouses, item])
  }




  useEffect(() => {
    if (query == "") {
      setSearchedWarehouses(allWarehouses)
      return

    }

    let arr3 = allWarehouses.filter((warehouse) => {

      //TODO:lezem hot mahal id name bs yzbato
      return warehouse.id.includes(query)
    })
    
    setSearchedWarehouses(arr3)
  }, [query])

  useEffect(() => {
    setSearchedWarehouses(allWarehouses)
  }, [allWarehouses])

  useEffect(() => {
    console.log(searchedWarehouses)

    let arr = searchedWarehouses.map((item, i) => {
      return (

        createWarehouseData(item.name,
          item.space,
          item.type,
          item.dateAvailable,
          item.pricePerDay,
          item.address ? item.address[0] : item.address ,

          <>

            <Button style={{ color: 'white', backgroundColor: 'red', borderColor: 'red', margin: 5 }}
              onClick={() => { handleDeleteWarehouse(item._id) }}
              variant="outlined"
              size="medium">
              Delete
            </Button>
          </>,

        )
      )
    })
    setRows([...arr])
  }, [searchedWarehouses])

  //get all users axios req and the definition of the data

  useEffect(() => {
    getAllWarehousesAdmin().then(result => {
      let arr = []
      let data = result.data

      for(let i = 0 ; i < data.length ; i++){

        if(data[i].warehouses.length == 0)continue
        let warehouses = data[i].warehouses
        console.log(warehouses)
        for(let j = 0 ; j < warehouses.length ; j++){
          arr.push(warehouses[j][0])
        }

      }


      setAllWarehouses(arr)
      setSearchedWarehouses(arr)

    }).catch((err) => {
      if (err.response.data == 'forbidden') { navigate('/') }
    })
  }, []);

  //for the modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  return (

    <div>
      <Grid container spacing={5} sx={{ m: 1 }}>
        <Grid item xs={11}>
          <TextField onChange={(e) => setQuery(e.target.value)} style={{ width: '40%' , backgroundColor:`${ui.searchesInput}` , border: 'solid 1px #7890a9', borderRadius:'6px' }} sx={{ m: 1 }} id="outlined-basic" label="Search..." variant="outlined" size='small' />
          <Button
            onClick={handleShow}
            style={{ backgroundColor: `${ui.Buttons}`, float: 'right' }}
            startIcon={<AddIcon />} sx={{ m: 1 }}
            variant="contained"
            size="medium">
            Create Warehouse
          </Button>
          <Paper sx={{ width: '100%', overflow: 'hidden' , borderColor:`${ui.borderColor}`}}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table style={{backgroundColor:`${ui.lightBg}`,borderColor:`${ui.borders}`,color:`${ui.normalText}`}} stickyHeader aria-label="sticky table">
                <TableHead style={{backgroundColor:`${ui.lightBg}`}}>
                  <TableRow >
                    {Warehousecolumns.map((column) => (
                      <TableCell 
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth ,backgroundColor:`${ui.borders}` , borderColor:`${ui.borders}`,color:`${ui.normalText}`}}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody style={{ border:`solid 2px ${ui.borders}`}}>
                  {rows && rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                          {Warehousecolumns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align} style={{color:`${ui.normalText}` , fontColor:'0.89rem'}}>
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
            style={{backgroundColor:`${ui.lightBg}`,borderColor:`${ui.borders}` ,border:`solid 2px ${ui.borders}`,color:`${ui.normalText}`}}
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
        <Modal.Header style={{backgroundColor:`${ui.lightBg}`}} closeButton>
          <Modal.Title style={{color:`${ui.normalText}`}}>Add a new Warehouse</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor:`${ui.lightBg}`,color:`${ui.normalText}`}}>
          <AddWarehouse
            addAction={handleAddRow} closeAction={() => { handleClose() }} />
        </Modal.Body>


      </Modal>




    </div>
  )
}
export default ManageWarehouse