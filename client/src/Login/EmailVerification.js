import React, { useEffect, useState, useRef } from 'react';
import './EmailVerification.css';
import { useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
import queryString from 'query-string';

const EmailVerification = () => {
  const [inputs, setInputs] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30); // Initial cooldown time in seconds


  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  const maxFailedAttempts = 4; // Adjust as needed
  const [failedAttempts, setFailedAttempts] = useState(0);

  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const queryParams = queryString.parse(location.search);
  const userID = queryParams.userID;

  const RestPassword = queryParams.routeNav === 'RestPassword';

  // const user = useRecoilValue(userStorage);
  const navigate = useNavigate();


  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, inputs.length);

  }, [inputs]);


  useEffect(() => {
    const isOtpComplete = inputs.every((digit) => digit !== '');

    if (isOtpComplete) {
      submit();
    }
  }, [inputs]);


  const handleOtp = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      // If Backspace is pressed and we are not at the first input
      inputsRef.current[index - 1].focus();

      // Update the state by removing the current digit
      setInputs((prevInputs) => {
        prevInputs[index] = '';
        return [...prevInputs];
      });
    } else {
      let value = e.target.value;
      let isValidInput = value.match(/[0-9a-z]/gi);

      if (isValidInput) {
        setInputs((prevInputs) => {
          prevInputs[index] = value[0];
          return [...prevInputs];
        });

        if (isValidInput && index < inputs.length - 1) {
          inputsRef.current[index + 1].focus();
        }
      }
    }
  };

  const handleOnPasteOtp = (e) => {
    const data = e.clipboardData.getData('text');
    const value = data.split('').slice(0, inputs.length);
    setInputs(value);
  };

  const submit = async () => {

    const otp = inputs.join('');

    try {
      const otpResponse = await axios.post('https://insurance-webapp-backend.onrender.com/otp/verify', {
        email: email,
        otp: otp,
    });

      if (otpResponse.data.valid === true) {

        if (RestPassword) {

        }

        navigate(`/AccountSetUp?userID=${userID}&fromEmailVerification=true`);
      }

      else {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);

        if (failedAttempts + 1 >= maxFailedAttempts) {
          setError('Too many failed attempts. Please try again later.');
          // You may want to implement a timer to unlock the user after a specific duration.
        } else {
          setError('Invalid OTP, please try again');
          setInputs(['', '', '', '', '', '']);
          inputsRef.current[0].focus();
        }
      }
    }


    catch (error) {
      console.error('Error fetching OTP:', error.message);

      if (error.message === "No OTP records found.") {
        setError("No OTP records found. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const sendOTPAgain = async () => {
    try {
      await axios.post('https://insurance-webapp-backend.onrender.com/user/RestPasswordOTP', { email });
  
      // Update remaining time and start the cooldown
      setRemainingTime(60);
      setCooldown(true);
  
      // Start the countdown interval
      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
  
          if (newTime <= 0) {
            clearInterval(countdownInterval);
            setCooldown(false);
          }
  
          return newTime;
        });
      }, 1000);
    } catch (error) {
      // handle error
      console.error('Error sending OTP:', error);
    }
  };
  return (
    <div style={{ marginLeft: '300px', marginRight: '300px', textAlign: 'center' }}>
      <h1>Email Confirmation</h1>

      <h2>A One-Time Password (OTP) has been sent to your email </h2>
      <h2> {email} </h2>

      <h3>Please enter the OTP below</h3>

      {error && <div className="error">{error}</div>}
      <div className="otp-field" style={{ display: 'flex', justifyContent: 'center' }}>
        {inputs.map((value, index) => (
          <input
            key={index}
            ref={(ref) => (inputsRef.current[index] = ref)}
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleOtp(e, index)}
            onPaste={handleOnPasteOtp}
          />
        ))}
      </div>
      <div>
  <p>
    Didn't receive OTP: 
    <button className = 'EmailVerificationButt' onClick={!cooldown ? sendOTPAgain : null} disabled={cooldown}>
      {cooldown ? `Send again (${remainingTime}s)` : 'Send again'}
    </button>
  </p>
</div>

    </div>
  );
};

export default EmailVerification;