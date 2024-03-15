import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const ExtraBusinessInfo = () => {
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
           <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Additional Business Information </h2>

            <div className="input-container">
                <label htmlFor="commoditiesHauled"> Commodities Hauled and %'s:</label>
                <input
                    type="text"
                    id="commoditiesHauled"
                    name="commoditiesHauled"
                    value={userInfo.commoditiesHauled}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="iccMCNumber">ICC MC#:</label>
                <input
                    type="text"
                    id="iccMCNumber"
                    name="iccMCNumber"
                    value={userInfo.iccMCNumber}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="caDmvMcp">CA DMV MCP65:</label>
                <input
                    type="text"
                    id="caDmvMcp"
                    name="caDmvMcp"
                    value={userInfo.caDmvMcp}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-container">
                <label htmlFor="other">Other:</label>
                <input
                    type="text"
                    id="other"
                    name="other"
                    value={userInfo.other}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ExtraBusinessInfo;
