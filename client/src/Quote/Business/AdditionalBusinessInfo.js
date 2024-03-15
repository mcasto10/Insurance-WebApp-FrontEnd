import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const AdditionalBusinessInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prevState => ({
            ...prevState,
            coverageRequest: {
                ...prevState.coverageRequest,
                [name]: value
            }
        }));
    };

    return (
        <div>

<h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Addtional Business Information </h2>

            <p> For Additional Units and/or Drivers Contact
                our Underwriting Dept. Commercial lines.
                Drivers Listing </p>
            <div className="input-container">
                <label htmlFor="fullName"> Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userInfo.coverageRequest.fullName}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="licenseNumberState">Full License Number & State:</label>
                <input
                    type="text"
                    id="licenseNumberState"
                    name="licenseNumberState"
                    value={userInfo.coverageRequest.licenseNumberState}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="violationsAccidents">Violations/ Accidents:</label>
                <input
                    type="text"
                    id="violationsAccidents"
                    name="violationsAccidents"
                    value={userInfo.coverageRequest.violationsAccidents}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="yearsExperience">Years Experience:</label>
                <input
                    type="text"
                    id="yearsExperience"
                    name="yearsExperience"
                    value={userInfo.coverageRequest.yearsExperience}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="dateOfBirth">Date of Birthday (optional):</label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={userInfo.coverageRequest.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default AdditionalBusinessInfo;