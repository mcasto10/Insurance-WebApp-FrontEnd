import { useEffect } from 'react';
import ProgressBarStatus from './ProgressBarStatus.js';
// import { UserInfoProvider } from './UserInfoProvider.js';
import { useUserInfo } from './UserInfoProvider.js';
import DriverInputForm from './DriverInputForm.js';
import axios from 'axios';
import queryString from 'query-string';

import { useLocation, useNavigate } from 'react-router-dom';

import QuickEmailQuote from './QuickEmailQoute.js';

import VehicleInputForm from './VehicleInputForm';
import CoverageRequest from './CoverageRequest.js';

// Vehicle

// Home
import HomeOwnerGeneralInfo from './Homeowners/HomeOwnerExtraInfo.js';

// Boat

// Business
import BusinessInfo from './Business/BusinessInfo.js';
import BusinessCoverageRequest from './Business/BusinessCoverageRequest.js';
import ExtraBusinessInfo from './Business/ExtraBusinessInfo.js';
import BusinessSchedule from './Business/BusinessSchedule.js';
import AdditionalBusinessInfo from './Business/AdditionalBusinessInfo.js';

// ClassicCar

// CommericalAuto
import CommericalAutoInputForm from './CommericalAuto /CommericalAutoInputForm.js';
import ExtraCommericalAutoInfo from './CommericalAuto /ExtraCommericalAutoInfo.js';


// MotorCycle 

// RV

import GeneralUserInfo from './General-User-Info.js';
import GeneralUserInsurance from './General-User-Ins.js';
import './Quote.css';

import DisplayAllContent from './DisplayAllContent.js';

import { useFormContext } from './FormProvider';


