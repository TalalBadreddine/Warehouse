import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ui from '../../themes';

function UserDetails() {
  const navigate = useNavigate()
  const location = useLocation().state;
  const [userInfo, setUserInfo] = useState(location)
  const [printed, setPrinted] = useState([])

  useEffect(() => {
    axios.post('/admin/getUserRequests', location)
      .then((results) => {
        setPrinted(results.data)
      })
  }, [])

  return (
    <div>
      <Grid container spacing={5} sx={{ m: 1 }}>
        <Grid item xs={11}>
          <div>

            <h3 style={{color: `${ui.normalText}`}}>
              {userInfo.userName}
              {userInfo.isActive ? <Button className='ms-3' style={{ color: 'black', backgroundColor: '#83f28f', borderColor: 'black', margin: 5 }}>Active</Button> : <Button style={{ color: 'black', backgroundColor: 'pink', borderColor: 'black', margin: 5 }}>Deactive</Button>}

            </h3>
          </div>
          <TableContainer component={Paper}>
            <Table style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText}` }}  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead style={{backgroundColor:`${ui.borders}` }} >
                <TableRow>
                  <TableCell style={{color:`${ui.normalText}`}}><h6 style={{ fontWeight: 'bold' }}>Warehouse Name</h6></TableCell>
                  <TableCell style={{color:`${ui.normalText}`}} align="right"><h6 style={{ fontWeight: 'bold' }}>Provider</h6></TableCell>
                  <TableCell style={{color:`${ui.normalText}`}} align="right"><h6 style={{ fontWeight: 'bold' }}>Status</h6></TableCell>
                  <TableCell style={{color:`${ui.normalText}`}} align="right"><h6 style={{ fontWeight: 'bold' }}>Date</h6></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  printed.map((item, i) => {
                    return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell style={{color:`${ui.normalText}`}} align="left">{item.warehouseName}</TableCell>
                      <TableCell style={{color:`${ui.normalText}`}} align="right">{item.warehouseOwnerName}</TableCell>
                      <TableCell style={{color:`${ui.normalText}`}} align="right">{item.status}</TableCell>
                      <TableCell style={{color:`${ui.normalText}`}} align="right">{new Date(item.startRentDate).toISOString().slice(0, 10)} - {new Date(item.endRentDate).toISOString().slice(0, 10)}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid></Grid>
    </div>
  )
}

export default UserDetails