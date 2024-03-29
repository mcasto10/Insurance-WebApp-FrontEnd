import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const BusinessInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>


            <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Business Information </h2>
            <div className="input-row">

                <div className="input-container">
                    <label htmlFor="businessName"> Business Name:</label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={userInfo.businessName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="owner">Owner (Contact):</label>
                    <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={userInfo.owner}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={userInfo.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="yearsInBusiness">Years in Business:</label>
                    <input
                        type="text"
                        id="yearsInBusiness"
                        name="yearsInBusiness"
                        value={userInfo.yearsInBusiness}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="mailingAddress">Mailing Address:</label>
                    <input
                        type="text"
                        id="mailingAddress"
                        name="mailingAddress"
                        value={userInfo.mailingAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="cityMailing">City (Mailing):</label>
                    <input
                        type="text"
                        id="cityMailing"
                        name="cityMailing"
                        value={userInfo.cityMailing}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="stateMailing">State (Mailing):</label>
                    <input
                        type="text"
                        id="stateMailing"
                        name="stateMailing"
                        value={userInfo.stateMailing}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="zipCodeMailing">Zip Code (Mailing):</label>
                    <input
                        type="text"
                        id="zipCodeMailing"
                        name="zipCodeMailing"
                        value={userInfo.zipCodeMailing}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="garagingAddress">Garaging Address:</label>
                    <input
                        type="text"
                        id="garagingAddress"
                        name="garagingAddress"
                        value={userInfo.garagingAddress}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="cityGaraging">City (Garaging):</label>
                    <input
                        type="text"
                        id="cityGaraging"
                        name="cityGaraging"
                        value={userInfo.cityGaraging}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="stateGaraging">State (Garaging):</label>
                    <input
                        type="text"
                        id="stateGaraging"
                        name="stateGaraging"
                        value={userInfo.stateGaraging}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="zipCodeGaraging">Zip Code (Garaging):</label>
                    <input
                        type="text"
                        id="zipCodeGaraging"
                        name="zipCodeGaraging"
                        value={userInfo.zipCodeGaraging}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="phone">Business Phone:</label>
                    <input
                        type="tel"
                        id="businessPhone"
                        name="businessPhone"
                        value={userInfo.businessPhone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="businessCellPhone">Business Cell Phone:</label>
                    <input
                        type="tel"
                        id="businessCellPhone"
                        name="businessCellPhone"
                        value={userInfo.businessCellPhone}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="fax"> Busines Fax:</label>
                    <input
                        type="tel"
                        id="businesFax"
                        name="businesFax"
                        value={userInfo.businesFax}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="email"> Business Email Address:</label>
                    <input
                        type="email"
                        id="businesEmail"
                        name="businesEmail"
                        value={userInfo.businesEmail}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="radiusOfOperation">Radius of Operation:</label>
                    <input
                        type="text"
                        id="radiusOfOperation"
                        name="radiusOfOperation"
                        value={userInfo.radiusOfOperation}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="currentInsurer">Current Insurer:</label>
                    <input
                        type="text"
                        id="currentInsurer"
                        name="currentInsurer"
                        value={userInfo.currentInsurer}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default BusinessInfo;
