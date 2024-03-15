import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import './AccountSetUp.css';

const AccountSetUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const userID = queryParams.userID;

  const officeName = queryParams.officeName;
  const officeLocation = queryParams.officeLocation;
  const appointmentTime = queryParams.appointmentTime;
  const appointmentDate = queryParams.appointmentDate;

  const fromLogin = queryParams.fromLogin === 'true';
  const fromLoginType = queryParams.fromLoginType === 'true';
  const fromAccountSetUp = queryParams.fromAccountSetUp == 'true';
  const fromEmailVerification = queryParams.fromEmailVerification == 'true';

  const [userData, setUserData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    email: '',
    zipCode: '',
    address: '',
    city: '',
    state: '',
    message: '',
    bestContact: 'Phone'
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const charRegex = /^[A-Za-z\s]*$/;
    const charNumRegex = /^[A-Za-z0-9\s]*$/;
    const numericRegex = /^[0-9]*$/;

    let newValue;

    // Apply specific validation for each field
    switch (name) {
      case 'firstName':
      case 'middleName':
      case 'lastName':
      case 'state':
        // Allow only characters for first, middle, and last names
        newValue = charRegex.test(value) ? value : userData[name] || '';
        break;
      case 'phone':
        // Allow only numeric characters for phone
        const maxLength = 10;
        newValue = numericRegex.test(value) ? value.slice(0, maxLength) : userData[name] || '';
        break;
      case 'address':
      case 'city':
        // Allow characters and numbers for email, address, and city
        newValue = charNumRegex.test(value) ? value : userData[name] || '';
        break;
      case 'zipCode':
        // Allow only numeric characters for zip code
        newValue = numericRegex.test(value) ? value : userData[name] || '';
        break;
        case 'email':
          newValue = value;
          break;
      default:
        // For other fields, use the existing logic
        newValue = value;
    }

    // Update the state
    setUserData((prevState) => ({ ...prevState, [name]: newValue }));
  };


  const handlePreviousClick = async () => {
    navigate(`/Login-Type?officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&routeFrom=LoginPage`);

  }

  const handleNextClick = async (e) => {
    e.preventDefault(); 

    
    if (fromAccountSetUp) {
      const guestInfo = await sendUserDataToServerAsGuest(userData);
      navigate(`/Agent/Appointment/ConfirmationPage?firstName=${userData.firstName}&middleName=${userData.middleName}&lastName=${userData.lastName}&phone=${userData.phone}&officeName=${officeName}&officeLocation=${officeLocation}&appointmentDate=${appointmentDate}&appointmentTime=${appointmentTime}&email=${userData.email}&zipCode=${userData.zipCode}&address=${userData.address}&city=${userData.city}&state=${userData.state}&message=${userData.message}&bestContact=${userData.bestContact}&guestId=${guestInfo}&fromAccountSetUp=true`);
    }

    if (fromEmailVerification) {
      sendUserDataToServerAsUser(userData);
      navigate(`/Login`);
    }

    if (fromLoginType) {
      sendUserDataToServerAsGuest(userData);
      navigate(`/Login`);
    }
  };

  //  We need to check if user information has already been inputted, if yes then we let them know if they want to continoue

  const sendUserDataToServerAsUser = async (userData) => {
    try {
      const responseGuest = await axios.post(`https://insurance-webapp-backend.onrender.com/user/post-userInfo`, userData,
      {
      });

      try {
        await axios.post(`https://insurance-webapp-backend.onrender.com/user/combinedUserInfo`, { user: userID, userInfo: responseGuest.data.data._id }, {
        });
      } catch (error) {
        console.error(error);
      }

      return responseGuest.data.data._id;

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  //  We need to check if user information has already been inputted, if yes then we let them know if they want to continoue
  const sendUserDataToServerAsGuest = async (userData) => {

    try {
      const responseUserInfo = await axios.post(`https://insurance-webapp-backend.onrender.com/user/post-userInfo`, userData, {
      });

      // This is the case when both user information has been added
      const UserIdContent = {
        someUserId: userID,
        someBaseUserId: responseUserInfo.data.data._id,
      }

      try {
        const response = await axios.post(`https://insurance-webapp-backend.onrender.com/user/combinedUserInfo`, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error(error);
      }

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <form className="AccountSetUp-Pos">

      <h2 style={{ textAlign: "center", fontSize: '55px',   color: 'rgb(63, 89, 120)' }}>
        {fromAccountSetUp ? 'Guest Set Up Information' : 'Account Set Up Information'}
      </h2>

      <div className="line"></div>

      <div className="input-row">
      <div className="input-container">
          <label htmlFor="firstName" className="accountSetUpH2"> First Name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userData.firstName}
            onChange={handleInputChange}
            style={{ width: '95%' }}
            // required
          />
        </div>

        <div className="input-container">
          <label htmlFor="middleName" className="accountSetUpH2"> Middle Name: </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={userData.middleName}
            onChange={handleInputChange}
            style={{ width: '95%' }}
            // required
          />
        </div>


        <div className="input-container">
          <label htmlFor="lastName" className="accountSetUpH2"> Last Name: </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userData.lastName}
            onChange={handleInputChange}
            style={{ width: '95%' }}
            // required
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-container">
          <label htmlFor="phone" className="accountSetUpH2"> Phone: </label>
          <input
            type="tel"
            id="phone"
            maxLength={10}
            style={{ width: '95%' }}
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            // required
          />
        </div>


        {/* If coming fromEmailVerification include a email field, but bring the one from the beginning of setting it up?  */}
        {!(fromEmailVerification || fromLogin) && (
          <div className="input-container">
            <label htmlFor="email" className="accountSetUpH2"> Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              style={{ width: '95%' }}
              // required
            ></input>
          </div>
        )}

        <div className="input-container">
          <label htmlFor="bestContact" className="accountSetUpH2"> Best way to contact you </label>
          <select
            id="bestContact"
            name="bestContact"
            value={userData.bestContact}
            onChange={handleInputChange}
            className="accountSetUpSelect"
            style={{ width: '95%' }}
            // required
          >
            <option value="Phone"> Phone </option>
            <option value="Email"> Email </option>
          </select>

        </div>

      </div>

      <div className="input-row">
        <div className="input-container">
          <label htmlFor="zipCode" className="accountSetUpH2"> Zip Code: </label>
          <input
            type="numeric"
            id="zipCode"
            name="zipCode"
            maxLength={5}
            value={userData.zipCode}
            onChange={handleInputChange}
            // required
            style={{ width: '95%' }}
          ></input>
        </div>


     
        <div className="input-container">
        <label htmlFor="city" className="accountSetUpH2"> City: </label>
          <input
            type="text"
            id="city"
            name="city"
            value={userData.city}
            onChange={handleInputChange}
            style={{ width: '95%' }}
            // required
          />
        </div>

        <div className="input-container">
        <label htmlFor="state" className="accountSetUpH2"> State: </label>
          <input
            type="text"
            id="state"
            name="state"
            maxLength={2}
            value={userData.state}
            onChange={handleInputChange}
            // required
            style={{ width: '95%' }}
          />
        </div>
      </div>

      {!(fromAccountSetUp || fromEmailVerification) && (
        <div>
          <label htmlFor="message" className="accountSetUpH2">Message:</label>
          <textarea 
            id="message"
            name="message"
            rows="5"
            value={userData.message}
            onChange={handleInputChange}
            // required
            style={{ width: '100%' }}
          ></textarea>
        </div>
      )}

{fromAccountSetUp && (
  <div className="input-row">
    <button className='Previous-Time-Button' onClick={handlePreviousClick}>Previous</button>
    <button className='Next-Time-Button' onClick={handleNextClick}> Next </button>
  </div>
)}


{!fromAccountSetUp && (
  <div className="input-row">
    <button className='AccountSetUpSubmitButton' onClick={handleNextClick}>
      Submit
    </button>
  </div>
)}

    </form>
  );
};

export default AccountSetUp;
