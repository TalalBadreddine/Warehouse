import React from 'react'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { registerWarehouseOwner } from '../../Services/registerWarehouseOwner';
import ui from '../../themes'

const inputStyle = {
  backgroundColor: `${ui.backgroundColor}`,
  color: `${ui.normalText}`,
  border: `1px solid ${ui.borders}`
}


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
    password: "",
  });
  const handleregistration = (e) => {
    e.preventDefault()
    registerWarehouseOwner(warehouseOwner).then((results) => {
      let data = results.data
      if (data == 'alreadyExist') {
        alert('alreadyExist')
        return
      } else {
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
                    onChange={(e) => setWarehouseOwner({ ...warehouseOwner, userName: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="Username" style={{...inputStyle}} />
                  <Form.Control.Feedback type="invalid">
                    Please fill your username.
                  </Form.Control.Feedback> </InputGroup>
              </Form.Group>
            </Col>
            <Col className='col-6'>
              <Form.Group>
                <InputGroup className="mb-2">

                  <Form.Control required value={warehouseOwner.email}
                    onChange={(e) => setWarehouseOwner({ ...warehouseOwner, email: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="email" style={{...inputStyle}} />
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
                  onChange={(e) => setWarehouseOwner({ ...warehouseOwner, phoneNumber: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="phone number" style={{...inputStyle}} />
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
                    onChange={(e) => setWarehouseOwner({ ...warehouseOwner, password: e.target.value })} className="mb-2" id="inlineFormInput" placeholder="password" type="password" style={{...inputStyle}} />
                  <Form.Control.Feedback type="invalid">
                    Please fill your password.
                  </Form.Control.Feedback> </InputGroup></Form.Group>
            </Col>
            <Col className='col-6'>
              <Form.Group>
                <InputGroup>
                  <Form.Control required className="mb-5" id="inlineFormInput" placeholder="confirm password" type="password" style={{...inputStyle}} />
                  <Form.Control.Feedback type="invalid">
                    Please confirm your password.
                  </Form.Control.Feedback> </InputGroup></Form.Group>
            </Col>
          </Row>

        </Row>
        <Row xs="auto" className="justify-content-center">
          <Button onClick={handleregistration} style={{ backgroundColor: `${ui.Buttons}`, borderColor: `${ui.borders}` }} type="submit" className="mb-2">
            Submit
          </Button>
        </Row>
      </Form>
    </div>
  )
}
export default SignUpWarehouse