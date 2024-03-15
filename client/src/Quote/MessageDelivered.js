// src/components/AppointmentBooking.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import ConfirmationCheck from '../assets/ConfirmationCheck.png'

const MessageDelivered = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const guestId = queryParams.guestId;
  const fromAccountSetUp = queryParams.fromAccountSetUp === 'true'; // Ensure comparison is strict

  return (
    <div style={{ textAlign: 'center'}} >
        <img style = {{ marginTop: '1%', width: '160px', height: '150px'}}src = {ConfirmationCheck} alt = 'ConfirmationCheckImg' />
      <h1 style={{fontSize: '55px', color: '#3F5978' }}> Thank you </h1>

      <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px' }}> Your message has been delivered, we will contact you as soon as possible </p>

    </div>
  );
};

export default MessageDelivered;
