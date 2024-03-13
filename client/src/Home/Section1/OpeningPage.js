import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';

import ZipCode from '../../Features/ZipCode.js';
import HomeImage from '../../assets/Agents/MostUpdated.png';
import './OpeningPage.css';

export default function OpeningPage() {
    const [zipCode, setZipCode] = useState();
    const [selectedOption, setSelectedOption] = useState('Auto');


    const handleZipCodeChange = (newZipCode) => {
        setZipCode(newZipCode);
    };

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };
    


    const handleBeginQoute = () => {
        navigate(`/Quote?InsuranceType=${selectedOption}&zipCode=${zipCode}&goToStep=1`)

    }

    const navigate = useNavigate();



    return (
        <div className="headerContainer">
            <p className="openingText"> Welcome to the Family, time to save </p>
            <div className="section1">
                <p style={{ fontSize: '19px' }}> Find a insurance quote that is perfect for you </p>
                <p> Choose your insurance type </p>
                <select
                    id="insuranceType"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="homebiggerSelect"
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

                    <ZipCode onZipCodeChange={handleZipCodeChange} />
                    <button style={{ backgroundColor: '#3F5978' }} onClick={handleBeginQoute}> Begin Quote </button>
                </div>

                <div className="quote-box-section1">


                    <p>
                        Discover ARIS, your ultimate destination for comprehensive insurance solutions tailored
                        to your unique needs.
                        {/* Entrust us with the shopping process, where expertise meets care, ensuring you find the perfect 
            coverage effortlessly. */}
                    </p>

                    <p>
                        Get your FREE QUOTE NOW.
                        <br />
                        (310) 256-4748
                    </p>

                </div>


                <img className="homeImage" src={HomeImage} alt="Insurance Cover" />

            </div>
        </div>
    )
}
