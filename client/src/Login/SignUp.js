import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string'; 

import eventBus from '../EventBus.js';
import './Login.css'

const strengthLabels = ["very weak", "weak", "moderate", "strong", "very strong"];

function SignUp() {

  const [lengthCondition, setLengthCondition] = useState(false);
  const [lowerCondition, setLowerCondition] = useState(false);
  const [upperCondition, setUpperCondition] = useState(false);
  const [valueCondition, setValueCondition] = useState(false);
  const [specialCondition, setSpecialCondition] = useState(false);


  const [error, setError] = useState([]);

  const [strength, setStrength] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // const setUsers = useSetRecoilState(userStorage);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  // const fromAccountSetUp = queryParams.fromAccountSetUp === 'true'; // Ensure comparison is strict
  const fromConfirmationPage = queryParams.fromConfirmationPage === 'true';
  // const guestId = queryParams.guestId;

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('https://insurance-webapp-backend.onrender.com/user/CheckAuthStatus', {
          withCredentials: true,
        });
      

        if (response.status === 200) {
          // const userData = response.data;
          eventBus.emit('userLoggedIn');
          navigate(`/login`);
        }

      } catch (error) {
        console.error('Authentication status check failed:', error);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleSignUp = async () => {
    try {
      const userData = {
        name: userName,
        email: userEmail,
        password: userPassword
      };

      // responseUserData: id of user
      const responseUserData = await axios.post(`https://insurance-webapp-backend.onrender.com/user/SignUp`, userData);

      // Creating a default for Combio when a user only creats a userAccount but hasn't included userinfo
      if (fromConfirmationPage) {
        const combioUserId = sendUserDataToServer(responseUserData.data);
        navigate(`/SignUp/EmailVerification?email=${userEmail}&userID=${combioUserId}`);
      }

      navigate(`/SignUp/EmailVerification?email=${userEmail}&userID=${responseUserData.data}`);


    } catch (error) {
      console.error('Error signing up', error);

      setError(error.response.data.message);
    }
  };

  //  We need to check if user information has already been inputted, if yes then we let them know if they want to continoue
  const sendUserDataToServer = async (userData) => {
    const UserIdContent = {
      user: userData,
    }

    try {
      const combioUserId = await axios.post(`https://insurance-webapp-backend.onrender.com/user/combinedUserInfo`, UserIdContent);
    
      return combioUserId;

    } catch (error) {
      console.error(error);

    }
  };

  const getStrength = (password) => {

    let strengthIndicator = -1;

    const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;

    let upper = false,
      lower = false,
      numbers = false,
      length = false,
      specialChars = false;

    setUpperCondition(false);

    setLengthCondition(false)

    setValueCondition(false);

    setLowerCondition(false);

    setSpecialCondition(false);

    if (password.length >= 8) {
      length = true;
      setLengthCondition(true)
      strengthIndicator++;
    }

    for (let index = 0; index < password.length; index++) {

      let char = password.charCodeAt(index);

      if (!upper && char >= 65 && char <= 90) {
        upper = true;
        setUpperCondition(true);
        strengthIndicator++;
      }

      // Testing Values 
      if (!numbers && char >= 48 && char <= 57) {
        numbers = true;
        setValueCondition(true);
        strengthIndicator++;
      }

      // Testing LowerCase Letter
      if (!lower && char >= 97 && char <= 122) {
        lower = true;
        setLowerCondition(true);
        strengthIndicator++;
      }

      if (!specialChars && specialCharsRegex.test(password[index])) {
        specialChars = true;
        setSpecialCondition(true);
        strengthIndicator++;
      }

      if (strengthLabels[strengthIndicator] === "very strong") {
        setIsSignUp(true);
      }

      else {
        setIsSignUp(false);
      }
    }

    setStrength(strengthLabels[strengthIndicator] ?? "");
  };

  const handleChange = (event) => getStrength(event.target.value);

  return (
    <div className="center-container">

  

      {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}

      <div className="login-card">
      <div className='signUpText'>Sign Up </div>
        <form className="login-form">
          <input
            autoComplete="off"
            spellCheck="false"
            className="control"
            type="email"
            placeholder="User name "
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            autoComplete="off"
            spellCheck="false"
            className="control"
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            name="password"
            spellCheck="false"
            className="control"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setUserPassword(e.target.value);
              handleChange(e);
            }}
          />

          <div className={`bars ${strength.replace(" ", "-")}`}>
            <div></div>
          </div>

          <div className="strength">{strength && <>{strength} password</>}</div>

          <ul className="helper-text">

            <li className="length">{lengthCondition ? '+ ' : '- '}Must be at least 8 characters long.</li>
            <li className="lowercase">{lowerCondition ? '+ ' : '- '} Must contain a lowercase letter. </li>
            <li className="uppercase">{upperCondition ? '+ ' : '- '}  Must contain an uppercase letter. </li>
            <li className="value">{valueCondition ? '+ ' : '- '}Must contain a value character. </li>
            <li className="special">{specialCondition ? '+ ' : '- '} Must contain a number of special character. </li>
          </ul>

          <button className="control" type="button" onClick={handleSignUp} disabled={!isSignUp}>
            JOIN NOW
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp;