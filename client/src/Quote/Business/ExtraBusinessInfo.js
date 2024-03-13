import React from 'react';
import { useUserInfo } from '../UserInfoProvider';  // Update with the correct path

const ExtraBusinessInfo = () => {
    const { userInfo, setUserInfo } = useUserInfo();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setUserInfo(prevState => ({
            ...prevState,
            ExtraBusinessInfo: {
                ...prevState.ExtraBusinessInfo,
                [name]: value
            }
        }));
    };

    return (
        <div>
            <div className="input-container">
                <label htmlFor="commoditiesHauled"> Commodities Hauled and %'s:</label>
                <input
                    type="text"
                    id="commoditiesHauled"
                    name="commoditiesHauled"
                    value={userInfo.ExtraBusinessInfo.commoditiesHauled}
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
                    value={userInfo.ExtraBusinessInfo.iccMCNumber}
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
                    value={userInfo.ExtraBusinessInfo.caDmvMcp}
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
                    value={userInfo.ExtraBusinessInfo.other}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}

export default ExtraBusinessInfo;
