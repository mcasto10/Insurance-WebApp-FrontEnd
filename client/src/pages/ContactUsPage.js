import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageLayout.css';
import ContactUsImage from '../assets/InsuranceCoverImg.png';

import addOffice from '../assets/Additional-Office.png';
import saintPedro from '../assets/SaintPedro-Office.png';
import paremont from '../assets/Paremont-Office.png';
import haberCity from '../assets/HaberCity-Office.png';
import QuickEmailQuote from '../Quote/QuickEmailQoute';

import ZipCode from '../Features/ZipCode';


const ContactUsPage = ({ onZipCodeChange }) => {
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState('Auto');
    const [zipCode, setZipCode] = useState();

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleZipCodeChange = (newZipCode) => {
        setZipCode(newZipCode);
    };

    const handleParamontOfficeClick = () => {
        navigate(`/Agent/Calender?name=Paramount Aris Insurance Service&location=7922 Rosecrans Ave Ste E, Paramount, CA 90723`);
    }

    const handleHaberCityOfficeClick = () => {
        navigate(`/Agent/Calender?name=Harbor City Aris Insurance Service&location=1212 Pacific Coast Hwy, Harbor City, CA 90710`);
    }

    const handleSaintPedroOfficeClick = () => {
        navigate(`/Agent/Calender?name=San Pedro Aris Insurance Service=639 W Channel St, San Pedro, CA 90731`);
    }

    const handleBeginQoute = () => {
        navigate(`/Quote?InsuranceType=${selectedOption}&zipCode=${zipCode}&goToStep=1`)

    }

    return (
        <div className='pageLayout'>
            <div className='flexContainer'>
                <div className='leftContent'>
                    <h1 style={{ fontSize: '60px', color: '#3F5978', marginTop: '10%' }}>  Contact Us </h1>
                    <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '22px' }}>
                        When it comes to protecting the things that are important to us, getting the right insurance protection is essential </p>
                        <p style={{ fontWeight: '300', fontSize: '20px' }}> Get a quick quote now. </p>

                   
                    <div>



                        {/* <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '20px' }}> Get a quick quote now. You may also talk to our agents directly at (310) 256-4748. </p> */}

                        <p> Choose your insurance type </p>
                        <select
                            id="insuranceType"
                            value={selectedOption}
                            onChange={handleSelectChange}
                            className="biggerSelect"
                        >
                            <option value="Auto">Auto Mobile</option>
                            <option value="Homeowners">Homeowners</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Boat">Boat</option>
                            <option value="RV">RV</option>
                            <option value="ClassicCar">Classic Car</option>
                            <option value="Business">Business</option>
                            <option value="CommericalAuto">Commerical Auto</option>
                        </select>
                        <div className="zipcodeButtonContainer">
                            <p> Enter your ZipCode </p>

                            <ZipCode onZipCodeChange={handleZipCodeChange} />
                            <button style={{ backgroundColor: '#3F5978' }} onClick={handleBeginQoute}> Begin Quote </button>
                        </div>
                        <div className="quote-box-section1">
                        </div>
                    </div>


                    <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '20px' }}> You may also talk to our agents directly at <strong> (310) 256-4748 </strong>  or throgugh mail at <strong> customerservice@arisins.com </strong> </p>


                </div>
                <div className='rightContent'>
                    <img style={{ maxWidth: '100%', height: 'auto', marginTop: '15%' }} src={ContactUsImage} alt='ContactUsImage' />
                </div>


            </div>

            <div className='line'> </div>


            {/* <div style={{ textAlign: 'center' }}> */}

            <h1 style={{ fontSize: '60px', color: '#3F5978' }}> Office Location </h1>


            <div>    <p style={{ lineHeight: '2', fontWeight: '300', fontSize: '22px', fontWeight: 'bold', color: '#3F5978'}}>  Make a Appointment </p>


                <div
                    onClick={handleHaberCityOfficeClick}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div className="location-box">
                        <div className='flexContainer'>
                            <div className='leftContent'>
                                <h2 style={{ color: '#3F5978' }}> Harbor City</h2>
                                <p style={{ fontWeight: '300', fontSize: '16px', lineHeight: '1.3'}}>
                                    <strong>Address:</strong> 1212 Pacific Coast HWY Harbor City, CA 90710 <br />
                                    <strong>Personal Line:</strong> (310) 326-4771 <br />
                                    <strong>Commercial Line:</strong> (562) 616-0071 <br />
                                    <strong>Text Message:</strong> (562) 246-9502 <br />
                                    <strong>Fax:</strong> (310) 326-4821
                                </p>
                            </div>

                            <div className='rightContent'>
                                <img src={haberCity} alt={haberCity} style={{ width: '380px', height: '200px', float: 'right' }} />
                            </div>
                        </div>
                    </div>

                </div>


                <div
                    onClick={handleParamontOfficeClick}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div className="location-box">
                        <div className='flexContainer'>
                            <div className='leftContent'>
                                <h2 style={{ color: '#3F5978' }}>  Paramount</h2>
                                <p style={{ fontWeight: '300', fontSize: '16px', lineHeight: '1.3'}}>
                                    <strong>Address:</strong> 7922 Rosecrans Ave Suite E Paramount, CA 90723 <br />
                                    <strong>Personal Line:</strong> (562) 616-0070 <br />
                                    <strong>Commercial Line:</strong> (562) 616-0071 <br />
                                    <strong>Text Message:</strong> (562) 246-9502 <br />
                                    <strong>Fax:</strong> (562) 529-6057
                                </p>

                            </div>

                            <div className='rightContent'>
                                <img src={paremont} alt={paremont} style={{ width: '380px', height: '200px', float: 'right' }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={handleSaintPedroOfficeClick}
                    style={{
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <div className="location-box">
                        <div className='flexContainer'>
                            <div className='leftContent'>
                                <h2 style={{ color: '#3F5978' }}> San Pedro </h2>
                                <p style={{ fontWeight: '300', fontSize: '16px', lineHeight: '1.3'}}>
                                    <strong>Address:</strong> 639 W Channel St Ste F San Pedro, CA 90731 <br />
                                    <strong>Personal Line:</strong> (310) 256-4748 <br />
                                    <strong>Commercial Line:</strong> (562) 616-0071 <br />
                                    <strong>Text Message:</strong> (562) 246-9502
                                </p>
                            </div>


                            <div className='rightContent'>
                                <img src={saintPedro} alt={saintPedro} style={{ width: '380px', height: '200px', float: 'right' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className='line' style={{marginTop: '5%'}}> </div>


            {/* <div style={{ textAlign: 'center' }}> */}

            <h1 style={{ fontSize: '60px', color: '#3F5978' }}> Get in Touch </h1>


            <QuickEmailQuote />



        </div>
    );
};

export default ContactUsPage;
