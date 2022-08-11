
import React, { useState, useEffect } from "react"
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { getRequests } from "../../../services/getWarehouseRequests"



function StripedRowExample() {
    
    const [show, setShow] = useState(false);
    
    const handleShow = (ownerDetails) => {
        setShow(true)
        setOwnerDetails({ ...ownerDetails, ['email']: ownerDetails.warehouseOwnerEmail, ['phoneNumber']: ownerDetails.phoneNumber })
    };
    const handleClose = () => setShow(false);
    const [requests, setRequests] = useState([])
    const [warehouseOwner, setwarehouseOwner] = useState({
        email: 'hassan@gmail.com'
    })
    const [ownerDetails, setOwnerDetails] = useState({
        email: 'hassan@gmail.com',
        phoneNumber: '+96170707070'
    })

    useEffect(() => {
        getRequests(warehouseOwner).then(result => {
            setRequests(result.data)
            console.log(result.data)
        })

    }, []);
    const statusColor = (status) => {
        if (status === 'pending') {
            return 'purple'
        }
        if (status === 'accepted') {
            return 'green'
        }
        else {
            return 'red'
        }
    }
  

    return (

        <Container >

            <br></br><br></br><br></br><br></br>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>
            <div className='p-5'>
                <Table striped bordered hover responsive="md" style={{ height: '60vh', width: '80vw', margin:'auto'}}>
                    <thead >
                        <tr>
                            <th>Warehouse Name</th>
                            <th>Provider</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                   
                        {
                            requests.map((item, i) => (
                                <tr key={i}>
                                    <td> {item.warehouseName}</td>
                                    <td>{item.warehouseOwnerName}</td>
                                    <td style={{ color: statusColor(item.status) }}>{item.status}</td>
                                    <td >
                                        <div >
                                            <a style={{ color: 'darkblue' }} onClick={() => { handleShow(item) }} href="#">Contact</a>

                                            <a className="ms-5" style={{ color: 'darkblue' }} href="#" >View</a>

                                            {item.status == 'accepted' &&
                                                <a className="ms-5" style={{ color: 'darkblue' }} href="#" >Feedback</a>}
                                        </div>
                                    </td>
                                </tr>
                            ))}

                    </tbody>
                </Table>
            </div>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}

            >
                <Modal.Body style={{
                    backgroundImage: `url("https://dr-job.net/wp-content/uploads/2021/01/Contact-banner.jpg")`, backgroundRepeat: 'no-repeat', width: 'auto', height: '350px', color: 'white', borderRadius: '8px', boxShadow: '8px 8px 9px black'
                }} >

                    <Button variant="secondary" onClick={handleClose} style={{ borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', width: '45px', height: '40px', boxShadow: '1px 1px 9px white' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" color="black" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Button>
                    <br></br>
                    <div style={{ marginTop: '39%', marginLeft: '5%' }}>
                        <button style={{ marginBottom: '2%', borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', boxShadow: '1px 1px 9px black' }}>Email: {ownerDetails.email}</button> <br></br>
                        <button style={{ marginBottom: '2%', borderRadius: '6px', border: 'none', backgroundColor: 'lightgray', boxShadow: '1px 1px 9px black' }}>Phone Number : {ownerDetails.phoneNumber} </button><br></br>


                    </div>
                </Modal.Body>
                {/* 54D494 */}

            </Modal>
        </Container>
    );
}

export default StripedRowExample;