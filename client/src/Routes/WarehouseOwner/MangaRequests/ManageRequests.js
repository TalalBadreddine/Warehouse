import React, { useState , useEffect }  from 'react'
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import { getRequest } from '../../../Services/getWarehouseRequests';
import mytable from './tablestyle.module.css';
import { acceptDeclineRequest } from '../../../Services/acceptDeclineRequest';





function ManageRequests() {

    // const [acceptingDeclining,setAcceptingDeclining] = useState({
    //         requestId : "" ,
    //         requestStatus : "",
    //         warehouseId : "",
    //         requestedDate : ""
    //     })

    const HandleAccept = (ID,STATUS,WAREHOUSEID,STARTRENTDATE) => {
        console.log(ID)
        console.log(STATUS)
        console.log(WAREHOUSEID)
        console.log(STARTRENTDATE)
        // setAcceptingDeclining({...acceptingDeclining,['requestId']:ID,['requestStatus']:STATUS,['warehouseId']:WAREHOUSEID,['requestedDate']:STARTRENTDATE})

        acceptDeclineRequest({
        requestId: ID,
        status : STATUS,
        warehouseId : WAREHOUSEID,
        requestedDate : STARTRENTDATE

        }).then(result => {
            console.log(result)
        })

        let currentrequest = requests.filter((request)=>{
            return request._id != ID
        })
        setRequests([...currentrequest])

    }
    
    

    const [requests,setRequests] = useState([])

    const [warehouseOwner,setWarehouseOwner] = useState({
        //here we have the logged in warehouseowner
        email:"owner@gmail.com"
    })


    useEffect(()=>{
        getRequest(warehouseOwner).then(result => {
        console.log(result.data)
        // console.log(result.data[0].userEmail)
        setRequests(result.data)
    })

        // getRequest(warehouseOwner)
        // .then(response => response.json())
        // .then(records() => {
        //     console.log(records)
        // })

    },[]);


    //for the search functionality
    const [query , setQuery] = useState("")
    console.log(query)

  return (
    <>
    
    
    <Row className="justify-content-center m-5 p-2"  style={{textAlign:'center'}}>


       <div className={mytable.mytablecontainer} striped border hover>
       
        
   
       
        <Table className={mytable.mytableone} striped bordered hover >
            
      <thead className={mytable.tablehaed}>
        <tr>
          
          <th>Costumer Email</th>
          <th>Space Name</th>
          <th>
            Action
          </th>
   
        </tr>
      </thead>
      <tbody>
        {
            requests.filter(item=>item.warehouseName.toLowerCase().includes(query)).map((item, i)=> {
                // if(item.status === 'pending'){
               return <tr key={i}>
                        <td>{item.userEmail}</td>
                        <td>{item.warehouseName}</td>
                        <td>
                            <Button className="m-1" variant="success" style={{backgroundColor:"#54d494" , borderColor:"#54d494"}} 
                             onClick={() => {HandleAccept(item._id , 'accepted' , item.WarehouseId , item.startRentDate)}}>Accept</Button>{' '}

                            <Button className="m-1" variant="danger" style={{backgroundColor:"#ff0000" , borderColor:"#ff0000"}}
                             onClick={() => {HandleAccept(item._id , 'rejected' , item.WarehouseId , item.startRentDate)}}>Decline</Button>{' '}
                        
                            <Button className="m-1" variant="light" style={{backgroundColor:"#c1c1c1" , borderColor:"#c1c1c1"}}>View Details</Button>{' '}
                        </td>
                        </tr>
                // }
            })
        }
       
      </tbody>
    </Table>

    </div>
    </Row>
    </>
  )
}

export default ManageRequests