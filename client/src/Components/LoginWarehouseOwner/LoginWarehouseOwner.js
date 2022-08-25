import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LoginWarehouseOwnerService } from '../../Services/LoginWarehouseOwnerServices';
import {useState} from 'react';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import ui from '../../themes'
function LoginWarehouseOwner() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const apiUri="/warehouseOwner/login";
    const navigate=useNavigate();
    const HandleEmail = (e) => {
      setEmail(e.target.value)
    }
    const HandlePassword = (e) => {
      setPassword(e.target.value)
    }
   
        const HandleLogin = (e) => {

            e.preventDefault()
            
              // LoginWarehouseOwnerService(email,password)

                const data=(email,password);
                axios.post(apiUri, {email,password})
                .then(async (data) => {
                navigate('/owner/myWarehouses');
                    
                })
                .catch((err) => {
                    console.log(err.message)
                     if(err.message === 'Request failed with status code 400'){
                    window.alert("User does not exist");
                     }
                      else if(err.message === 'Request failed with status code 403');{
                       window.alert("Wrong Password");
                  }
              //          else if(err.res.data === 'testing'){
              //           window.alert("You are desactivated by the admin");
              //            console.log("Wrong desactivated by the admin");
              //  }
                  

              
                })
              
            
              }
  return (
    <div><Form.Floating className="mb-3">
    <Form.Control style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText}`}} value={email} onChange={HandleEmail}
      id="floatingInputCustom"
      type="email"
      placeholder="name@example.com"
    />
    <label style={{color:`${ui.normalText}`}} htmlFor="floatingInputCustom">Email address</label>
    <Form.Control.Feedback id='email'>
              User does not exist
            </Form.Control.Feedback>
  </Form.Floating>

  <Form.Floating>
    <Form.Control style={{backgroundColor:`${ui.lightBg}` , borderColor:`${ui.borders}`, color:`${ui.normalText}`}} value={password} onChange={HandlePassword}
      id="floatingPasswordCustom"
      type="password"
      placeholder="Password"
    />
    <label  style={{color:`${ui.normalText}`}} htmlFor="floatingPasswordCustom">Password</label>
  </Form.Floating>
  <Button onClick={HandleLogin}  style={{backgroundColor:`${ui.Buttons}`}} type="submit" className="mb-2 mt-2"> 
        Submit 
      </Button> 
  </div>
  )
}

export default LoginWarehouseOwner