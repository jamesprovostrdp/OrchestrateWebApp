import React, { useState } from "react";


// First page for users to interact with. Users can login or switch to registration if they have not signed up

export default function LoginPage({onLogin, onRegister}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const databaseSend = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    });

    const { userID } = await databaseSend.json();

    // If Database login works
    if (databaseSend.status === 200) {
      return onLogin(userID);
    }
    else {
      return;
    }

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
          <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Enter email" required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="passwordInput" className="form-label mt-4"> Password </label>
          <input type="password" className="form-control" id="passwordInput" placeholder="Password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="row mt-4 justify-content-center">
        <button type="submit" className="btn btn-primary m-2" >Login</button>
        <button type="button" className="btn btn-danger m-2" onClick={onRegister}> Register</button>
        </div>
      </div>
    </form>
    </>
    );
};