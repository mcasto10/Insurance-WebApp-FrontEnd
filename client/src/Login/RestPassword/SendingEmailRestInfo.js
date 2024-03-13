import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../Login.css';

function SendingEmailRestInfo({ Login, error }) {
    const navigate = useNavigate();

    // state to store the email
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // method to handle the submitted information
    const submitHandler = async (e) => {
        e.preventDefault();
      
        try {
          // Make the request with the email
          const responseRestPassword = await axios.post('http://localhost:3001/user/resetPasswordOTP', { email });
      
          if (responseRestPassword.status === 200) {
            navigate(`/SignUp/EmailVerification?routeNav=SendingEmailRestInfo&email=${email}&userID=${responseRestPassword.data.userID}`);
          } else {
            setErrorMessage(responseRestPassword.data.message || 'Unexpected error happened.');
          }
        } catch (error) {
          // Handle error
          console.error('Error sending OTP', error);
          setErrorMessage('Unexpected error happened.');
        }
      };
      
    // method to update the email state when the input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrorMessage('');

    };

    return (
        <div className='center-container'>
            <p className="signUpText"> Forgot Password </p>
            {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}

            <div className="login-card">
            <p style={{fontWeight: '300', fontSize: '20px' }}>Enter the email associated with your account and we'll send you a OTP to confirm your account</p>
                <div className="username">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="email"
                        type="text"
                        name="name"
                        className="control"
                        value={email}
                        onChange={handleEmailChange} // Call handleEmailChange on input change
                        required
                    />
                    <div id="spinner" className="spinner"></div>
                </div>

                <button className="control" onClick={submitHandler}>Continue</button>

                <div className="separator">
                    <div className="line"></div>
                    <p>OR</p>
                    <div className="line"></div>
                </div>

                <div className="box">
                    <div>Don't have an account? <a className="signup" href="/SignUp">Sign Up</a></div>
                </div>
            </div>
        </div>
    );
}

export default SendingEmailRestInfo;
