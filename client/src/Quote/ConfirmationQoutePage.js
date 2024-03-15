import React from 'react';
import ConfirmationCheck from '../assets/ConfirmationCheck.png'

const ConfirmationQoutePage = () => {
  return (
    <div style={{ textAlign: 'center'}} >
        <img style = {{ marginTop: '1%', width: '160px', height: '150px'}}src = {ConfirmationCheck} alt = 'ConfirmationCheckImg' />
      <h1 style={{fontSize: '55px', color: '#3F5978' }}> Thank you </h1>

      <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px' }}> Your Qoute has been sent to our Agents. < br /> We will contact you soon </p>

    </div>
  );
};

export default ConfirmationQoutePage;
