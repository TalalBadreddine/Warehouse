import css from './LoginAdminCss.module.css'
import React, { useState } from 'react'
import axios from 'axios';


const Login = ({ setLoginUser }) => {
    const [errorMessage, setErrorMessage] = useState(null);

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
                if (res.data == 'admin') {
                    alert('go to home page')
                }
                else {
                    setErrorMessage("Invalid Email or Password")
                }
            })
    }

    
    return (
        <div className={css.Authformcontainer}>
            <form className={css.Authform} >
                <div className={css.Authformcontent}>
                    <h3 className="Authformtitle"> Admin Login</h3>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            style={{ boxShadow: '2px 2px 6px black' }}
                            placeholder="Enter email"
                            value={user.email}
                            required
                            onChange={(e) => {
                                setUser({ ...user, ['email']: e.target.value })
                            }}
                        />
              
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                            style={{ boxShadow: '2px 2px 6px black' }}
                            required
                            value={user.password}
                            onChange={(e) => {
                                setUser({ ...user, ['password']: e.target.value })
                            }}
                        />
                       
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button style={{ backgroundColor: '#54d494', borderColor: '#54d494', marginBottom: '8%', marginTop: '5%', boxShadow: '2px 2px 8px green' }} type="submit" className="btn btn-primary" onClick={(e)=> login(e)}>
                            Submit
                        </button>
                        {errorMessage && <p style={{color:'red', fontSize:'12px'}}>{errorMessage}</p>}
                    </div>


                </div>
            </form>
        </div>
    )
}
export default Login