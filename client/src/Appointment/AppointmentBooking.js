// src/components/AppointmentBooking.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string'; // Import queryString

import ConfirmationCheck from '../assets/ConfirmationCheck.png'

const AppointmentBooking = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const guestId = queryParams.guestId;
  const fromAccountSetUp = queryParams.fromAccountSetUp === 'true'; // Ensure comparison is strict

  return (
    <div style={{ textAlign: 'center'}} >
        <img style = {{ marginTop: '1%', width: '160px', height: '150px'}}src = {ConfirmationCheck} alt = 'ConfirmationCheckImg' />
      <h1 style={{fontSize: '55px', color: '#3F5978' }}> Thank you </h1>

      <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px' }}> Your Appointment has been booked </p>

      {fromAccountSetUp && (
        <div>   Finish creating an account <Link to={`/SignUp?guestId=${guestId}&fromAccountSetUp=true`}>SignUp</Link>
        </div>
      )}

    </div>
  );
};

export default AppointmentBooking;
