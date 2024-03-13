
import IphoneImage from '../../assets/MobileApp.png';

import './MobilePhone.css';

export default function MobilePhone() {

    
    return (

        <div className="section3">
            <div style={{ textAlign: 'center' }}>
                <h2> Mobile App for when you're on the go </h2>

                <div className="content">
                    <img src={IphoneImage} alt='IphoneImageMobile' className="IphoneImage" />
                    <p style={{ marginRight: '300px', fontSize: '45px' }}>
                        Coming Soon! </p>
                </div>
            </div>
        </div>
    )
}