import React, { useState } from "react";


// Registration Page. Contains input fields for user to register. Users have the ability to transfer back to login page.

export default function RegistrationPage({ onBackToLogin, onLogin }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== passwordVerification) {
      return;
    }

    const databaseSend = await fetch("http://localhost:3001/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password, username: username })
    });

    onLogin();

  };
    return(
<>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <h1 style={{margin: '0 auto'}}>Orchestrate</h1>
      </nav>

      <form onSubmit={handleSubmit} style={{margin:'0 auto'}}>
          <div style={{ maxWidth: '400px', margin: '100px auto' }}>
        <div>
          <label htmlFor="emailInput" className="form-label mt-4"> Email address </label>
          <input type="email" className="form-control" id="emailInput" placeholder="Enter email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="usernameInput" className="form-label mt-4"> Username </label>
          <input type="text" className="form-control" id="usernameInput" placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="passwordInput" className="form-label mt-4"> Password </label> 
          <input type="password" 
            className="form-control" 
            id="passwordInput" 
            placeholder="Password" 
            autoComplete="off" required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="passwordVerification" className="form-label mt-4"> Confirm Password </label>
          <input type="password" className="form-control" id="passwordVerification" placeholder="Confirm Password" autoComplete="off" required
            value={passwordVerification}
            onChange={(e) => setPasswordVerification(e.target.value)}
          />
        </div>
        <div className="row mt-4 justify-content-center">
        <button type="submit" className="btn btn-danger m-2">Submit</button>
        <button type="button" className="btn btn-primary m-2" onClick={onBackToLogin}>Back to Login</button>
        </div>
      </div>
    </form>
    </>
    );
};