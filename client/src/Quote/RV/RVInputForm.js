import React, { useState } from 'react';
import { useUserInfo } from '../UserInfoProvider.js'; 

const RVInputForm = () => {
  const [numDriver, setNumDriver] = useState(1);
  const [driverInfo, setDriverInfo] = useState([]);
  const { userInfo, setUserInfo } = useUserInfo(); 

  const handleChangeNumDriver = (event) => {
    const count = parseInt(event.target.value, 10);
    if (count >= 0) {
      setNumDriver(count);
      setUserInfo(prevState => ({
        ...prevState,
        RV: new Array(count).fill({}).map(() => ({
          year: '',
          make: '',
          model: '',
          purchasedPrice: '',
          identificationNumber: '',
          annualMileage: '',
          usage: '',
          locationParked: ''
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
      <label> Number of RV? </label>
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
          <h3> RV - Year {index + 1}</h3>
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

          <select
            value={driverInfo[index]?.usage || ''}
            onChange={(e) => handleInputChange(index, 'usage', e.target.value)}
          >
            <option value="Business">Business</option>
            <option value="Pleasure">Pleasure</option>
          </select>

          <input
            type="text"
            value={driverInfo[index]?.locationParked || ''}
            onChange={(e) => handleInputChange(index, 'locationParked', e.target.value)}
            placeholder="Location RV primarily parked"
          />
          
          {/* Optionally, display filtered RVs based on user input */}
          {driverInfo[index]?.filteredRVs && (
            <ul>
              {driverInfo[index].filteredRVs.map((rv, idx) => (
                <li key={idx}>{rv}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default RVInputForm;