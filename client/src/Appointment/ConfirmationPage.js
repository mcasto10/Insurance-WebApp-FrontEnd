import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import axios from 'axios';

import './ConfirmationPage.css';
import '../pages/PageLayout.css';


const ConfirmationPage = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const firstName = queryParams.firstName;
  const middleName = queryParams.middleName;
  const lastName = queryParams.lastName;
  const phone = queryParams.phone;
  const email = queryParams.email;
  const zipCode = queryParams.zipCode;
  const address = queryParams.address;
  const city = queryParams.city;
  const state = queryParams.state;
  const message = queryParams.message;
  const bestContact = queryParams.bestContact;

  const officeName = queryParams.officeName;
  const officeLocation = queryParams.officeLocation;
  const appointmentTime = queryParams.appointmentTime;
  const appointmentDate = queryParams.appointmentDate;
  const userId = queryParams.userId;

  // const fromLogin = queryParams.fromLogin === 'true';
  // const fromAccountSetUp = queryParams.fromAccountSetUp === 'true';

  const userData = {
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    phone: phone,
    email: email,
    zipCode: zipCode,
    address: address,
    city: city,
    state: state,
    message: message,
    bestContact: bestContact,
    officeName: officeName,
    officeLocation: officeLocation,
    appointmentTime: appointmentTime,
    appointmentDate: appointmentDate,
    userId: userId
  };
  const handleConfirmation = () => {
    appointmentConfirmation();
    appointmentEmailInfo();

    // if (fromLogin) {
    //   navigate('/Login');
    // }
    // if (fromAccountSetUp) {
    // navigate(`/AppointmentBooking?userId=${userId}&fromAccountSetUp=true`);
    navigate(`/AppointmentBooking?fromAccountSetUp=true`);

    // }
  }

  const appointmentEmailInfo = async () => {

    const params = {
      email: userData.email,
      subject: 'Upcoming Appointment',
      message: {
        officeName: userData.officeName,
        officeLocation: userData.officeLocation,
        appointmentTime: userData.appointmentTime,
        appointmentDate: userData.appointmentDate
      }
    };

    try {
      await axios.post('http://localhost:3001/appointmentEmail/sendEmailAppointment', params);
    } catch (error) {
      console.log(`Appointment Email erorr ${error}`);
    }
  }

  const appointmentConfirmation = async () => {
    try {
      await axios.post('http://localhost:3001/user/post-userAppointment', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontSize: '60px', color: '#3F5978' }}> Appointment Confirmation </h1>
      <div className='pageLayout'>
        <div className='flexContainer'>
          <div className='leftContent'>

            <div style={{ fontSize: '18px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>

              <p style={{ fontSize: '20px' }}> Your Information <div className='line'></div> </p>

              <p> First name: {queryParams.firstName} </p>
              <p> {queryParams.middleName ? `Middle name: ${queryParams.middleName}` : ''} </p>
              <p> Last name: {queryParams.lastName} </p>
              <p> Phone: {queryParams.phone} </p>
              <p> Email: {queryParams.email} </p>
              <p> ZipCode: {queryParams.zipCode} </p>
              <p> State: {queryParams.state} </p>
              <p> Preferred Contact Method: {queryParams.bestContact}</p>
              <p> Addition Information: </p>
              <p> {queryParams.message} </p>

            </div>
          </div>
          <div className='rightContent'>

            <div style={{ fontSize: '18px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <p style={{ fontSize: '20px' }}>Appointment Information</p>
              <div className='line'></div>
              <div style={{ fontSize: '18px' }}>
                <p> Office Location: {officeName} </p>
                <p> Office Address: {officeLocation} </p>
                <p> Appointment Time: {appointmentTime} </p>
                <p> Appoitnment Date: {appointmentDate} </p>
              </div>

            </div>
          </div>
        </div>

        <button className="ConfirButton" onClick={handleConfirmation}> Confirm Appointment </button>
      </div>

    </div>

  );
};

export default ConfirmationPage;
