import React from 'react';
import { useUserInfo } from './UserInfoProvider';  // Update with the correct path

const VehicleCommericalAuto = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the setUserInfo logic to handle nested structure
        setUserInfo(prevState => ({
            ...prevState,
            CommericalAuto: {
                ...prevState.CommericalAuto,
                [name]: value
            }
        }));
    };

    return (
        <div> 
            <div className="input-container">
                <label htmlFor="autoYear"> Auto - Year:</label>
                <input 
                    type="text" 
                    id="autoYear" 
                    name="autoYear" 
                    value={userInfo.CommericalAuto.autoYear}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="autoMake">Auto - Make:</label>
                <input 
                    type="text" 
                    id="autoMake" 
                    name="autoMake" 
                    value={userInfo.CommericalAuto.autoMake}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="autoModel">Auto - Model:</label>
                <input 
                    type="text" 
                    id="autoModel" 
                    name="autoModel" 
                    value={userInfo.CommericalAuto.autoModel}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="vehicleValue">Value of the vehicle:</label>
                <input 
                    type="text" 
                    id="vehicleValue" 
                    name="vehicleValue" 
                    value={userInfo.CommericalAuto.vehicleValue}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="vehicleIdentificationNumber">Vehicle identification Number:</label>
                <input 
                    type="text" 
                    id="vehicleIdentificationNumber" 
                    name="vehicleIdentificationNumber" 
                    value={userInfo.CommericalAuto.vehicleIdentificationNumber}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="vehiclesUsedFor">Vehicle(s) Used For:</label>
                <input 
                    type="text" 
                    id="vehiclesUsedFor" 
                    name="vehiclesUsedFor" 
                    value={userInfo.CommericalAuto.vehiclesUsedFor}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="radiusOfDriving">Radius of Driving:</label>
                <select
                    id="radiusOfDriving"
                    name="radiusOfDriving"
                    value={userInfo.CommericalAuto.radiusOfDriving || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a radius</option>
                    <option value="0-50 miles">0-50 miles</option>
                    <option value="50-100 miles">50-100 miles</option>
                    <option value="100-200 miles">100-200 miles</option>
                </select>
            </div>
        </div>
    );
}

export default VehicleCommericalAuto;
