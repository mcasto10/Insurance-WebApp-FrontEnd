import React, { useState } from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Ensure the correct path is used


const HomeOwnerExtraInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prevState => ({
            ...prevState,
            userInsurance: {
                ...prevState.userInsurance,
                [name]: value
            }
        }));
    };


    return (
        <div>

            <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Additional homeowners insurance information </h2>

            <div className="input-row">

                <div className="input-container">
                    <label htmlFor="alarmSys"> Alarm System: </label>
                    <input
                        type="text"
                        id="alarmSys"
                        name="alarmSys"
                        value={userInfo.userInsurance.alarmSys}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="numStories"> Number of Stories: </label>
                    <input
                        type="number"
                        id="numStories"
                        name="numStories"
                        value={userInfo.userInsurance.numStories}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="gateComm"> Gated Community: </label>
                    <input
                        type="text"
                        id="gateComm"
                        name="gateComm"
                        value={userInfo.userInsurance.gateComm}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="homePurchYear"> Year Home was Purchased: </label>
                    <input
                        type="number"
                        id="homePurchYear"
                        name="homePurchYear"
                        value={userInfo.userInsurance.homePurchYear}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="sqFootage"> Square Footage of Residence: </label>
                    <input
                        type="text"
                        id="sqFootage"
                        name="sqFootage"
                        value={userInfo.userInsurance.sqFootage}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="lossFiveYear"> Any losses during the last 5 years </label>
                    <input
                        type="text"
                        id="lossFiveYear"
                        name="lossFiveYear"
                        value={userInfo.userInsurance.lossFiveYear}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="numCarGarage"> Number of Car Garage: </label>
                    <input
                        type="number"
                        id="numCarGarage"
                        name="numCarGarage"
                        value={userInfo.userInsurance.numCarGarage}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="breedOfDog"> Breed of Dog if any: </label>
                    <input
                        type="text"
                        id="breedOfDog"
                        name="breedOfDog"
                        value={userInfo.userInsurance.breedOfDog}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="constructionType"> Construction Type: </label>
                    <input
                        type="text"
                        id="constructionType"
                        name="constructionType"
                        value={userInfo.userInsurance.constructionType}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>

            <div className="input-row">


                <div className="input-container">
                    <label htmlFor="roofType"> Roof Type: </label>
                    <input
                        type="text"
                        id="roofType"
                        name="roofType"
                        value={userInfo.userInsurance.roofType}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="electric"> Electrical: </label>
                    <input
                        type="text"
                        id="electric"
                        name="electric"
                        value={userInfo.userInsurance.electric}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="plumbing"> Plumbing: </label>
                    <input
                        type="text"
                        id="plumbing"
                        name="plumbing"
                        value={userInfo.userInsurance.plumbing}
                        onChange={handleChange}
                        required
                    />
                </div>

            </div>
        </div>
    );
};

export default HomeOwnerExtraInfo;