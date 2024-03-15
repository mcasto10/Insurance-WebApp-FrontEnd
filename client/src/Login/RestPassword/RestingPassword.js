import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import '../Login.css';

const strengthLabels = ["very weak", "weak", "moderate", "strong", "very strong"];


function RestPassword({ Login, error }) {

    const [lengthCondition, setLengthCondition] = useState(false);
    const [lowerCondition, setLowerCondition] = useState(false);
    const [upperCondition, setUpperCondition] = useState(false);
    const [valueCondition, setValueCondition] = useState(false);
    const [specialCondition, setSpecialCondition] = useState(false);

    const [strength, setStrength] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);



    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const navigate = useNavigate();

    const email = queryParams.email;
    const otp = queryParams.otp;


    const [newPassword, setNewPassword] = useState('');

    const requestData = {
        email: email,
        otp: otp,
        newPassword: newPassword,
    };



    // method to handle the submitted information
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://insurance-webapp-backend.onrender.com/forgot_password/reset', requestData);

            // navigate to the EmailVerification page
            navigate('/Login');
        } catch (error) {
            // handle error
            console.error('Error sending OTP:', error);
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
        <div className='center-container'>
            <p className="signUpText"> Rest Your Password </p>

            <div className="login-card">
                <p style={{ fontWeight: '300', fontSize: '20px' }}> Enter your new password </p>
                <div className="password">
                    <input
                        autoComplete="off"
                        spellCheck="false"
                        placeholder="New Password"
                        type="password"
                        name="name"
                        className="control"
                        value={newPassword}
                        onChange={(e) => {
                            handleChange(e);
                            setNewPassword(e.target.value);
                        }}
                    />
                    <div id="spinner" className="spinner"></div>
                </div>

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

                <button className="control" onClick={submitHandler} disabled={!isSignUp} >Continue</button>

                <div className="separator">
                    <div className="line"></div>
                    <p>OR</p>
                    <div className="line"></div>
                </div>

                <div className="box">
                    <div>Don't have an account? <Link className="signup" to="/SignUp">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
}

export default RestPassword;
