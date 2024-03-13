import React, { useState } from 'react';
import './ZipCode.css';

const ZipCode = ({ onZipCodeChange }) => {
  const [zipCode, setZipCode] = useState('');

  const handleZipCodeChange = (event) => {
    const newZipCode = event.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(newZipCode);
    onZipCodeChange(newZipCode); 
  };

  return (
    <div className="md-zipCode-textbox">
      <input
        maxLength={5}
        id="input"
        type="text"
        value={zipCode}
        inputMode="numeric"
        pattern="[0-9]*"  
        className={zipCode ? 'has-value' : ''}
        onChange={handleZipCodeChange}
      />
      <label htmlFor="input">ZipCode</label>
      
    </div>
    
  );
};

export default ZipCode;
