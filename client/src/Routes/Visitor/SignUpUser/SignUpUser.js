import React from 'react'
import Row from 'react-bootstrap/Row'; 

import Button from 'react-bootstrap/Button'; 
import Form from 'react-bootstrap/Form'; 
import InputGroup from 'react-bootstrap/InputGroup';

function SignUpUser() {
  return (
    <>
    <Row className="align-items-center"> 
        <Row xs="auto"> 
          <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="Username" 
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto"> 
          <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden> 
            Username 
          </Form.Label> 
          <InputGroup className="mb-2"> 
            <InputGroup.Text>@</InputGroup.Text> 
            <Form.Control id="inlineFormInputGroup" placeholder="email" /> 
          </InputGroup> 
        </Row> 
        
        <Row xs="auto"> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="password" 
          /> 
          </InputGroup>
        </Row> 
        <Row xs="auto"> 
        <Form.Label htmlFor="inlineFormInput" visuallyHidden> 
            Name 
          </Form.Label> 
          <InputGroup className="mb-2">
          <Form.Control 
            className="mb-2" 
            id="inlineFormInput" 
            placeholder="confirm password" 
          /> 
          </InputGroup>
        </Row>
        <Row xs="auto" className='justify-content-center'> 
          <Button type="submit" className="mb-2" style={{backgroundColor:'#54d494', borderColor:'#54d494'}}> 
            Submit 
          </Button> 
        </Row> 
      </Row>
    </>
  )
}

export default SignUpUser