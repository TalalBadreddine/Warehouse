import css from './LoginAdminCss.module.css'
import React, { useState } from 'react'
import axios from 'axios';
import ui from '../../../themes'
import { Navigate, useNavigate } from 'react-router-dom';

const LoginAdmin = ({ setLoginUser }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",

        password: ""
    })
    
    const login = (e) => {
        e.preventDefault();
        if(user.email == ''){
            setErrorMessage('Please Enter The Email Field')
            return
        }
        if(user.password == ''){
            setErrorMessage('Please Enter The Password Field')
            return
        }
        axios.post('/admin/login', {

            email: user.email,
            password: user.password

        })
            .then(res => {
                console.log(res.status)
                if (res.data) {
                    navigate('/admin/')
                }
                else {
                    setErrorMessage("Invalid Email or Password")
                }
            })
    }

    
    return (
        <div className={css.Authformcontainer}>
            <form className={css.Authform} style={{backgroundColor:`${ui.searchesInput}`, border:`solid 2px ${ui.borders}`, marginBottom:'90px'}} >
                <div className={css.Authformcontent}>
                    <h3 className="Authformtitle" style={{color:`${ui.normalText}`, marginLeft:'70px'}}> Admin Login</h3>
                    <br></br>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            
                            className="form-control mt-1"
                            style={{ boxShadow: '2px 2px 6px black',backgroundColor:`${ui.backgroundColor}`, border:`solid 1px ${ui.borders}` }}
                            placeholder="Enter email"
                            value={user.email}
                            required
                            onChange={(e) => {
                                setUser({ ...user, ['email']: e.target.value })
                                setErrorMessage(null)
                            }}
                        />
              
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input type="password"
                    
                            className="form-control mt-1"
                            placeholder="Enter password"
                            style={{ boxShadow: '2px 2px 6px black',backgroundColor:`${ui.backgroundColor}`, border:`solid 1px ${ui.borders}` }}
                            required
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, ['password']: e.target.value })
                                setErrorMessage(null)

                            }}
                        />
                       
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button style={{ backgroundColor: `${ui.Buttons}`, marginBottom: '8%',border:`solid 1px ${ui.backgroundColor} `, marginTop: '5%', boxShadow: `2px 2px 8px ${ui.backgroundColor}` }} type="submit" className="btn btn-primary" onClick={(e)=> login(e)}>
                            Submit
                        </button>
                        {errorMessage && <p style={{color:'red', fontSize:'12px'}}>{errorMessage}</p>}
                    </div>


                </div>
            </form>
        </div>
    )
}
export default LoginAdmin