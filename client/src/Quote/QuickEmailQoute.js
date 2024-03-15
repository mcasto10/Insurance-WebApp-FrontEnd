import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import axios from "axios";

const QuickEmailQuote = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://insurance-webapp-backend.onrender.com/user/quickEmailQuote', formData);
      navigate('/MessageDelivered');
      
    }
     catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-row">
        <div className="input-container">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" onChange={handleChange} required />
        </div>

        <div className="input-container">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" onChange={handleChange} required />
        </div>
      </div>

      <div className="input-row">
        <div className="input-container">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" onChange={handleChange} required />
        </div>

        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />
        </div>
      </div>


      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="5" onChange={handleChange}></textarea>
      </div>

      <input type="submit" value="Send Message" style={{marginTop:'5%', marginBottom: '10%'}} className="button-like-input" />

    </form>
  );
};

export default QuickEmailQuote;
