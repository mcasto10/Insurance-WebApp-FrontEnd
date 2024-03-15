import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const ExtraCommericalAutoInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo((prevState) => ({
            ...prevState,
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div>

            <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Comemrical Auto Insurance Information </h2>

            <div className="input-container">
                <label htmlFor="typeOfBusiness"> Type of Business:</label>
                <input
                    type="text"
                    id="typeOfBusiness"
                    name="typeOfBusiness"
                    value={userInfo.typeOfBusiness}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="categoryOfBusiness">Category of Business:</label>
                <select
                    id="categoryOfBusiness"
                    name="categoryOfBusiness"
                    className="biggerSelectOption"

                    value={userInfo.categoryOfBusiness || ''}
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
                <input
                    id="businessOperations"
                    name="businessOperations"
                    value={userInfo.businessOperations}
                    onChange={handleChange}
                ></input>
            </div>
        </div>
    );
}

export default ExtraCommericalAutoInfo;