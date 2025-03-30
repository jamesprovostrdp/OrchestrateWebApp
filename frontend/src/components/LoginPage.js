import React from "react";


// First page for users to interact with. Users can login or switch to registration if they have not signed up

export default function LoginPage({onLogin, onRegister}) {
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
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off"
          />
        </div>

        <div className="row mt-4 justify-content-center">
        <button type="button" className="btn btn-primary m-2" fdprocessedid="tq8pmk" onClick={onLogin}>Login</button>
        <button type="button" className="btn btn-danger m-2" fdprocessedid="syopon" onClick={onRegister}> Register</button>
        </div>
      </div>
    </form>
    </>
    );
}