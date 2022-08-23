import * as React from 'react';
 import { useEffect , useState } from 'react';

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

 import Typography from '@mui/material/Typography';
 import Modal from '@mui/material/Modal';



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




 // function createData(name, calories, fat, carbs, protein) {
 //   return { name, calories, fat, carbs, protein };
 // }

 // const rows = [
 //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
 //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
 //   createData('Eclair', 262, 16.0, 24, 6.0),
 //   createData('Cupcake', 305, 3.7, 67, 4.3),
 //   createData('Gingerbread', 356, 16.0, 49, 3.9),
 // ];


 function WarehouseRequests() {

    const [currentWarehouseView, setCurrentWarehouseView] = React.useState();


     const [open, setOpen] = React.useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);

      const [openView, setOpenView] = React.useState(false);
     const handleOpenView = () => setOpenView(true);
     const handleCloseView = () => setOpenView(false);


     const HandleAcceptReject = (WAREHOUSEID,STATUS) =>{
         acceptRejectWarehouseRequest({
             warehouseId:WAREHOUSEID,
             status:STATUS
         }).then(result => {
             console.log(result)
         })
         let array2 = pendingRequests
         for (let i=0 ; i < array2.length ; i++){
             let currentWarehouses = pendingRequests[i].warehouses
             currentWarehouses = currentWarehouses.filter((warehouse) =>{

                 return warehouse[0]._id != WAREHOUSEID
             })
             array2[i].warehouses = currentWarehouses
         }
         setPendingRequests([...array2])
         // let currentRequests = pendingRequests.filter((request) =>{
         //     return request.warehouse[0]._id !=WAREHOUSEID


         // })
         // setPendingRequests([...currentRequests])
     }

     const [pendingRequests, setPendingRequests ] = useState([])

     useEffect(() =>{
         getAllWarehousesPending().then(result => {
             console.log(result.data)
             //hon kermel bas yeemal set la yalle 3endon warehouses cuz some bekuno fadyeen
             let array= result.data.filter((item)=>{
                 return item.warehouses.length > 0
             })
             console.log(array)
             setPendingRequests(array)


         }).catch((error) => {
             console.log(error)
         })

     },[])






   return (
     <div> 
         <Grid container spacing={2} sx={{ m: 2 }}>
         <Grid item xs={2}></Grid>
     <Grid item xs={8}>
         <TableContainer component={Paper}>

       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell style={{fontWeight: '600' }}>WarehouseName</TableCell>
             <TableCell style={{fontWeight: '600' }} align="center">Provider</TableCell>
             <TableCell style={{fontWeight: '600' }} align="center">Actions</TableCell>

           </TableRow>
         </TableHead>
         <TableBody>
         {
             pendingRequests.map((item,i)=>{
                 return   ( item.warehouses.map((warehouse, index) => {
                     console.log(warehouse[0].name)
             return ( <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                     <TableCell align="left">{warehouse[0].name} </TableCell>
                     <TableCell align="center"> {item.warehouseOwner.userName}</TableCell>
                     <TableCell align="center">



                         <Button  style={{margin:2, borderColor:'#54d494' ,color:'#54d494'}} 
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
                                 <Box sx={style}>
                                 <Typography id="modal-modal-title" variant="h6" component="h2">
                                     Contact Information
                                 </Typography>
                                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                     Email: {item.warehouseOwner.email} <br/>
                                     Phone Number: {item.warehouseOwner.phoneNumber}
                                 </Typography>
                                 </Box>
                             </Modal>




                         <Button style={{margin:2, borderColor:'#54d494',color:'#54d494'}} 
                                  variant="outlined" 
                                  onClick={() => {
                                    setCurrentWarehouseView(warehouse[0])
                                    console.log(warehouse[0])
                                    handleOpenView()
                                  }}>
                             View
                         </Button>
                           { currentWarehouseView && <Modal
                                 open={openView}
                                 onClose={handleCloseView}
                                 aria-labelledby="modal-modal-title"
                                 aria-describedby="modal-modal-description"
                             >
                                 <Box sx={style}>
                                 <Typography id="modal-modal-title" variant="h6" component="h2">
                                     WareHouse Details
                                 </Typography>
                                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                     Warehouse Name: {currentWarehouseView.name} <br/>
                                     Price Per Day: {currentWarehouseView.PricePerDay}<br/>
                                     Register Date: {currentWarehouseView.registerDate}<br/>
                                     Space:{currentWarehouseView.space}<br/>
                                     Status:{currentWarehouseView.status}<br/>
                                     Type:{currentWarehouseView.type}<br/>
                                 </Typography>
                                 </Box>
                             </Modal>}

                         <Button style={{margin:2, backgroundColor:'#54d494'}}
                                 variant="contained" 
                                 onClick={() =>{HandleAcceptReject(warehouse[0]._id,'accepted')}}>
                             Accept 
                         </Button>
                         <Button style={{margin:2, backgroundColor:'red'}}  
                                 variant="contained"
                                 onClick={() =>{HandleAcceptReject(warehouse[0]._id,'rejected')}}>
                             Reject
                         </Button>
                     </TableCell>
                 </TableRow>
                 )
                 }) 
                 )             



             })
         }











           {/* {rows.map((row) => (
             <TableRow
               key={row.name}
               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                 {row.name}
               </TableCell>
               <TableCell align="right">{row.calories} </TableCell>
               <TableCell align="right"><Button  style={{margin:'10px', borderColor:'#54d494' ,color:'#54d494'}}variant="outlined">Outlined</Button>
               <Button style={{margin:'10px', borderColor:'#54d494',color:'#54d494'}} variant="outlined">Outlined</Button>
                <Button style={{margin:'10px', backgroundColor:'#54d494'}}  variant="contained">Contained</Button>
                <Button style={{margin:'10px', backgroundColor:'red'}}  variant="contained">Contained</Button>
               </TableCell>
              
             </TableRow>
           ))} */}
         </TableBody>
       </Table>
     </TableContainer></Grid></Grid></div>
   )

 }

 export default WarehouseRequests