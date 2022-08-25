import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import { getRequest } from '../../../Services/getWarehouseRequests';
import mytable from './tablestyle.module.css';
import { acceptDeclineRequest } from '../../../Services/acceptDeclineRequest';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap'
import { Accordion } from 'react-bootstrap'
import ViewWarehouseDetails from '../ViewWarehouseDetails/ViewWarehouseDetails'
import axios from 'axios';
import ui from '../../../themes'


  //TODO: SOMTIMES DATE is not availble (it will be returned from the back end ) but not in the front end

function ManageRequests() {

  const navigate = useNavigate()

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [currentRequestDetails, setCurrentRequestDetails] = useState()

  const handleCloseDetailsModal = () => setShowDetailsModal(false)
  const handleShowDetailsModal = () => setShowDetailsModal(false)

  const [currentWarehouse, setCurrentWarehouse] = useState()

  const [modalContent, setModalContent] = useState({
    arrOfWarehouses: [],
    acceptRequest: false
  })

  const sendRequest = async (ID, STATUS, WAREHOUSEID, STARTRENTDATE, ENDRENTDATE, userEmail) => {

    acceptDeclineRequest({
      requestId: ID,
      status: STATUS,
      warehouseId: WAREHOUSEID,
      requestedDate: STARTRENTDATE

    }).then(result => {
    })

    await axios.post('/userActivity', {
      action: `${STATUS} renting warehouse for ${userEmail} from ${new Date(STARTRENTDATE).toISOString().slice(0, 10)} To: ${new Date(ENDRENTDATE).toISOString().slice(0, 10)}`,
      role: 'warehouseOwner'
    }).then((results) => {
    })



    let currentrequest = requests.filter((request) => {
      return request._id != ID
    })
    setRequests([...currentrequest])
    setModalContent({ ...modalContent, ['acceptRequest']: false })

  }

  const HandleAccept = (ID, STATUS, WAREHOUSEID, STARTRENTDATE, ENDRENTDATE, userEmail) => {

    if (STATUS == 'rejected') {

      sendRequest(ID, STATUS, WAREHOUSEID, STARTRENTDATE, ENDRENTDATE, userEmail)

    } else {


      let endRentDate = new Date(ENDRENTDATE).getTime()
      let startRentDate = new Date(STARTRENTDATE).getTime()
  
      let requestForThisWarehouse = requests.filter((request) => {
  
        let currentRequestStartDate = new Date(request.startRentDate).getTime()
        let currentRequestEndDate = new Date(request.endRentDate).getTime()
  
        if(ID == request._id)return false
        
        return currentRequestStartDate < endRentDate && startRentDate < currentRequestEndDate
      })


      // let endRentDate = new Date(ENDRENTDATE).getTime()

      // let requestForThisWarehouse = requests.filter((request) => {
      //   let currentRequestStartDate = new Date(request.startRentDate).getTime()
      //   return request.WarehouseId == WAREHOUSEID && currentRequestStartDate < endRentDate && ID != request._id
      // })

      setModalContent({ ...modalContent, ['arrOfWarehouses']: requestForThisWarehouse })

      if (requestForThisWarehouse.length == 0) {

        sendRequest(ID, STATUS, WAREHOUSEID, STARTRENTDATE, ENDRENTDATE, userEmail)

      } else {

        handleShow()
      }

    }

  }




  const [requests, setRequests] = useState([])


  useEffect(() => {
    getRequest().then(result => {

      setRequests(result.data)
    }).catch((err) => {
      if (err.response.data == 'forbidden') { navigate('/') }
    })

    // getRequest(warehouseOwner)
    // .then(response => response.json())
    // .then(records() => {
    // })

  }, []);

  const handleAccpetBtn = async () => {
    let arrConflicted = modalContent.arrOfWarehouses
    let filteredRequests = requests

    for (let i = 0; i < arrConflicted.length; i++) {
      let currentRequest = arrConflicted[i]

      filteredRequests = filteredRequests.filter((request) => {
        return request._id != currentRequest._id
      })
      await acceptDeclineRequest({
        requestId: currentRequest._id,
        status: 'rejected',
        warehouseId: currentRequest.WarehouseId,
        requestedDate: currentRequest.startRentDate

      }).then( async (result) => {

        await axios.post('/userActivity', {
          action: `Rejected renting warehouse for ${currentRequest.userEmail} from ${new Date(currentRequest.startRentDate).toISOString().slice(0, 10)} To: ${new Date(currentRequest.endRentDate).toISOString().slice(0, 10)}`,
          role: 'warehouseOwner'
        }).then((results) => {
          console.log(results.data)
        })

      })


    }
    await acceptDeclineRequest({
      requestId: currentWarehouse._id,
      status: 'accepted',
      warehouseId: currentWarehouse.WarehouseId,
      requestedDate: currentWarehouse.startRentDate

    }).then( async (result) => {

      await axios.post('/userActivity', {
        action: `Accepted renting warehouse for ${currentWarehouse.userEmail} from ${new Date(currentWarehouse.startRentDate).toISOString().slice(0, 10)} To: ${new Date(currentWarehouse.endRentDate).toISOString().slice(0, 10)}`,
        role: 'warehouseOwner'
      }).then((results) => {
      })

    })

    filteredRequests = filteredRequests.filter((request) => {
      return request._id != currentWarehouse._id
    })

    setRequests([...filteredRequests])

    handleClose()

  }

  const handleViewDetails = (requestData) => {
    let warehouseId = requestData.WarehouseId

    let endRentDate = new Date(requestData.endRentDate).getTime()
    let startRentDate = new Date(requestData.startRentDate).getTime()

    let requestForThisWarehouse = requests.filter((request) => {

      let currentRequestStartDate = new Date(request.startRentDate).getTime()
      let currentRequestEndDate = new Date(request.endRentDate).getTime()

      if(request.WarehouseId != warehouseId)return false
      if(requestData._id == request._id)return false

      return currentRequestStartDate < endRentDate && startRentDate < currentRequestEndDate
    })

    axios.post('/warehouseOwner/getWarehouseDetails', { warehouseId }).then((results) => {

      setCurrentRequestDetails({
        oldRequests: results.data.oldRequests,
        warehouseInfo: results.data.warehouseInfo,
        conflictedWarehouse: requestForThisWarehouse,
        thisRequest: requestData
      })

    }).catch((err) => {
      alert(err.message)
    })

    setShowDetailsModal(true)
  }

  //for the search functionality
  const [query, setQuery] = useState("")

  return (
    <>

      <Row className="justify-content-center m-5 p-2" style={{ textAlign: 'center' }}>


        <div className={mytable.mytablecontainer} striped border hover>




          <Table style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText}` }} className={mytable.mytableone} striped bordered hover >

            <thead style={{backgroundColor:`${ui.borders}` }} className={mytable.tablehaed}>
              <tr>

                <th>Costumer Email</th>
                <th>Space Name</th>
                <th>
                  Action
                </th>

              </tr>
            </thead>
            <tbody>

              {currentWarehouse && <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title><h3 style={{ color: 'red' }}>Attention !</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5 style={{ fontWeight: 'meduim', letterSpacing: '1px' }}>The current request have conflict with {modalContent.arrOfWarehouses.length} other warehouses By accepting the request, you will be by default declining other requests.</h5>

                  <Accordion className="mt-4 mb-4">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Current Customer</Accordion.Header>
                      <Accordion.Body>
                        <div className='d-flex justify-content-between' style={{ fontSize: '0.9rem' }}>
                          <p>Rentor: {currentWarehouse.userEmail.split('@')[0]}</p>
                          <p>From: {new Date(currentWarehouse.startRentDate).toISOString().slice(0, 10)}</p>
                          <p>To: {new Date(currentWarehouse.endRentDate).toISOString().slice(0, 10)}</p>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Other Customers</Accordion.Header>
                      <Accordion.Body>
                        {modalContent.arrOfWarehouses.length != 0 && modalContent.arrOfWarehouses.map((warehouse) => {
                          console.log(warehouse)
                          return (
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <p>Rentor: {warehouse.userEmail.split('@')[0]}</p>
                              <p>From: {new Date(warehouse.startRentDate).toISOString().slice(0, 10)}</p>
                              <p>To: {new Date(warehouse.endRentDate).toISOString().slice(0, 10)}</p>
                              <hr></hr>
                            </div>
                          )
                        })}

                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => { handleAccpetBtn() }}>
                    Accept
                  </Button>
                </Modal.Footer>
              </Modal>}

              {
                requests.filter(item => item.warehouseName.toLowerCase().includes(query)).map((item, i) => {
                  // if(item.status === 'pending'){
                  return <tr key={i}>
                    <td  style={{color:`${ui.normalText}`}}>{item.userEmail}</td>
                    <td  style={{color:`${ui.normalText}`}}>{item.warehouseName}</td>


                    {showDetailsModal && currentRequestDetails && <ViewWarehouseDetails data={currentRequestDetails} showState={showDetailsModal} showAction={() => { setShowDetailsModal(true) }} hideAction={() => { setShowDetailsModal(false) }} ></ViewWarehouseDetails>}

                    <td>
                      <Button className="m-1" variant="success" style={{ backgroundColor: `${ui.Buttons}`, borderColor: `${ui.normalText}` }}
                        onClick={() => {
                          HandleAccept(item._id, 'accepted', item.WarehouseId, item.startRentDate, item.endRentDate, item.userEmail)
                          setCurrentWarehouse(item)
                        }}>Accept</Button>{' '}

                      <Button className="m-1" variant="danger" style={{ backgroundColor: "#ff0000", borderColor: `${ui.normalText}` }}
                        onClick={() => {
                          HandleAccept(item._id, 'rejected', item.WarehouseId, item.startRentDate, item.endRentDate, item.userEmail)
                          setCurrentWarehouse(item)
                        }}>Decline</Button>{' '}

                      <Button className="m-1" variant="light"  style={{backgroundColor:`${ui.lightBg}` , color:`${ui.normalText}` , borderColor:`${ui.normalText}`}} onClick={() => { handleViewDetails(item) }}>View Details</Button>{' '}
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