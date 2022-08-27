import React, {useState} from 'react'
import Row from 'react-bootstrap/Row'; 
import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';
import ui from '../../themes'

import {registerCustomer} from '../../Services/registerCustomer'

const inputStyle = {
  backgroundColor: `${ui.backgroundColor}`,
  color: `${ui.normalText}`,
  border: `1px solid ${ui.borders}`
}

function SignUpUser() {

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password:"",
    });
    const handleregistration=(e)=>{
      e.preventDefault()
        registerCustomer(customer);
        
    }

  return (
    <>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-2 col-8 m-auto justify-content-center"> 
        <Row  xs="auto">
          <Form.Group className='col-12'> 
          <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control required 
            className="mb-2 " 
            id="inlineFormInput" 
            placeholder="Username" 
            onChange={(e) => setCustomer({...customer, userName: e.target.value })}
            style={{...inputStyle}}
          /> 
           <Form.Control.Feedback type="invalid">
                  Please fill your username.
                </Form.Control.Feedback></InputGroup></Form.Group>
        </Row> 
        <Row xs="auto">
          <Form.Group className='col-12'> 
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden> 
            Username 
          </Form.Label> 
          <InputGroup className="mb-2"> 
           
            <Form.Control required 
            id="inlineFormInputGroup" 
            placeholder="email"
            onChange={(e) => setCustomer({...customer, email: e.target.value })}
            style={{...inputStyle}}
            /> 
           <Form.Control.Feedback type="invalid">
                  Please fill your email.
                </Form.Control.Feedback></InputGroup></Form.Group> 
        </Row> 
      
        <Row xs="auto">
          <Form.Group className='col-12'> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control required 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="password" 
            type="password"
            onChange={(e) => setCustomer({...customer, password: e.target.value })}
            style={{...inputStyle}}
          /> 
           <Form.Control.Feedback type="invalid">
                  Please fill your password.
                </Form.Control.Feedback></InputGroup></Form.Group>
        </Row> 
        <Row xs="auto">
          <Form.Group className='col-12'> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control required 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="confirm password" 
            type="password"
            style={{...inputStyle}}
          /> 
           <Form.Control.Feedback type="invalid">
                  Please fill confirm your password
                </Form.Control.Feedback></InputGroup></Form.Group>
        </Row>
        <Row xs="auto" className="justify-content-center"> 
          <Button onClick={handleregistration} type="submit" className="mb-2" style={{backgroundColor:`${ui.Buttons}`, borderColor:`${ui.borders}`}}> 
            Submit 
          </Button> 
        </Row> 
      </Row></Form>
    </>

  )
}

export default SignUpUser