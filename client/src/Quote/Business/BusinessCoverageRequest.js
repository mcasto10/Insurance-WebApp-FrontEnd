import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const BusinessCoverageRequest = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevState => ({
            ...prevState,
            businessCoverageInfo: {
                ...prevState.businessCoverageInfo,
                [name]: value
            }
        }));
    };

    return (
        <div> 
            <div className="input-container">
                <label htmlFor="liabilityLimit"> Liability Limit:</label>
                <input 
                    type="text" 
                    id="liabilityLimit" 
                    name="liabilityLimit" 
                    value={userInfo.businessCoverageInfo.liabilityLimit}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="cargoLimit">Cargo Limit:</label>
                <input 
                    type="text" 
                    id="cargoLimit" 
                    name="cargoLimit" 
                    value={userInfo.businessCoverageInfo.cargoLimit}  
                    onChange={handleChange}  
                    required 
                />
            </div>
  
            <div className="input-container">
                <label htmlFor="physicalDamage">Physical Damage:</label>
                <input 
                    type="text" 
                    id="physicalDamage" 
                    name="physicalDamage" 
                    value={userInfo.businessCoverageInfo.physicalDamage}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="generalLiabilityLimit">General Liability Limit:</label>
                <input 
                    type="text" 
                    id="generalLiabilityLimit" 
                    name="generalLiabilityLimit" 
                    value={userInfo.businessCoverageInfo.generalLiabilityLimit}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="unidentitidesNoneOwnedTrailer">Unidentitides/None Owned Trailer:</label>
                <input 
                    type="text" 
                    id="unidentitidesNoneOwnedTrailer" 
                    name="unidentitidesNoneOwnedTrailer" 
                    value={userInfo.businessCoverageInfo.unidentitidesNoneOwnedTrailer}  
                    onChange={handleChange}  
                    required 
                />
            </div>

            <div className="input-container">
                <label htmlFor="trailerInterchange">Trailer Interchange:</label>
                <input 
                    type="text" 
                    id="trailerInterchange" 
                    name="trailerInterchange" 
                    value={userInfo.businessCoverageInfo.trailerInterchange}  
                    onChange={handleChange}  
                    required 
                />
            </div>

        </div>
    );
}

export default BusinessCoverageRequest;
