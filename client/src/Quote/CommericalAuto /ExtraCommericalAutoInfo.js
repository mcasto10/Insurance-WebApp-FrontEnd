import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const ExtraCommericalAutoInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            ExtraCommericalAuto: {
                ...prevState.ExtraCommericalAuto,
                [name]: value,
            },
        }));
    };

    return (
        <div>
            <div className="input-container">
                <label htmlFor="typeOfBusiness"> Type of Business:</label>
                <input
                    type="text"
                    id="typeOfBusiness"
                    name="typeOfBusiness"
                    value={userInfo.ExtraCommericalAuto.typeOfBusiness}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="categoryOfBusiness">Category of Business:</label>
                <select
                    id="categoryOfBusiness"
                    name="categoryOfBusiness"
                    value={userInfo.ExtraCommericalAuto.categoryOfBusiness || ''}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    <option value="Retail">Retail</option>
                    <option value="Wholesale">Wholesale</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Service">Service</option>
                    <option value="Distributor">Distributor</option>
                </select>
            </div>

            <div className="input-container">
                <label htmlFor="businessOperations">Description of Business Operations:</label>
                <textarea
                    id="businessOperations"
                    name="businessOperations"
                    value={userInfo.ExtraCommericalAuto.businessOperations}
                    onChange={handleChange}
                ></textarea>
            </div>
        </div>
    );
}

export default ExtraCommericalAutoInfo;