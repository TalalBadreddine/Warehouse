import css from './login.css'
import React,{useState} from 'react'
import axios from 'axios';


const Login = ({setLoginUser}) => {

    const [user,setUser] = useState({
        email:"",
       
        password: ""
    })

    const login =()=>{
        axios.post('/admin/login',{
          
            email:user.email,
            password: user.password
          
        })
        .then(res=>{
          console.log(res.status)
          if (res.data == 'admin' ){
            alert('go to home page')
          }
          else{
            alert ("can't go anywhere")
          }
        })
    }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={user.email}
              onChange={(e)=>{
                setUser({...user,['email']: e.target.value})
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={user.password}
              onChange={(e)=>{
                setUser({...user,['password']: e.target.value})
              }}
             />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button style={{ backgroundColor: '#54d494', borderColor: '#54d494' }} type="submit" className="btn btn-primary" onClick={login}>
              Submit
            </button>
          </div>
          
         
        </div>
      </form>
    </div>
  )
}
export default Login