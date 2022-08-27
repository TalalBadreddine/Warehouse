import React from 'react'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { registerWarehouseOwner } from '../../Services/registerWarehouseOwner';


function SignUpWarehouse() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  
const [warehouseOwner, setWarehouseOwner] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password:"",
    cardNumber: "",
    cardExpires: "",
    cardCode: "",
    cardName: "",
    });
    const handleregistration=(e)=>{
      e.preventDefault()
      registerWarehouseOwner(warehouseOwner).then((results) => {
        let data = results.data
        if(data == 'alreadyExist'){
          alert('alreadyExist')
          return
        }else{
          let accountId = data.accountId
          let accountLink = data.accountLink
          window.open(`${accountLink.url}`)
        }
      })
      }
    
  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row > 
         <Row className='justify-content-center mb-2'><Form.Label className='justify-content-center'>User Information</Form.Label></Row>
    <Row xs="auto"> 
    <Col>
    <Form.Group>
    <InputGroup className=" mb-2">
      
      <Form.Control required value={warehouseOwner.userName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, userName: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="Username" /> 
      <Form.Control.Feedback type="invalid">
                  Please fill your username.
                </Form.Control.Feedback> </InputGroup>
      </Form.Group>
      </Col> 
      <Col className='col-6'>
      <Form.Group>
      <InputGroup className="mb-2">
      
       <Form.Control required value={warehouseOwner.email} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, email: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="email" />
     <Form.Control.Feedback type="invalid">
                  Please fill your email.
                </Form.Control.Feedback> </InputGroup>
      </Form.Group>
      </Col>
      </Row>

    <Row className='mb-2' xs="auto"> 
    <Form.Group>
      <InputGroup>
      <Form.Control required value={warehouseOwner.phoneNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, phoneNumber: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="phone number" />
      <Form.Control.Feedback type="invalid">
                  Please fill your phone number.
                </Form.Control.Feedback> </InputGroup>
     </Form.Group>
    </Row> 
    
    
    <Row xs="auto"> 
    <Col>
    <Form.Group>
   <InputGroup>
      <Form.Control required value={warehouseOwner.password} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, password: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="password" type="password"/> 
      <Form.Control.Feedback type="invalid">
                  Please fill your password.
                </Form.Control.Feedback> </InputGroup></Form.Group>
      </Col>
   <Col className='col-6'>
   <Form.Group>
    <InputGroup>
      <Form.Control required  className="mb-5" id="inlineFormInput" placeholder="confirm password" type="password"/>
      <Form.Control.Feedback type="invalid">
                  Please confirm your password.
                </Form.Control.Feedback> </InputGroup></Form.Group>
       </Col>
    </Row>
    <Row className='justify-content-center mb-2'><Form.Label className='justify-content-center'>Card Information</Form.Label></Row>
    <Row xs="auto"><Col>
    <Form.Group>
        <InputGroup>
       <Form.Control required value={warehouseOwner.cardNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardNumber: e.target.value })} className="mb-2 " id="inlineFormInput" placeholder="Card number" />
       <Form.Control.Feedback type="invalid">
                  Please fill your card Number.
                </Form.Control.Feedback> </InputGroup></Form.Group>
        </Col>
        <Col className='col-6'>
        <Form.Group>
        <InputGroup>
        <Form.Control required value={warehouseOwner.cardExpires} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardExpires: e.target.value })} className="mb-2" id="inlineFormInput" type='month'/>
    <Form.Control.Feedback type="invalid">
                  Please fill your card Expire date.
                </Form.Control.Feedback></InputGroup></Form.Group>
    </Col>
    </Row>

        <Row xs="auto">
           <Col className='col-6'>
           <Form.Group><InputGroup>
        <Form.Control required value={warehouseOwner.cardCode} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardCode: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Card code" />
        <Form.Control.Feedback type="invalid">
                  Please fill your card code.
                </Form.Control.Feedback>
</InputGroup></Form.Group>
</Col>
 <Col className='col-6'><Form.Group><InputGroup>
       
          
          <Form.Control required value={warehouseOwner.cardName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardName: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Name on card" />
       <Form.Control.Feedback type="invalid">
                  Please fill your card Name
                </Form.Control.Feedback>
</InputGroup></Form.Group></Col>
        </Row>
     
      
    </Row>
    <br></br>
    <Row xs="auto" className="justify-content-center"> 
      <Button onClick={handleregistration} style={{backgroundColor:'#54d494',borderColor:'#54d494'}} type="submit" className="mb-2"> 
        Submit 
      </Button> 
    </Row> 
</Form>
  </div>
  )
}
export default SignUpWarehouse