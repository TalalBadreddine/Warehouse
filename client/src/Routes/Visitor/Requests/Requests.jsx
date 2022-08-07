import React,  {useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
// import Contact from '../Contact/Contact';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

function StripedRowExample() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    
   
    return (
        
        <Container>
            
            <br></br><br></br><br></br><br></br>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
            </svg>
            
            <Table striped style={{ width: '70vw', marginLeft: '10%', marginTop: '5%' }}>
                <thead>
                    <tr>
                        <th>Warehouse Name</th>
                        <th>Provider</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Maya Khatib</td>
                        <td>Homer Homer Homer</td>
                        <td style={{ color: 'green' }}>Accepted</td>
                        <td className="d-flex justify-content-between"><a style={{ color: 'darkblue' }}   onClick={()=>{handleShow()}} href="#">Contact</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >View</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >Feedback</a></td>
                    </tr>

                    <tr>
                        <td>Maya Khatib</td>
                        <td>Homer Homer Homer</td>
                        <td style={{ color: 'red' }}>Rejected</td>
                        <td className="d-flex justify-content-between"><a style={{ color: 'darkblue' }} href="#"  onClick={handleShow}>Contact</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >View</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >Feedback</a></td>
                    </tr>

                    <tr>
                        <td>Maya Khatib</td>
                        <td>Homer Homer Homer</td>
                        <td className="fst-italic" style={{ color: 'purple' }}>Pending..</td>
                        <td className="d-flex justify-content-between"><a style={{ color: 'darkblue' }} href="#" >Contact</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >View</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >Feedback</a></td>
                    </tr>

                    <tr>
                        <td>Maya Khatib</td>
                        <td>Homer Homer Homer</td>
                        <td style={{ color: 'red' }}>Rejected</td>
                        <td className="d-flex justify-content-between"><a style={{ color: 'darkblue' }} href="#" >Contact</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >View</a> <span> </span>
                            <a style={{ color: 'darkblue' }} href="#" >Feedback</a></td>
                    </tr>

                </tbody>
            </Table>


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
                    backgroundImage: `url("https://media.istockphoto.com/photos/-picture-id1311934969?k=20&m=1311934969&s=170667a&w=0&h=alVkYjpg1dDocXGfs_7PlZ-fcWpuxFQ5SmTtFIfuJBQ=")`, backgroundRepeat: 'no-repeat', width: 'auto', height: '300px', color: 'white', borderRadius: '8px', boxShadow: '8px 8px 9px black'
                }} >

                    <Button variant="secondary" onClick={handleClose} style={{borderRadius: '6px', border: 'none', backgroundColor:'lightgray', width:'45px', height:'40px', boxShadow:'1px 1px 9px white'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" color="black" width="25" height="25" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                    </Button>
                    <br></br>
                    <div style={{ marginTop: '10%' }}>
                        <button style={{borderRadius: '6px', border: 'none', backgroundColor:'lightgray', boxShadow:'1px 1px 9px white'}}>Email: Admin@gmail.com</button> <br></br> <br></br>
                        <button style={{borderRadius: '6px', border: 'none', backgroundColor:'lightgray',boxShadow:'1px 1px 9px white'}}>Phone Number : +961 70123456 </button><br></br> <br></br>
                        <button style={{borderRadius: '6px', border: 'none', backgroundColor:'lightgray',boxShadow:'1px 1px 9px white'}}>Location : Beirut, Lebanon</button>
                    </div>
                </Modal.Body>


            </Modal>
        </Container>
    );
}

export default StripedRowExample;