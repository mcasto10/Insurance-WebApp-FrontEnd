import React, { useState } from 'react';
import { useUserInfo } from '../UserInfoProvider.js'; 

const MotorCycleInputForm = () => {
  const [numDriver, setNumDriver] = useState(1);
  const [driverInfo, setDriverInfo] = useState([]);
  const [error, setError] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo(); 

  const handleChangeNumDriver = (event) => {
    const count = parseInt(event.target.value, 10);
    if (count >= 0) {
      setNumDriver(count);
      setUserInfo(prevState => ({
        ...prevState,
        motorCycleExtra: new Array(count).fill({}).map(() => ({
          year: '',
          make: '',
          model: '',
          purchasedPrice: '', // Added purchased price
          identificationNumber: '', // Added identification number
          annualMileage: '', // Added annual mileage
          customParts: '', // Added custom parts
          usage: ''
        }))
      }));
    }
  };

  const handleInputChange = (index, field, value) => {
    setDriverInfo(prevState => {
      const updatedInfo = [...prevState];
      updatedInfo[index] = {
        ...updatedInfo[index],
        [field]: value
      };
      return updatedInfo;
    });
  };

  return (
    <div>
      <label> Number of MotorCycle? </label>
      <select
        id="numDriver"
        value={numDriver}
        onChange={handleChangeNumDriver}
      >
        {[...Array(9)].map((_, index) => (
          <option key={index} value={index + 1}>{index + 1}</option>
        ))}
      </select>

      {[...Array(numDriver)].map((_, index) => (
        <div key={index}>
          <h3> MotorCycle - Year {index + 1}</h3>
          <input
            type="text"
            value={driverInfo[index]?.year || ''}
            onChange={(e) => handleInputChange(index, 'year', e.target.value)}
            placeholder="Year"
          />
          
          <input
            type="text"
            value={driverInfo[index]?.make || ''}
            onChange={(e) => handleInputChange(index, 'make', e.target.value)}
            placeholder="Make"
          />

          <input
            type="text"
            value={driverInfo[index]?.model || ''}
            onChange={(e) => handleInputChange(index, 'model', e.target.value)}
            placeholder="Model"
          />

          <input
            type="text"
            value={driverInfo[index]?.purchasedPrice || ''}
            onChange={(e) => handleInputChange(index, 'purchasedPrice', e.target.value)}
            placeholder="Purchased Price"
          />

          <input
            type="text"
            value={driverInfo[index]?.identificationNumber || ''}
            onChange={(e) => handleInputChange(index, 'identificationNumber', e.target.value)}
            placeholder="Identification Number"
          />

          <input
            type="text"
            value={driverInfo[index]?.annualMileage || ''}
            onChange={(e) => handleInputChange(index, 'annualMileage', e.target.value)}
            placeholder="Annual Mileage"
          />

          <input
            type="text"
            value={driverInfo[index]?.customParts || ''}
            onChange={(e) => handleInputChange(index, 'customParts', e.target.value)}
            placeholder="Custom Parts or Equipment"
          />

          <select
            value={driverInfo[index]?.usage || ''}
            onChange={(e) => handleInputChange(index, 'usage', e.target.value)}
          >
            <option value="Business">Business</option>
            <option value="Pleasure">Pleasure</option>
          </select>
          
          {/* Optionally, display filtered cars based on user input */}
          {driverInfo[index]?.filteredCars && (
            <ul>
              {driverInfo[index].filteredCars.map((car, idx) => (
                <li key={idx}>{car}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MotorCycleInputForm;
