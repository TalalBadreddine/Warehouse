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

function SignUpUser(props) {

  const [error, setError] = useState(null);
  const [defaultColor, setDefaultColor] = useState('red')


  const [customer, setCustomer] = useState({
    userName: "",
    email: "",
    password:"",
    confirm: ""
    });

    const handleregistration=(e)=>{
      e.preventDefault()

      if(customer.userName.trim() == ''){
        setError('Please provide user name')
        return
      }

      if(customer.email.trim() == ''){
        setError('Please provide email')
        return
      }

      if(customer.password.trim() == ''){
        setError("Password can't be empty ")
        return
      }

      if(customer.confirm != customer.password){
        setError('Passwords does not match ')
        return
      }

      registerCustomer(customer).then((results) => {

        if(results.data == 'exist'){
          setError('User Already exists, maybe try another email')
          return
        }

        if(results.data == 'added'){
          setDefaultColor('green')
          setError('User Created ')
          setTimeout(() => { props.closeModal()
            setDefaultColor('red')
           }, 2000)
          return
        }

        
    })}

  return (
    <>
    <Form >
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
            onChange={(e) => {
              setCustomer({...customer, userName: e.target.value })
              setError(null)
            }}
            style={{...inputStyle, border:  error ? (error.includes('user name') ? '1px solid red' :`${inputStyle.border}`) : `${inputStyle.border}`}}
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
            onChange={(e) => {
              setCustomer({...customer, email: e.target.value })
              setError(null)
            }}
            style={{...inputStyle,  border:  error ? (error.includes('email') ? '1px solid red' : `${inputStyle.border}` ) : `${inputStyle.border}`}}
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
            onChange={(e) => {
              setCustomer({...customer, password: e.target.value })
              setError(null)
            }}
            style={{...inputStyle,  border:  error ? (error.includes('Password') ? '1px solid red' : `${inputStyle.border}` ) : `${inputStyle.border}`}}
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
            onChange={(e) => {
              setCustomer({...customer, confirm: e.target.value })
              setError(null)
            }}
            style={{...inputStyle, border:  error ? (error.includes('Password') ? '1px solid red' : `${inputStyle.border}` ) : `${inputStyle.border}`}}
          /> 
           <Form.Control.Feedback type="invalid">
                  Please fill confirm your password
                </Form.Control.Feedback></InputGroup></Form.Group>
        </Row>
        {error &&
        <div>
         <p style={{color: defaultColor}}>{error}</p>
         </div>}

        <Row xs="auto" className="justify-content-center"> 

          <Button onClick={handleregistration} type="submit" className="mb-2 d-block" style={{backgroundColor:`${ui.Buttons}`, borderColor:`${ui.borders}`}}> 
            Submit 
          </Button> 
        </Row> 
      </Row></Form>
    </>

  )
}

export default SignUpUser