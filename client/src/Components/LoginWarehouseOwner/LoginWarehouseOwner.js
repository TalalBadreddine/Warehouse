import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginWarehouseOwner } from '../../Services/LoginWarehouseOwner';
import {useState} from 'react';

function LoginWarehouseOwner() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
      
    const HandleEmail = (e) => {
      setEmail(e.target.value)
    }
    const HandlePassword = (e) => {
      setPassword(e.target.value)
    }
   
        const HandleLogin = (e) => {

            e.preventDefault()
            
              loginWarehouseOwner(email,password)
            }
  return (
    <div><Form.Floating className="mb-3">
    <Form.Control value={email} onChange={HandleEmail}
      id="floatingInputCustom"
      type="email"
      placeholder="name@example.com"
    />
    <label htmlFor="floatingInputCustom">Email address</label>
  </Form.Floating>
  <Form.Floating>
    <Form.Control  value={password} onChange={HandlePassword}
      id="floatingPasswordCustom"
      type="password"
      placeholder="Password"
    />
    <label htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating>
  <Button onClick={HandleLogin}  style={{backgroundColor:'#54d494',borderColor:'#54d494'}} type="submit" className="mb-2"> 
        Submit 
      </Button> 
  </div>
  )
}

export default LoginWarehouseOwner