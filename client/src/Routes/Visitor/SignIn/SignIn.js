import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SignUpWarehouse from '../../../Components/SignUpWarehouseOwner/SignUpWarehouseOwner'
import SignUpUser from '../../../Components/SignUpUser/SignUpUser';
import LoginWarehouseOwner from '../../../Components/LoginWarehouseOwner/LoginWarehouseOwner';
import LoginCustomer from '../../../Components/LoginCustomer/LoginCustomer';
import ui from '../../../themes'

function SignIn() {

  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isOwner, setIsOwner] = useState(true);

  const [isLoginOwner, setIsLoginOwner] = useState(true);

  const handleOwner = () => setIsOwner(true);
  const handleCustomer = () => setIsOwner(false);
  const handleClose = () => setShow(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShow = () => setShow(true);
  const handleLoginOwner = () => setIsLoginOwner(true)
  const handleLoginCustomer = () => setIsLoginOwner(false)

  function openAndLoginOwner() {
    setShowLogin(true)
    handleLoginOwner(true)
  }

  function openAndLoginCustomer() {
    setShowLogin(true)
    handleLoginCustomer(true)
  }

  function openAndOwner() {
    setShow(true)
    handleOwner(true)

  }
  function openAndCustomer() {
    setShow(true)
    handleCustomer(true)

  }


  return (
    <div>


      <Container >


        <Row className='mt-5'>

          <Col className='mt-5'> 
          <Card style={{ width: '21rem', outline: 'none', height: '415px', boxShadow: '1px 2px 9px #027fff', backgroundColor: ` ${ui.lightBg}`, borderColor: ` ${ui.borders}` }}>
            <Card.Body >
              <Card.Title style={{ color: ` ${ui.normalText}`}}>Rent a space</Card.Title>
              <br></br>
              <br></br>
              <Card.Text style={{color:`${ui.normalText}`}} >
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <br></br>
              <Button onClick={function (event) { openAndLoginCustomer() }} style={{ backgroundColor: ` ${ui.Buttons} `, borderColor: ` ${ui.borders}` }} variant="secondary">Login</Button>
              <br></br>
              <br></br>
             <span style={{color:`${ui.normalText}`}} > Don't have an account?</span><Card.Link onClick={function (event) { openAndCustomer() }} style={{ color: ` ${ui.Buttons}` }}> <span style={{ color: ` ${ui.Buttons}`}}>Sign-up </span></Card.Link>
            </Card.Body>
            <Modal 
              show={show}
              onHide={handleClose}
              backdrop="static"
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              keyboard={false}
            >
              <Modal.Header  style={{backgroundColor:`${ui.lightBg}` , }} closeButton>
                <Modal.Title  style={{color:`${ui.normalText}` , }}>Register</Modal.Title>
              </Modal.Header>

              <Modal.Body  style={{backgroundColor:`${ui.lightBg}` , }}>
                {/* {isCustomer && <SignUpUser/>} */}
                {/* <SignUpWarehouse/> */}
                {isOwner ? <SignUpWarehouse /> : <SignUpUser />}
              </Modal.Body>


            </Modal>
            <Modal style={{borderColor:`${ui.borders}`}}
           
              show={showLogin}
              onHide={handleCloseLogin}
              backdrop="static"
              size="md"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              keyboard={false}
            >
              <Modal.Header style={{backgroundColor:`${ui.lightBg}`, borderColor:`${ui.borders}` , color:`${ui.normalText}` }}  closeButton>
                <Modal.Title style={{color:`${ui.normalText}`}}>Login</Modal.Title>
              </Modal.Header>

              <Modal.Body style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`}}>
                {/* {isCustomer && <SignUpUser/>} */}
                {/* <SignUpWarehouse/> */}
                {isLoginOwner ? <LoginWarehouseOwner /> : <LoginCustomer />}

              </Modal.Body>


            </Modal>
          </Card></Col>
          <Col className='mt-5'><Card style={{ width: '21rem', height: '415px', boxShadow: '1px 2px 9px #027fff', backgroundColor: ` ${ui.lightBg}`, borderColor: ` ${ui.borders}` }}>
            <Card.Body>
              <Card.Title style={{color:`${ui.normalText}`}} >List a space </Card.Title>
              <br></br>
              <br></br>
              <Card.Text style={{color:`${ui.normalText}`}} >
                Some quick example text to build on the card title and make up the
                bulk of the card's content.
              </Card.Text>
              <br></br>
              <Button onClick={function (event) { openAndLoginOwner() }} style={{ backgroundColor: '#027fff', borderColor: '#027fff' }} variant="secondary">Login</Button>
              <br></br>
              <br></br>
              <span style={{color:`${ui.normalText}`}} >Don't have an account?</span><Card.Link style={{ color: '#027fff', borderColor: '#027fff' }} onClick={function (event) { openAndOwner() }}> Sign-up</Card.Link>
            </Card.Body>
          </Card></Col>
          <Col > <Card.Img src={require("../../../Assets/Checking boxes-bro.png")} alt="Card image" style={{ width: '500px' }} /></Col>
        </Row>

      </Container>

    </div>
  )
}

export default SignIn