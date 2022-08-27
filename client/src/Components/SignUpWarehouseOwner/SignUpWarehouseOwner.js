import React from 'react'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import { registerWarehouseOwner } from '../../Services/registerWarehouseOwner';
import ui from '../../themes'


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
        registerWarehouseOwner(warehouseOwner).then((data) => {
          if(data.data == 'alreadyExist'){
            alert('alreadyExist')
            return
          }else{
            window.open(`${data.data.url}`)
          }
        })
      }
    
  return (
    <div>  <Row > 
         <Row className='justify-content-center mb-2'><Form.Label style={{color:`${ui.normalText}` }} className='justify-content-center'>User Information</Form.Label></Row>
    <Row xs="auto"> 
    <Col>
    <InputGroup className=" mb-2">
      <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}`,borderColor:`${ui.borders}` }} value={warehouseOwner.userName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, userName: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="Username" /> 
      </InputGroup>
      </Col> 
      <Col className='col-6'>
      <InputGroup className="mb-2">
      
       <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}` ,borderColor:`${ui.borders}` }} value={warehouseOwner.email} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, email: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="email" />
      </InputGroup>
      </Col>
      </Row>

    <Row className='mb-2' xs="auto"> 
    
      <InputGroup  >
      <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}`,borderColor:`${ui.borders}` }} value={warehouseOwner.phoneNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, phoneNumber: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="phone number" />
       </InputGroup>
     
    </Row> 
    
    
    <Row xs="auto"> 
    <Col>
   <InputGroup>
      <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}`,borderColor:`${ui.borders}` }} value={warehouseOwner.password} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, password: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="password"/> 
      </InputGroup>
      </Col>
   <Col className='col-6'>
    <InputGroup>
      <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`  }} className="mb-5" id="inlineFormInput" placeholder="confirm password"/>
       </InputGroup>
       </Col>
    </Row>
    <Row className='justify-content-center mb-2'><Form.Label style={{color:`${ui.normalText}`,color:`${ui.normalText}` ,borderColor:`${ui.borders}` }} className='justify-content-center'>Card Information</Form.Label></Row>
    <Row xs="auto"><Col>
        <InputGroup>
       <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}` ,borderColor:`${ui.borders}`  }} value={warehouseOwner.cardNumber} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardNumber: e.target.value })} className="mb-2 " id="inlineFormInput" placeholder="Card number" />
        </InputGroup>
        </Col>
        <Col className='col-6'>
        <InputGroup>
        <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}` ,borderColor:`${ui.borders}` }} value={warehouseOwner.cardExpires} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardExpires: e.target.value })} className="mb-2" id="inlineFormInput" type='month'/>
    </InputGroup>
    </Col>
    </Row>

        <Row xs="auto">
           <Col className='col-6'><InputGroup>
        <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}` ,borderColor:`${ui.borders}` }} value={warehouseOwner.cardCode} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardCode: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Card code" />
       
</InputGroup>
</Col>
 <Col className='col-6'><InputGroup>
       
          
          <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}`,borderColor:`${ui.borders}` }} value={warehouseOwner.cardName} 
    onChange={(e) => setWarehouseOwner({...warehouseOwner, cardName: e.target.value })} className="mb-2" id="inlineFormInput"  placeholder="Name on card" />
       
</InputGroup></Col>
        </Row>
     
      
    </Row>
    <br></br>
    <Row xs="auto" className="justify-content-center"> 
      <Button onClick={handleregistration} style={{ backgroundColor:`${ui.Buttons}` }} type="submit" className="mb-2"> 
        Submit 
      </Button> 
    </Row> 

  </div>
  )
}

export default SignUpWarehouse