// import Boat from '../assets/Agents/Boat.png';
import Boat from '../assets/Agents/updatedBoat.png';

import { useNavigate } from 'react-router-dom';
import './PageLayout.css';
import React, { useState, useEffect } from 'react';
import ZipCode from '../Features/ZipCode';


export default function BoatPage() {

    const [selectedOption, setSelectedOption] = useState('Boat');
    const [zipCode, setZipCode] = useState();

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleZipCodeChange = (newZipCode) => {
        setZipCode(newZipCode);
    };

    const navigate = useNavigate();

    const handleBeginQoute = () => {
        navigate(`/Quote?InsuranceType=${selectedOption}&zipCode=${zipCode}&goToStep=1`)

    }

    return (
        <div className='pageLayout'>
            <div className='flexContainer'>

                <div className='leftContent'>
                    <h1 style={{ fontSize: '50px', color: '#3F5978' }}>

                        Boat Insurance </h1>
                    <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px' }}>

                        Whether your boat is for
                        personal or commercial use,
                        have yourself protected with
                        the boat insurance that is
                        appropriate for your need. In
                        the event of collision, fire,
                        pilferage and other untoward
                        accidents, the insurance covers
                        for the damage or loss of the
                        boat or yacht and for any liability
                        claims for personal injuries and
                        property damage arising from the disaster.
                    </p>

                    <div>
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
                </div>

                <div className='rightContent'>
                    <img style={{ maxWidth: '100%', height: 'auto', marginTop: '10%'  }} src={Boat} alt='Boat' />
                </div>
            </div>
        </div>
    )
}