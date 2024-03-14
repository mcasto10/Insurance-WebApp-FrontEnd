// import PersonAuto from '../assets/Agents/CommonVehicle.png';

import PersonalAuto from '../assets/Agents/updatedVehicle.png';



import { useNavigate } from 'react-router-dom';
import './PageLayout.css';
import React, { useState } from 'react';

import ZipCode from '../Features/ZipCode';

export default function AutoPage() {
  const [selectedOption, setSelectedOption] = useState('Auto');
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

          <h1 style={{ fontSize: '50px', color: '#3F5978' }}> Automobile Insurance </h1>
          <p style={{ lineHeight: '1.5', fontWeight: '300', color:'#3F5978', fontSize: '18px' }}>
            Car accidents can be emotionally and financially distressing.
            Secure yourself and your family by getting automobile insurance
            that can aptly compensate for any damage or loss brought to the
            car as well as for claims arising from accident-related bodily
            injuries and property damage in case of collision, theft, fire
            and other perils.
          </p>

          <div>
          <p className='PagesHeaderLayout'> Choose your insurance type </p>
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
            <p className='PagesHeaderLayout'> Enter your ZipCode </p>

              <ZipCode onZipCodeChange={handleZipCodeChange} />
              <button style={{ backgroundColor: '#3F5978' }} onClick={handleBeginQoute}> Begin Quote </button>
            </div>
            <div className="quote-box-section1">
            </div>
          </div>
        </div>
        <div className='rightContent'>

  <img style={{ maxWidth: '100%', height: 'auto', marginTop: '20%' }} src={PersonalAuto} alt='Personal-Auto' />
</div>


      </div>
    </div>
  );
}
