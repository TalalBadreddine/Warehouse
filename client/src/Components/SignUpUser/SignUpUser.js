import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';

import {registerCustomer} from '../../Services/registerCustomer'
import ui from '../../themes'

function SignUpUser() {

  const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password:"",
    });
    const handleregistration=(e)=>{
        registerCustomer(customer);
    }

  return (
    <>
    <Row className="align-items-center"> 
        <Row xs="auto"> 
          <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control  style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}` ,borderColor:`${ui.borders}` }}
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="Username" 
            onChange={(e) => setCustomer({...customer, userName: e.target.value })}
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto"> 
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden> 
            Username 
          </Form.Label> 
          <InputGroup className="mb-2"> 
            <InputGroup.Text>@</InputGroup.Text> 
            <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`  }}
            id="inlineFormInputGroup" 
            placeholder="email"
            onChange={(e) => setCustomer({...customer, email: e.target.value })}
            /> 
          </InputGroup> 
        </Row> 
        
        <Row xs="auto"> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control style={{backgroundColor:`${ui.searchesInput}` ,color:`${ui.normalText}` ,borderColor:`${ui.borders}`}}
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="password" 
            onChange={(e) => setCustomer({...customer, password: e.target.value })}
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto"> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control style={{backgroundColor:`${ui.searchesInput}`,color:`${ui.normalText}`,borderColor:`${ui.borders}`  }}
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="confirm password" 
          /> 
          </InputGroup>
        </Row>
        <Row xs="auto" className='justify-content-center'> 
          <Button onClick={handleregistration} type="submit" className="mb-2" style={{backgroundColor:`${ui.Buttons}` }}> 
            Submit 
          </Button> 
        </Row> 
      </Row>
    </>

  )
}

export default SignUpUser