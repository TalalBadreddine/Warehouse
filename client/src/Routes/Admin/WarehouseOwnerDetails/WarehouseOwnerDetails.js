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
import ui from '../../../themes'
import { getCurrentCustomerInfo } from "../../../Services/getCurrentCustomerInfo"


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
    })
  }, []);


  return (

    <div>

      <Grid container spacing={5} sx={{ m: 1 }}>
        <Grid item xs={11}>
          <p style={{ fontSize: '30px', fontWeight: 'bolder', color:`${ui.bigTitleSecondaryColor}` }}> WarehouseOwner's Name : {userinfo.userName}</p>


          <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{ marginTop: '5%' }}>
            <TableContainer sx={{ maxHeight: 440 }} >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth, color:`${ui.normalText}`, fontSize: '20px', backgroundColor: `${ui.borders}` }}
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
                                style={{ fontSize: '17px', color:'white', backgroundColor: `${ui.backgroundColor}`, borderBottom:'solid 1px white' }}
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

          <p style={{ fontSize: '30px', fontWeight: 'bolder', color: `${ui.borders}`, marginLeft: '5%' }}>Total Profit:<span className='ms-3' style={{ color: 'white' }}> $ {sum}</span>  </p>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  )
}

export default WarehouseOwnerDetails