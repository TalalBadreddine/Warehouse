import React,  {useState} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SignUpWarehouse from '../../../Components/SignUpWarehouse/SignUpWarehouse'
import SignUpUser from '../../../Components/SignUpUser/SignUpUser';

function SignIn() {

    //   const [isCustomer,setIsCustomer] = useState(props.isCustomer)

  const [show, setShow] = useState(false);
  const  [isOwner, setIsOwner] = useState(true);
 
  const handleOwner = () => setIsOwner(true);
  const handleCustomer = () => setIsOwner(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function openAndOwner(){
    setShow(true)
    handleOwner(true)
    
}
function openAndCustomer(){
    setShow(true)
    handleCustomer(true)
    
}


  return (
    <div>
{/* Navbar */}


<Container >


      <Row className='mt-5'>
        
        <Col className='mt-5'> <Card style={{ width: '21rem' , outline:'none', height:'415px',boxShadow:'1px 2px 9px #54d494'  }}>
      <Card.Body >
        <Card.Title>Rent a space</Card.Title>
        <br></br>
        <br></br>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <br></br>
        <Button style={{backgroundColor:'#54d494',borderColor:'#54d494'}} variant="secondary">Login</Button>
        <br></br>
        <br></br>
        Don't have an account?<Card.Link onClick={function(event){openAndCustomer()}} style={{color:'#54d494',borderColor:'#54d494'}} > Sign-up</Card.Link>
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
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         {/* {isCustomer && <SignUpUser/>} */}
         {/* <SignUpWarehouse/> */}
          {isOwner ? <SignUpWarehouse/> : <SignUpUser/>}
        </Modal.Body>

        
      </Modal>
    </Card></Col>
        <Col className='mt-5'><Card style={{ width: '21rem' , height:'415px',boxShadow:'1px 2px 9px #54d494' }}>
      <Card.Body >
        <Card.Title>List a space </Card.Title>
        <br></br>
        <br></br>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <br></br>
        <Button style={{backgroundColor:'#54d494',borderColor:'#54d494'}} variant="secondary">Login</Button>
        <br></br>
        <br></br>
        Don't have an account?<Card.Link style={{color:'#54d494',borderColor:'#54d494'}} onClick={ function(event){openAndOwner()}}> Sign-up</Card.Link>
      </Card.Body>
    </Card></Col>
        <Col > <Card.Img src={require("../../../Assets/Checking boxes-bro.png")} alt="Card image" style={{width:'500px'}} /></Col>
      </Row>
     
    </Container>






{/* Footer */}
    </div>
  )
}

export default SignIn