import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUser } from '../../Services/LoginUser';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import ui from '../../themes'
import axios from "axios";

function LoginCustomer() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const apiUri="/user/login";
    const navigate = useNavigate()
      
    const HandleEmail = (e) => {
      setError(null)
      setEmail(e.target.value)
    }

    const HandlePassword = (e) => {
      setError(null)
      setPassword(e.target.value)
    }
   
    const HandleLogin = (e) => {

      e.preventDefault()
      axios.post(apiUri, {email,password}).then(async(data) => {
          if(data.data == true){
              navigate('/customer/')
          }else{
            setError(data.data)
          }
      

        }).catch((err) => {
          if(err.message === 'Request failed with status code 400'){
            setError("User does not exist");

           }
             else if(err.message === 'Request failed with status code 403'){
              setError("Wrong Password");
        }
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
  <p className='mt-2' style={{ fontSize: '18px',fontStyle:'italic', color:'red' }}>{error}</p>
  <Button onClick={HandleLogin}  style={{backgroundColor:`${ui.Buttons}`}} type="submit" className="mb-2 mt-2"> 
        Submit 
      </Button> </div>
  )
}

export default LoginCustomer