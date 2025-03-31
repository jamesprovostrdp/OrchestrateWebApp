import React from "react";


// Registration Page. Contains input fields for user to register. Users have the ability to transfer back to login page.

export default function RegistrationPage({onBackToLogin, onLogin }) {
    return(
<>
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
        <h1 style={{margin: '0 auto'}}>Orchestrate</h1>
      </nav>

      <form style={{margin:'0 auto'}}>
          <div style={{ maxWidth: '400px', margin: '100px auto' }}>
        <div>
          <label htmlFor="exampleInputEmail1" className="form-label mt-4"> Email address </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
          />
        </div>
        
        
        <div>
          <label htmlFor="exampleInputPassword1" className="form-label mt-4"> Password </label> 
          <input type="password" className="form-control" id="password" placeholder="Password" autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="exampleInputPassword1" className="form-label mt-4"> Confirm Password </label>
          <input type="password" className="form-control" id="passwordVerification" placeholder="Password" autoComplete="off"
          />
        </div>
        <div className="row mt-4 justify-content-center">
        <button type="submit" className="btn btn-danger m-2" fdprocessedid="syopon" onClick={onLogin}>Submit</button>
        <button type="button" className="btn btn-primary m-2" onClick={onBackToLogin}>Back to Login</button>
        </div>
      </div>
    </form>
    </>
    );
}