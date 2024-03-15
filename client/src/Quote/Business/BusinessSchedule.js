import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const BusinessSchedule = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the setUserInfo logic to handle nested structure
        setUserInfo(prevState => ({
            ...prevState,
                [name]: value
        }));
    };

    return (
        <div> 

<h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Business Schedule </h2>
 
            <div className="input-container">
                <label htmlFor="vehicleYear"> Year:</label>
                <input 
                    type="text" 
                    id="vehicleYear" 
                    name="vehicleYear" 
                    value={userInfo.vehicleYear}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="vehicleMake">Make:</label>
                <input 
                    type="text" 
                    id="vehicleMake" 
                    name="vehicleMake" 
                    value={userInfo.vehicleMake}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="vehicleType">Type:</label>
                <input 
                    type="text" 
                    id="vehicleType" 
                    name="vehicleType" 
                    value={userInfo.vehicleType}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="gvwValue">GVW Value:</label>
                <input 
                    type="text" 
                    id="gvwValue" 
                    name="gvwValue" 
                    value={userInfo.gvwValue}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="deductible">Deductible:</label>
                <input 
                    type="text" 
                    id="deductible" 
                    name="deductible" 
                    value={userInfo.deductible}  
                    onChange={handleChange}  
                    required 
                />
            </div>

        </div>
    );
}

export default BusinessSchedule;
