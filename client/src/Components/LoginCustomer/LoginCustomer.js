import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../../Services/LoginUser';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import ui from '../../themes'

function LoginCustomer() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()
      
    const HandleEmail = (e) => {
      setEmail(e.target.value)
    }
    const HandlePassword = (e) => {
      setPassword(e.target.value)
    }
   
        const HandleLogin = (e) => {

            e.preventDefault()
              loginUser(email,password).then((data) => {
                if(data.data == true){navigate('/customer/')}
                 //TODO: Handle Error (wrong password ....)
              }).catch((err) => {
               
              })
            }
  return (
    <div><Form.Floating className="mb-3">
    <Form.Control style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}` , color:`${ui.normalText}`}}
     value={email} onChange={HandleEmail}
      id="floatingInputCustom"
      type="email"
      placeholder="name@example.com"
    />
    <label  style={{color:`${ui.normalText}`}} htmlFor="floatingInputCustom">Email address</label>
  </Form.Floating>
  <Form.Floating>
    <Form.Control  style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText}`}}
     value={password} onChange={HandlePassword}
      id="floatingPasswordCustom"
      type="password"
      placeholder="Password"
    />
    <label style={{color:`${ui.normalText}`}} htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating>
  <Button onClick={HandleLogin}  style={{backgroundColor:`${ui.Buttons}`}} type="submit" className="mb-2 mt-2"> 
        Submit 
      </Button> </div>
  )
}

export default LoginCustomer