import CommericalAuto from '../assets/Agents/Commerical.png';
import { useNavigate } from 'react-router-dom';
import './PageLayout.css';
import React, { useState, useEffect } from 'react';
import ZipCode from '../Features/ZipCode';


export default function CommericalAutoPage() {

    const [selectedOption, setSelectedOption] = useState('CommericalAuto');
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


                    <h1 style={{ fontSize: '50px', color: '#3F5978' }}> Commerical Auto Insurance </h1>
                    <p style={{ lineHeight: '1.5', fontWeight: '300', fontSize: '18px' }}>
                        Liability claims and damage or loss
                        of your commercial vehicle arising
                        from collision, theft or other accidents
                        are disruptive and financially troubling
                        to your business. Get the commercial
                        automobile insurance that is tailored to
                        the nature and frequency of usage as well
                        as the unique risks that the vehicles are
                        exposed to.
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
                    <img style={{ maxWidth: '100%', height: 'auto', marginTop: '20%' }} src={CommericalAuto} alt='CommericalAuto' />
                </div>
            </div>
        </div>
    )
}