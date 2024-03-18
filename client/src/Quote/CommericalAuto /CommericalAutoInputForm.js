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
                    <label htmlFor="commericalName"> Commerical Name:</label>
                    <input
                        type="text"
                        id="commericalName"
                        name="commericalName"
                        value={userInfo.commericalName}
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
                    <label htmlFor="fax"> Commerical Fax:</label>
                    <input
                        type="tel"
                        id="commericalFax"
                        name="commericalFax"
                        value={userInfo.commericalFax}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="phone"> Commerical Phone:</label>
                    <input
                        type="tel"
                        id="commericalPhone"
                        name="commericalPhone"
                        value={userInfo.commericalPhone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="email">Commerical Email:</label>
                    <input
                        type="email"
                        id="commericalEmail"
                        name="commericalEmail"
                        value={userInfo.commericalEmail}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="city">Commerical City:</label>
                    <input
                        type="text"
                        id="commericalCity"
                        name="commericalCity"
                        value={userInfo.commericalCity}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="address"> Commerical Address:</label>
                    <input
                        id="commericalAddress"
                        name="commericalAddress"
                        value={userInfo.commericalAddress}
                        onChange={handleChange}
                    ></input>
                </div>
            </div>

            <div className="input-row">

                <div className="input-container">
                    <label htmlFor="zipcode"> Commerical Zipcode:</label>
                    <input
                        type="text"
                        id="commericalZipCode"
                        name="commericalZipCode"
                        value={userInfo.commericalZipCode}
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
