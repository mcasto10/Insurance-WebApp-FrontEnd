import React, { useState } from 'react';
import CarSearchBar from '../CarSearchBar.js';
import { useUserInfo } from '../UserInfoProvider.js';
import './AutoMobileInputForm.css'; // Import your CSS file for styling

const AutoMobileInputForm = () => {
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
        vehicles: new Array(count).fill({}).map(() => ({
          year: '',
          make: '',
          value: '',
          model: '',
          usage: '',
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
    <div className="automobile-input-form">
      <label> Number of Vehicles? </label>
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
        <div key={index} className="vehicle-container">
          <h3> Vehicle {index + 1}</h3>
          <input
            type="text"
            value={driverInfo[index]?.year || ''}
            onChange={(e) => handleInputChange(index, 'year', e.target.value)}
            placeholder="Year"
          />

          <select
            value={driverInfo[index]?.make || ''}
            onChange={(e) => handleInputChange(index, 'make', e.target.value)}
          >
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
          </select>

          <input
            type="text"
            value={driverInfo[index]?.value || ''}
            onChange={(e) => handleInputChange(index, 'value', e.target.value)}
            placeholder="Value"
          />

          <input
            type="text"
            value={driverInfo[index]?.model || ''}
            onChange={(e) => handleInputChange(index, 'model', e.target.value)}
            placeholder="Model"
          />

          <select
            value={driverInfo[index]?.usage || ''}
            onChange={(e) => handleInputChange(index, 'usage', e.target.value)}
          >
            <option value="commute">Commute</option>
            <option value="pleasure">Pleasure</option>
            <option value="business">Business</option>
          </select>

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

export default AutoMobileInputForm;
