import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const CommericalAutoInputForm = () => {
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

            <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Addtional Comemrical Auto Insurance Information </h2>


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
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={userInfo.state}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="feiNumber">FEI Number:</label>
                    <input
                        type="text"
                        id="feiNumber"
                        name="feiNumber"
                        value={userInfo.feiNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="dba">DBA:</label>
                    <input
                        type="text"
                        id="dba"
                        name="dba"
                        value={userInfo.dba}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="contactName">Contact Name:</label>
                    <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={userInfo.contactName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="fax">Fax:</label>
                    <input
                        type="tel"
                        id="fax"
                        name="fax"
                        value={userInfo.fax}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userInfo.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="address">Address:</label>
                    <input
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                    ></input>
                </div>
            </div>

            <div className="input-row">

                <div className="input-container">
                    <label htmlFor="zipcode">Zipcode:</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        value={userInfo.zipcode}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="currentInsuranceCompany">Current Insurance Company:</label>
                    <input
                        type="text"
                        id="currentInsuranceCompany"
                        name="currentInsuranceCompany"
                        value={userInfo.currentInsuranceCompany}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="currentPolicyExpirationDate">Current Policy Expiration Date:</label>
                    <input
                        type="date"
                        id="currentPolicyExpirationDate"
                        name="currentPolicyExpirationDate"
                        value={userInfo.currentPolicyExpirationDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="yearsInsured">Number of Years Insured:</label>
                    <input
                        type="text"
                        id="yearsInsured"
                        name="yearsInsured"
                        value={userInfo.yearsInsured}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="claimsInLast3Years">Have you had any claims in the last 3 years (yes or no):</label>
                    <input
                        type="text"
                        id="claimsInLast3Years"
                        name="claimsInLast3Years"
                        value={userInfo.claimsInLast3Years}
                        onChange={handleChange}
                    />
                </div>

                {userInfo.claimsInLast3Years && userInfo.claimsInLast3Years.toLowerCase() === 'yes' && (
                    <div className="input-container">
                        <label htmlFor="numClaims">How many claims and what kind of claims:</label>
                        <input
                            type="text"
                            id="numClaims"
                            name="numClaims"
                            value={userInfo.numClaims}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default CommericalAutoInputForm;
