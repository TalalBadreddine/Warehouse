import React, { useState } from "react";
import ReactDOM from "react-dom";

import LoginAdmin from './LoginAdmin.css';

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "Invalid Email",
    pass: "Invalid Password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form" style={{width:'25vw', height:'35vh'}}>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required style={{marginBottom:'5%', boxShadow:'2px 2px 6px black', borderRadius:'4px'}}/>
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container" style={{marginBottom:'10%'}}>
          <label>Password </label>
          <input type="password" name="pass" required style={{boxShadow:'2px 2px 6px black', borderRadius:'4px'}}/>
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit"  style={{boxShadow:'2px 2px 8px green', borderRadius:'4px', fontSize:'18px'}}/>
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title" style={{marginLeft:'35%', marginBottom:'10%'}}><h3>Sign In</h3></div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default App;