const Quote = () => {


  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const InsuranceType = queryParams.InsuranceType;
  const zipCode = queryParams.zipCode;
  const goToStep = queryParams.goToStep;
  

  const {
    currentStep,
    totalSteps,
    currentPage,
    hasError,
    inputValue,
    showProgressBar,
    selectedOption,
    handleChange,
    handlePrevious,
    handleNext,
    handleSelectChange,
    handleSubmit,
    selections,
    setCurrentStep,
    setCurrentPage,
    setShowProgressBar
  } = useFormContext();


  useEffect(() => {
    // Set currentStep based on the value of goToStep
    setCurrentStep(goToStep === undefined ? 0 : 1);
    setCurrentPage(goToStep === undefined ? 0 : 1);
    setShowProgressBar(true);

  }, [goToStep, setCurrentStep, setShowProgressBar]);


  const { userInfo } = useUserInfo();

  const handleUserQuote = async () => {
    try {
      await axios.post('https://insurance-webapp-backend.onrender.com/user/sendEmailQuote', { userInfo });


      navigate(`/ConfirmationQoutePage`);
        } catch (error) {
      console.error('Error submitting user info:', error);
    }
    
  };

  const handleLastSubmission = async () => {

    try {

      await axios.post('https://insurance-webapp-backend.onrender.com/user/submitUserInfo', { userInfo });
    } catch (error) {
      console.error('Error submitting user info:', error);
    }

    handleNext();

  };

  return (
    // Setting left and right margins
    <form className="quote-Position" onSubmit={handleSubmit}>
      
      {/* Elements for pages after 0 */}
      {(currentPage > 0) && (
        <div style={{ marginTop: '80px' }}>


          {showProgressBar && <ProgressBarStatus currentStep={currentStep} totalSteps={totalSteps} />}
        </div>
      )}

      {(currentPage === 0) && (
        <div>
          <div className="quote-container">

            <div className='left-column'>
              <div className='startQuoteHeader '>
                Start a new quote
              </div>
            </div>

            {/* Places text in aligned in column */}
            <div className='right-column'>
              <p style = {{color: '#3F5978', fontSize: '18px'}}> Choose your insurance type </p>
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

              <p style = {{color: '#3F5978', fontSize: '18px'}}> 
                Please enter your zip code
              </p>

              {/* Gives the zipcode textbox its features */}
              <div className="md-textbox-Qoute">
                <input
                  value={inputValue}
                  onChange={handleChange}
                  maxLength={5}
                  id="input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className={inputValue ? 'has-value' : ''}
                />
                <label htmlFor="input" >ZipCode</label>

              </div>

              {hasError && <p style={{ color: 'red' }}> Please enter a valid value.</p>}
            </div>
          </div>

          <div>

            <input type="submit" value="Begin Quote" className="beginQouteButton" />

          </div>

          <div className="line"> </div>

          <p style={{ fontSize: '45px', fontWeight: 'bold', color: '#3F5978' }} > Or contact us via cell phone or email </p>

          <p style={{ fontSize: '20px', color: '#3F5978' }}> Get a quick quote now. You may also talk to our agents directly at (310) 256-4748.</p>

          <QuickEmailQuote />

        </div>
      )}

      {/* <UserInfoProvider> */}
      {(currentPage === 1) && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <GeneralUserInfo handleChange={handleChange} />

          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
            {/* <input type="submit" value="Next" className="button-like-input" /> */}
          </div>
        </div>
      )}

      {currentPage === 2 && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <GeneralUserInsurance handleChange={handleChange} />

          <div>
            <button type="button"  className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button"  className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}


      {currentPage === 3 && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <CoverageRequest handleChange={handleChange} />

          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button"  className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}


      {/* Everything besides home and business */}
      {currentPage === 4 && !(selections.Homeowners || selections.Business) && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <DriverInputForm handleChange={handleChange} />

          <div>
            <button type="button"  className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>

            <button type="button"  className="button-QuotePage" onClick={handleNext}>
              Next
            </button>

            {/* <input type="submit" value="Next" className="button-like-input" onClick={handleLastSubmission} /> */}
          </div>
        </div>
      )}

      {/* Auto, Boat, ClassicCar, MotorCycle, RV */}
      {currentPage === 5 && (selections.Auto || selections.Boat || selections.ClassicCar || selections.Motorcycle || selections.RV) && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <VehicleInputForm handleChange={handleChange} />

          <div>
            <button type="button"  className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button"  className="button-QuotePage" onClick={handleLastSubmission}>
              Submit 
            </button>
          </div>
        </div>
      )}


      {/* Home Insurance Info */}
      {currentPage === 4 && selections.Homeowners && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <HomeOwnerGeneralInfo handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage"  onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleLastSubmission}>
              Submit 
            </button>
          </div>
        </div>
      )}

      {/* Business */}
      {currentPage === 4 && selections.Business && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <BusinessInfo handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {currentPage === 5 && selections.Business && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <ExtraBusinessInfo handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage"  onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage"  onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {currentPage === 6 && selections.Business && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <BusinessCoverageRequest handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {currentPage === 7 && selections.Business && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <AdditionalBusinessInfo handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}


      {currentPage === 8 && selections.Business && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <BusinessSchedule handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

{currentPage === 5 && (selections.CommericalAuto) && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}> {/* Add margin top and bottom */}
          <VehicleInputForm handleChange={handleChange} />

          <div>
            <button type="button"  className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>

            <button type="button" className="button-QuotePage" onClick={handleNext}>

              Next 
            </button>
          </div>
        </div>
      )}



      {/* CommericalAuto */}
      {currentPage === 6 && selections.CommericalAuto && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <ExtraCommericalAutoInfo handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button" className="button-QuotePage" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      )}

      {currentPage === 7 && selections.CommericalAuto && (
        <div style={{ marginBottom: '35px', marginTop: '95px' }}>
          <CommericalAutoInputForm handleChange={handleChange} />
          <div>
            <button type="button" className="button-QuotePage" onClick={handlePrevious}>
              Previous
            </button>
            <button type="button"  className="button-QuotePage" onClick={handleLastSubmission}>
              Submit
            </button>
          </div>
        </div>
      )}


      {/* Should be one less then the actual finish becuase it starts at 0 */}
      {((currentPage === 8 && selections.CommericalAuto) ||
        (currentPage === 9 && selections.Business) ||
        (currentPage === 5 && selections.Homeowners) ||
        (currentPage === 6 && (selections.Auto || selections.RV || selections.Boat || selections.ClassicCar || selections.Motorcycle))) && (
          <div style={{ marginBottom: '35px', marginTop: '95px' }}>

            <DisplayAllContent />

            <div>
              <button type="button" className="button-QuotePage" onClick={handlePrevious}>
                Previous
              </button>


              <div style={{fontWeight: 'bold', fontSize: '25px'}}> To Get A Price </div>
              <button type="button" className="button-QuotePage" onClick={handleUserQuote}>
                Contact Agent </button>

            </div>
          </div>
        )}

      {/* </UserInfoProvider> */}

    </form>
  )
}

export default Quote;
