import * as React from 'react';
import { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { useLocation, useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ui from '../../../themes'
import { getCurrentCustomerInfo } from "../../../Services/getCurrentCustomerInfo"
import css from '../../../index.css'

const columns = [
  { id: 'warehouseName', label: 'Warehouse Name', minWidth: 170 },
  { id: 'userName', label: 'Customer Name', minWidth: 100 },
  {
    id: 'prices',
    label: 'Profit',
    minWidth: 170,
    align: 'center',

  },
  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    align: 'center',

  },


];

function createData(warehouseName, userName, price, startRentDate, endRentDate) {
  const date = ` ${startRentDate.replaceAll('/', '-')} => ${endRentDate.replaceAll('/', '-')} `;
  const prices = `$ ${price}`
  return { warehouseName, userName, prices, date };
}




function WarehouseOwnerDetails() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sum, setSum] = useState(0);
  const data = useLocation();
  const [userinfo, setUserinfo] = useState(data.state)
  const [requests, setRequests] = useState([]);

  useEffect(() => {

    getCurrentCustomerInfo(userinfo.email).then(result => {
      if(result.data == 'forbidden'){navigate('/')}
      setRequests(result.data)

      let x = 0;

      let arr = result.data.map((item, i) => {
        x += parseInt(item.price)
        return (
          createData(item.warehouseName,
            item.userName,
            item.price,
            item.startRentDate,
            item.endRentDate,

          )
        )
      })
      setRows([...arr])
      setSum(x)
    }).catch((err) => {
      if(err.response.data == 'forbidden'){navigate('/')} 
    })
  }, []);


  return (

    <div>

      <svg onClick={() => {navigate(-1)}} style={{ marginLeft: '5%', marginTop: '3%', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
      </svg>

      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item xs={2}> </Grid>
        <Grid item xs={8}>
          <p style={{ fontSize: '30px', fontWeight: 'bolder' }}> WarehouseOwner's Name : {userinfo.userName}</p>


          <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{ marginTop: '5%' }}>
            <TableContainer sx={{ maxHeight: 440 }} >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, fontSize: '20px', backgroundColor: `${ui.borders}` }}
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
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ fontSize: '17px'}}
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
          <br></br>

          <p style={{ fontSize: '30px', fontWeight: 'bolder', color: 'gray', marginLeft: '5%' }}>Total Profit:<span className='ms-3' style={{ color: 'black' }}> $ {sum}</span>  </p>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  )
}

export default WarehouseOwnerDetails