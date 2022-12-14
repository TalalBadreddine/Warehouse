import * as React from 'react';
import { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { getAllWarehousesPending } from '../../../Services/GetWarehousesPending';
import { acceptRejectWarehouseRequest } from '../../../Services/acceptRejectWarehouseRequest';
import Box from '@mui/material/Box';
import ui from '../../../themes';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import ContactMailIcon from '@mui/icons-material/ContactMail';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function WarehouseRequests() {
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const HandleAcceptReject = (WAREHOUSEID, STATUS) => {
    acceptRejectWarehouseRequest({
      warehouseId: WAREHOUSEID,
      status: STATUS
    }).then(result => {
    })
    let array2 = pendingRequests
    for (let i = 0; i < array2.length; i++) {
      let currentWarehouses = pendingRequests[i].warehouses
      currentWarehouses = currentWarehouses.filter((warehouse) => {

        return warehouse[0]._id != WAREHOUSEID
      })
      array2[i].warehouses = currentWarehouses
    }
    setPendingRequests([...array2])
  }

  const [pendingRequests, setPendingRequests] = useState([])

  useEffect(() => {
    getAllWarehousesPending().then(result => {
      if(result.data == 'forbidden'){
        navigate('/')
      }
      
      let array = result.data.filter((item) => {
        return item.warehouses.length > 0
      })

      setPendingRequests(array)


    }).catch((error) => {
      if(error.response.data == 'forbidden'){
        navigate('/')
      }
    })

  }, [])

  return (
    <div>
      <Grid container spacing={5} sx={{ m: 1 }}>
        <Grid item xs={11}>
          <TableContainer component={Paper}>

            <Table style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText} `}}  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{backgroundColor:`${ui.borders}` }}>
                <TableRow>
                  <TableCell style={{ fontWeight: '600',color:`${ui.normalText}` }}>WarehouseName</TableCell>
                  <TableCell style={{ fontWeight: '600',color:`${ui.normalText}` }} align="center">Provider</TableCell>
                  <TableCell style={{ fontWeight: '600',color:`${ui.normalText}` }} align="center">Actions</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {
                  pendingRequests.map((item, i) => {
                    return (item.warehouses.map((warehouse, index) => {
                      return (<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell style={{ fontWeight: '300',color:`${ui.normalText}` }} align="left">{warehouse[0].name} </TableCell>
                        <TableCell style={{ fontWeight: '300',color:`${ui.normalText}` }} align="center"> {item.warehouseOwner.userName}</TableCell>
                        <TableCell style={{ fontWeight: '300',color:`${ui.normalText}` }} align="center">

                          <Button style={{ margin: 5, borderColor: `${ui.normalText}`, color: `${ui.backgroundColor}`,color:`${ui.normalText}` }}
                            variant="outlined"
                            onClick={handleOpen}
                          >
                            Contact
                          </Button>

                          <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            
                          >
                            <Box sx={style} style={{backgroundColor:`${ui.lightBg}` , color:`${ui.normalText}`}}>
                              <div display='flex' justifyContent='center' align='left'>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                               <ContactMailIcon style={{fontSize:'300%'}} /> Contact Information
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                               <p > Email: {item.warehouseOwner.email} </p>
                               <p> Phone Number: {item.warehouseOwner.phoneNumber}</p>
                              </Typography></div>
                            </Box>
                          </Modal>

                          <Button style={{ margin: 5, borderColor: `${ui.normalText}`, color: `${ui.backgroundColor}`,color:`${ui.normalText}` }} variant="outlined">
                            View
                          </Button>
                          <Button style={{ margin: 5, borderColor: `${ui.normalText}`, backgroundColor: 'green',color:`${ui.normalText}` }}
                            variant="contained"
                            onClick={() => { HandleAcceptReject(warehouse[0]._id, 'accepted') }}>
                            Accept
                          </Button>
                          <Button style={{ margin: 5, borderColor: `${ui.normalText}`, backgroundColor: 'red',color:`${ui.normalText}` }}
                            variant="contained"
                            onClick={() => { HandleAcceptReject(warehouse[0]._id, 'rejected') }}>
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                      )
                    })
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer></Grid></Grid></div>
  )

}

export default WarehouseRequests
