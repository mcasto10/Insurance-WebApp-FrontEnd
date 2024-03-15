import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link} from 'react-router-dom';

function LoginForm({ Login, error }) {
  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();

  // method to handle the submited information
  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }


  const sendOTPAgain = async () => {
    navigate('/EmailVerification');
  }

  return (
    <div className="login-card">
      <div className='signUpText'> Log In </div>
      <form className="login-form" onSubmit={submitHandler}>

        {error && (
          <div className="error-message" style={{ color: 'red' }}>
            {error}
            {error === "Email not verified" && (
              <button onClick={sendOTPAgain}> Click to resend OTP </button>
            )}
          </div>
        )}

        <div className="username">
          <input
            autoComplete="off"
            spellCheck="false"
            placeholder="username, or email"
            type="text"
            name="name"
            className="control"
            required
            onChange={e => setDetails({ ...details, name: e.target.value })} value={details.name} />
          <div id="spinner" className="spinner"></div>
        </div>

        <div className="password">
          <input
            spellCheck="false"
            placeholder="password"
            type="password"
            name="password"
            className="control"
            required
            onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
          <div id="spinner" className="spinner"></div>
        </div>

        <button className="control" type="submit"> Log In </button>

        <Link className="forgot-password" to="/SendingEmailRestInfo">Forgot password?</Link>

        <div class="separator">
          <div class="line"></div>
          <p>OR</p>
          <div class="line"></div>
        </div>
      </form>

      <div class="box">
        <div>Don't have an account? <Link className="signup" to="/SignUp">Sign Up</Link></div>
      </div>
    </div>
  )
}

export default LoginForm;