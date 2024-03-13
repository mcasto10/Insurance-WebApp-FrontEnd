import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const BusinessSchedule = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the setUserInfo logic to handle nested structure
        setUserInfo(prevState => ({
            ...prevState,
            BusinessSchedule: {
                ...prevState.BusinessSchedule,
                [name]: value
            }
        }));
    };

    return (
        <div> 
            <div className="input-container">
                <label htmlFor="vehicleYear"> Year:</label>
                <input 
                    type="text" 
                    id="vehicleYear" 
                    name="vehicleYear" 
                    value={userInfo.BusinessSchedule.vehicleYear}  
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
                    value={userInfo.BusinessSchedule.vehicleMake}  
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
                    value={userInfo.BusinessSchedule.vehicleType}  
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
                    value={userInfo.BusinessSchedule.gvwValue}  
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
                    value={userInfo.BusinessSchedule.deductible}  
                    onChange={handleChange}  
                    required 
                />
            </div>

        </div>
    );
}

export default BusinessSchedule;
