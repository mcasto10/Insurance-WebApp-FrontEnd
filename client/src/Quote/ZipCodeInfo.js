import React from 'react';

const ZipCodeInfo = ({ inputValue, handleChange }) => {
  
  return (
    <div className="md-textbox">
      <input
        value={inputValue}
        onChange={handleChange}
        maxLength={5}
        id="input"
        type="text"
        className={inputValue ? 'has-value' : ''}
      />
      <label htmlFor="input">ZipCode</label>
    </div>
  );
};

export default ZipCodeInfo;
