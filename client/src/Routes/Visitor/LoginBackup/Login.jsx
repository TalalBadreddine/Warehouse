import css from './login.css'
import React from "react"

export default function (props) {
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
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button style={{ backgroundColor: '#54d494', borderColor: '#54d494' }} type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          
          <p className="forgot-password text-right mt-2">
            Create an <a href="#" style={{ color: '#54d494' }} >account?</a>
          </p>
        </div>
      </form>
    </div>
  )
}
