import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const AdditionalBusinessInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prevState => ({
            ...prevState,
            Business: {
                ...prevState.Business,
                AdditionalBusinessInfo: {
                    ...prevState.Business.AdditionalBusinessInfo,
                    [name]: value
                }
            }
        }));
    };

    return (
        <div>
            <div> For Additional Units and/or Drivers Contact
                our Underwriting Dept. Commercial lines.
                Drivers Listing </div>
            <div className="input-container">
                <label htmlFor="fullName"> Full Name:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userInfo.Business.AdditionalBusinessInfo.fullName}
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
                    value={userInfo.Business.AdditionalBusinessInfo.licenseNumberState}
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
                    value={userInfo.Business.AdditionalBusinessInfo.violationsAccidents}
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
                    value={userInfo.Business.AdditionalBusinessInfo.yearsExperience}
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
                    value={userInfo.Business.AdditionalBusinessInfo.dateOfBirth}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default AdditionalBusinessInfo;