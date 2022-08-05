import React from 'react'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { registerWarehouseOwner } from '../../Services/registerWarehouseOwner';


function SignUpWarehouse() {
  
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
        registerWarehouseOwner(warehouseOwner);
      }
    
  return (
    <div>  <Row > 
         <Row className='justify-content-center mb-2'><Form.Label className='justify-content-center'>User Information</Form.Label></Row>
    <Row xs="auto"> 
    <Col>
    <InputGroup className=" mb-2">
      <Form.Control value={warehouseOwner.userName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, userName: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="Username" /> 
      </InputGroup>
      </Col> 
      <Col className='col-6'>
      <InputGroup className="mb-2">
      
       <Form.Control value={warehouseOwner.email} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, email: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="email" />
      </InputGroup>
      </Col>
      </Row>

    <Row className='mb-2' xs="auto"> 
    
      <InputGroup>
      <Form.Control value={warehouseOwner.phoneNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, phoneNumber: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="phone number" />
       </InputGroup>
     
    </Row> 
    
    
    <Row xs="auto"> 
    <Col>
   <InputGroup>
      <Form.Control value={warehouseOwner.password} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, password: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="password"/> 
      </InputGroup>
      </Col>
   <Col className='col-6'>
    <InputGroup>
      <Form.Control  className="mb-5" id="inlineFormInput" placeholder="confirm password"/>
       </InputGroup>
       </Col>
    </Row>
    <Row className='justify-content-center mb-2'><Form.Label className='justify-content-center'>Card Information</Form.Label></Row>
    <Row xs="auto"><Col>
        <InputGroup>
       <Form.Control value={warehouseOwner.cardNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardNumber: e.target.value })} className="mb-2 " id="inlineFormInput" placeholder="Card number" />
        </InputGroup>
        </Col>
        <Col className='col-6'>
        <InputGroup>
        <Form.Control value={warehouseOwner.cardExpires} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardExpires: e.target.value })} className="mb-2" id="inlineFormInput" type='date'/>
    </InputGroup>
    </Col>
    </Row>

        <Row xs="auto">
           <Col className='col-6'><InputGroup>
        <Form.Control value={warehouseOwner.cardCode} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardCode: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Card code" />
       
</InputGroup>
</Col>
 <Col className='col-6'><InputGroup>
       
          
          <Form.Control value={warehouseOwner.cardName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardName: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Name on card" />
       
</InputGroup></Col>
        </Row>
     
      
    </Row>
    <br></br>
    <Row xs="auto" className="justify-content-center"> 
      <Button onClick={handleregistration} style={{backgroundColor:'#54d494',borderColor:'#54d494'}} type="submit" className="mb-2"> 
        Submit 
      </Button> 
    </Row> 

  </div>
  )
}

export default SignUpWarehouse