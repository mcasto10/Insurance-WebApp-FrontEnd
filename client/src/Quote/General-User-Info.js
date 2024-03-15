// GeneralUserInfo.js

import React from 'react';
import { useUserInfo } from './UserInfoProvider';
import './GeneralUserInfo.css';

const GeneralUserInfo = () => {
  const { userInfo, setUserInfo } = useUserInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const charRegex = /^[A-Za-z\s]*$/;
    const charNumRegex = /^[A-Za-z0-9\s]*$/;
    const numericRegex = /^[0-9]*$/;

    let newValue;

    // Apply specific validation for each field
    switch (name) {
      case 'name':
        // Allow only characters for "Contact Name"
        newValue = charRegex.test(value) ? value : userInfo.name || '';
        break;
      case 'address':
      case 'city':
        // Allow characters and numbers for "Address", "Email", "City"
        newValue = charNumRegex.test(value) ? value : userInfo[name] || '';
        break;
      case 'phone':
      case 'fax':
        // Allow only numeric characters for "Phone" and "Fax"
        const maxLength = 10;
        newValue = numericRegex.test(value) ? value.slice(0, maxLength) : userInfo[name] || '';
        break;
      case 'email':
        newValue = value;
        break;
      default:
        // For other fields, use the existing logic
        newValue = value;
    }

    // Update the state
    setUserInfo((prevState) => ({ ...prevState, [name]: newValue, contact: newValue === '' ? undefined : newValue }));
  };

  const renderInputField = (label, name, type = 'text', maxLength, inputMode, pattern) => (
    <div className="input-container">
      <label htmlFor={name}>{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={userInfo[name] || ''}
        onChange={handleChange}
        maxLength={maxLength}
        inputMode={inputMode}
        pattern={pattern}
        required
      />
    </div>
  );

  return (
    <div className="general-user-info-container">
      <h2 style={{ borderBottom: '2px solid #ccc', fontSize: '50px', color: '#3F5978', paddingBottom: '5px' }}>Contact Info</h2>

      <div className="input-row">
        {renderInputField('Contact Name', 'name')}
        {renderInputField('Fax', 'fax', 'text', 10, 'numeric', '[0-9]*')}
      </div>

      <div className="input-row">

        {renderInputField('Phone', 'phone', 'text', 10, 'numeric', '[0-9]*')}

        {renderInputField('City', 'city')}
      </div>

      <div className="input-row">
        {renderInputField('Email', 'email', 'textarea')}

        {renderInputField('ZipCode', 'zipcode', 'textarea', 5, 'numeric', '[0-9]*')}

      </div>



      <div className="input-row">

        {renderInputField('Address', 'address', 'textarea')}


        <div className="input-container">

          <div style={{ color: '#3F5978', fontSize: '18px' }}>Best way to contact you:</div>

          <select
            id="contact"
            value={userInfo.contact || ''}
            onChange={handleChange}
            className="biggerSelectOption"

            required
          >
            <option value=""> Select a option </option>
            <option value="Phone">Phone</option>
            <option value="Email">Email</option>
            <option value="Fax">Fax</option>
          </select>
        </div>
      </div>

    </div>
  );
}

export default GeneralUserInfo;
