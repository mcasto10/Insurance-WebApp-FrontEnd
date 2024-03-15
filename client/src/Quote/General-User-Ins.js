import React from 'react';
import { useUserInfo } from './UserInfoProvider';  // Ensure the correct path is used
import { useFormContext } from './FormProvider';

const GeneralInsInfo = () => {

  const {
    selections
  } = useFormContext();

  const { userInfo, setUserInfo } = useUserInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const charNumRegex = /^[A-Za-z0-9\s]*$/;
    const charRegex = /^[A-Za-z\s]*$/;
    const numericRegex = /^[0-9]*$/;

    let newValue;



    switch (name) {
      case 'currentIns':
        newValue = charNumRegex.test(value) ? value : userInfo.userInsurance.currentIns || '';
        break;
      case 'numIns':
      case 'loanAmount':
        newValue = numericRegex.test(value) ? value : userInfo.userInsurance[name] || '';
        break;
      default:
        newValue = value;
    }

    setUserInfo(prevState => ({
      ...prevState,
      userInsurance: {
        ...prevState.userInsurance,
        [name]: newValue,
        numClaim: newValue = '' ? undefined : newValue
      }
    }));
  };


  return (
    <div>

      <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> General Insurance Information </h2>

      {/* Auto, Home, Boat, Motorcycle, RV, Classic Car */}

      <div className="input-container">
        <label htmlFor="currentIns"> Current Insurance Company: </label>
        <input
          type="text"
          id="currentIns"
          name="currentIns"
          value={userInfo.userInsurance.currentIns || ''}
          onChange={handleChange}
          required
        />
      </div>

      {/* Auto, Home, Boat, Motorcycle, RV, Classic Car */}
      <div className="input-container">
        <label htmlFor="CurrentExp">Current Policy Expiration Date:</label>
        <input
          type="date"
          id="CurrentExp"
          name="CurrentExp"
          value={userInfo.userInsurance.CurrentExp || ''}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Auto, Home, Boat, Motorcycle, ClassicCar */}
      {(selections.Auto || selections.Homeowners || selections.Boat || selections.Motorcycle || selections.ClassicCar) && (
        <div className="input-container">
          <label htmlFor="NumberOfYearsInsured">Number of Years Insured:</label>
          <input

            // There might be a issue with this code since the textbox doesn't work for it
            // value={
            //   selections.Auto && userInfo.Auto && userInfo.Auto.userInsurance
            //     ? userInfo.Auto.userInsurance.numIns || ''
            //     : selections.Homeowners && userInfo.Homeowners && userInfo.Homeowners.userInsurance
            //       ? userInfo.Homeowners.userInsurance.numIns || ''
            //       : selections.Boat && userInfo.Boat && userInfo.Boat.userInsurance
            //         ? userInfo.Boat.userInsurance.numIns || ''
            //         : selections.ClassicCar && userInfo.ClassicCar && userInfo.ClassicCar.userInsurance
            //           ? userInfo.ClassicCar.userInsurance.numIns || ''
            //           : selections.Motorcycle && userInfo.Motorcycle && userInfo.Motorcycle.userInsurance
            //             ? userInfo.Motorcycle.userInsurance.numIns || ''
            //             : userInfo.userInsurance.numIns || ''  // Fallback to the general numIns property
            // }

            value={userInfo.userInsurance.numIns || ''}
            onChange={handleChange}
            maxLength={2}
            id="numIns"
            type="text"
            inputMode="numeric"
            name="numIns"
            pattern="[0-9]*"
          />

        </div>
      )}



      {/* ClassicCar  */}
      {selections.ClassicCar && (
        <div className="input-container">
          <label htmlFor="numClaim"> Have you had any claims: </label>
          <select
            id="numClaim"
            name="numClaim"
            value={userInfo.userInsurance.numClaim || ''}
            onChange={handleChange}
            className="biggerSelectOption"
            style={{marginBottom: '10px'}}
          >
            <option value="">Select a choose </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>


      )}

      {/* Home */}
      {selections.Homeowners && (
        <div className="input-container">
          <label htmlFor="loanAmount"> Loan Amount: </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            inputMode="numeric"
            pattern="[0-9]*"

            value={userInfo.userInsurance.loanAmount || ''}
            // value={userInfo.Homeowners && userInfo.Homeowners.userInsurance.loanAmount}
            // value={userInfo.Homeowners && userInfo.Homeowners.userInsurance.loanAmount || ''}

            onChange={handleChange}
            required
          ></input>
        </div>
      )}


    </div>
  );
}

export default GeneralInsInfo;
