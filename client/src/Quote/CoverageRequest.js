import React from 'react';
import { useUserInfo } from './UserInfoProvider'; // Ensure the correct path is used
import { useFormContext } from './FormProvider';

const CoverageRequest = () => {
  const { selections } = useFormContext();
  const { userInfo, setUserInfo } = useUserInfo();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const charNumRegex = /^[A-Za-z0-9\s]*$/;
    const charRegex = /^[A-Za-z\s]*$/;
    const numericRegex = /^[0-9]*$/;

    let newValue;

    switch (name) {
      case 'bodyInj':
        newValue = charRegex.test(value) ? value : userInfo.coverageRequest.bodyInj || '';
        break;
      case 'propDamage':
      case 'uniMotor':
      case 'medPay':
        newValue = numericRegex.test(value) ? value : userInfo.coverageRequest[name] || '';
        break;
      default:
        newValue = value;
    }


    setUserInfo((prevState) => ({
      ...prevState,
      coverageRequest: {
        ...prevState.coverageRequest,
        [name]: newValue
      }
    }));
  };

  return (
    <div>

      <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '5px', fontSize: '50px', color: '#3F5978' }}> Coverage Request  </h2>

 


      {/* Auto, Motorcycle */}
      {(selections.Auto || selections.Motorcycle) && (
        <div>
          <div className="input-container">
            <label htmlFor="bodyInj"> Bodily Injury Liability: </label>
            <input
              // value={
              //   selections.Auto
              //     ? (userInfo.Auto && userInfo.Auto.coverageRequest && userInfo.Auto.coverageRequest.bodyInj) || ''
              //     : selections.Motorcycle
              //       ? (userInfo.Motorcycle && userInfo.Motorcycle.coverageRequest && userInfo.Motorcycle.coverageRequest.bodyInj) || ''
              //       : ''
              // }

              //         value={
              //   selections.Auto && userInfo.Auto && userInfo.Auto.coverageRequest
              //     ? userInfo.Auto.coverageRequest.bodyInj || ''
              //     : ''
              // }


              value={userInfo.coverageRequest.bodyInj || ''}

              onChange={handleChange}
              type="text"
              id="bodyInj"
              name="bodyInj"
            />
          </div>

          <div className="input-container">
            <label htmlFor="propDamage"> Property Damage: </label>
            <input
              type="number"
              id="propDamage"
              name="propDamage"
              // value={
              //   selections.Auto
              //     ? (userInfo.Auto && userInfo.Auto.coverageRequest.propDamage) || ''
              //     : selections.Motorcycle
              //       ? (userInfo.Motorcycle && userInfo.Motorcycle.coverageRequest.propDamage) || ''
              //       : userInfo.coverageRequest.propDamage || ''
              // }

              value={userInfo.coverageRequest.propDamage || ''}

              onChange={handleChange}
            // required
            />
          </div>
          
          <div className="input-container">
            <label htmlFor="uniMotor"> Uninsured Motorists Limits </label>
            <input
              id="uniMotor"
              name="uniMotor"
              // value={
              //   selections.Auto
              //     ? (userInfo.Auto && userInfo.Auto.coverageRequest.uniMotor) || ''
              //     : selections.Motorcycle
              //       ? (userInfo.Motorcycle && userInfo.Motorcycle.coverageRequest.uniMotor) || ''
              //       : userInfo.coverageRequest.uniMotor || ''
              // }

              value={userInfo.coverageRequest.uniMotor || ''}

              onChange={handleChange}
            // required
            />
          </div>

        </div>
      )}

      {/* Auto, Motorcycle, RV, Home, Boat, ClassicCar*/}
      {(selections.Auto || selections.Homeowners || selections.Boat || selections.Motorcycle || selections.ClassicCar) && (
        <div className="input-container">
          <label htmlFor="medPay"> Medical Payment:</label>
          <input
            type="number"
            id="medPay"
            name="medPay"
            // value={
            //   selections.Auto
            //     ? (userInfo.Auto && userInfo.Auto.coverageRequest.medPay) || ''
            //     : selections.Homeowners
            //       ? (userInfo.Homeowners && userInfo.Homeowners.coverageRequest.medPay) || ''
            //       : selections.ClassicCar
            //         ? (userInfo.ClassicCar && userInfo.ClassicCar.coverageRequest.medPay) || ''
            //         : selections.Motorcycle
            //           ? (userInfo.Motorcycle && userInfo.Motorcycle.coverageRequest.medPay) || ''
            //           : selections.Boat ? (userInfo.Boat && userInfo.Boat.coverageRequest.medPay) || ''
            //             : userInfo.coverageRequest.medPay || ''

            // }

            value={userInfo.coverageRequest.medPay || ''}

            onChange={handleChange}
          // required
          />
        </div>
      )}

      {/* Home, Boat */}
      {(selections.Boat || selections.Homeowners) && (
        <>
          <div className="input-container">
            <label htmlFor="dwellingAmount">Dwelling Amount:</label>
            <input
              type="number"
              id="dwellingAmount"
              name="dwellingAmount"
              // value={selections.Homeowners ? (userInfo.Homeowners && userInfo.Homeowners.coverageRequest.dwellingAmount) || '' :
              //   selections.Boat ? (userInfo.Boat && userInfo.Boat.coverageRequest.dwellingAmount) || ''
              //     : userInfo.coverageRequest.dwellingAmount || ''
              // }

              value={userInfo.coverageRequest.dwellingAmount || ''}

              onChange={handleChange}
            // required
            />
          </div>

          <div className="input-container">
            <label htmlFor="otherStructureAmount">Other Structure:</label>
            <input
              id="otherStructureAmount"
              name="otherStructureAmount"
              // value={
              //   (userInfo.Homeowners && userInfo.Homeowners.coverageRequest.otherStructureAmount) ||
              //   (userInfo.coverageRequest && userInfo.coverageRequest.otherStructureAmount) ||
              //   ''
              // }


              value={userInfo.coverageRequest.otherStructureAmount || ''}

              onChange={handleChange}
            // required
            />
          </div>

          <div className="input-container">
            <label htmlFor="lossOfUseAmount">Loss of Use:</label>
            <input
              type="number"
              id="lossOfUseAmount"
              name="lossOfUseAmount"
              // value={
              //   selections.Homeowners
              //     ? (userInfo.Homeowners && userInfo.Homeowners.coverageRequest.lossOfUseAmount) || ''
              //     : selections.Boat
              //       ? (userInfo.Boat && userInfo.Boat.coverageRequest.lossOfUseAmount) || ''
              //       : ''
              // }

              value={userInfo.coverageRequest.lossOfUseAmount || ''}


              onChange={handleChange}
            // required
            />
          </div>

          <div className="input-container">
            <label htmlFor="personLiabilitiesAmount">Person Liabilities:</label>
            <input
              type="number"
              id="personLiabilitiesAmount"
              name="personLiabilitiesAmount"
              // value={
              //   selections.Homeowners
              //     ? (userInfo.Homeowners && userInfo.Homeowners.coverageRequest.personLiabilitiesAmount) || ''
              //     : selections.Boat
              //       ? (userInfo.Boat && userInfo.Boat.coverageRequest.personLiabilitiesAmount) || ''
              //       : ''
              // }

              value={userInfo.coverageRequest.personLiabilitiesAmount || ''}

              onChange={handleChange}
            // required
            />
          </div>
        </>
      )}

      {/* Auto, RV, Motorcycle, ClassicCar */}
      {(selections.Auto || selections.RV || selections.Motorcycle || selections.ClassicCar) && (
        <div className="input-container">
          <label htmlFor="collDeduct"> Collision Deductible:</label>
          <input
            type="number"
            id="collDeduct"
            name="collDeduct"
            // value={
            //   selections.Auto
            //     ? (userInfo.Auto && userInfo.Auto.userInsurance.collDeduct) || ''
            //     : selections.RV
            //       ? (userInfo.RV && userInfo.RV.userInsurance.collDeduct) || ''
            //       : selections.ClassicCar
            //         ? (userInfo.ClassicCar && userInfo.ClassicCar.userInsurance.collDeduct) || ''
            //         : selections.Motorcycle
            //           ? (userInfo.Motorcycle && userInfo.Motorcycle.userInsurance.collDeduct) || ''
            //           : ''
            // }

            value={userInfo.coverageRequest.collDeduct || ''}

            onChange={handleChange}
          // required
          />
        </div>
      )}

      {/* Auto , RV , ClassicCar*/}
      {(selections.Auto || selections.RV || selections.ClassicCar || selections.Motorcycle) && (
        <div className="input-container">
          <label htmlFor="compDeduct"> Comprehensive Deductible:</label>
          <input
            id="compDeduct"
            name="compDeduct"
            // value={
            //   selections.Auto
            //     ? (userInfo.Auto && userInfo.Auto.userInsurance.compDeduct) || ''
            //     : selections.RV
            //       ? (userInfo.RV && userInfo.RV.userInsurance.compDeduct) || ''
            //       : selections.ClassicCar
            //         ? (userInfo.ClassicCar && userInfo.ClassicCar.userInsurance.compDeduct) || ''
            //         : ''
            // }

            value={userInfo.coverageRequest.compDeduct || ''}

            onChange={handleChange}
          // required
          ></input>
        </div>
      )}

      {/* RV, ClassicCar, Business */}
      {(selections.Business || selections.RV || selections.ClassicCar) && (
        <div className="input-container">
          <label htmlFor="liabilityLimit">Liability Limit:</label>
          <input
            id="liabilityLimit"
            name="liabilityLimit"
            // value={
            //   selections.Auto
            //     ? (userInfo.Auto && userInfo.Auto.userInsurance.liabilityLimit) || ''
            //     : selections.Business
            //       ? (userInfo.Business && userInfo.Business.userInsurance.liabilityLimit) || ''
            //       : selections.ClassicCar
            //         ? (userInfo.ClassicCar && userInfo.ClassicCar.userInsurance.liabilityLimit) || ''
            //         : ''
            // }

            value={userInfo.coverageRequest.liabilityLimit || ''}

            onChange={handleChange}
          // required
          ></input>
        </div>
      )}

      {/* Business */}
      {selections.Business && (
        <>
          <div className="input-container">
            <label htmlFor="cargoLimit">Cargo Limit:</label>
            <input
              id="cargoLimit"
              name="cargoLimit"
              // value={userInfo.Business && userInfo.Business.coverageRequest.cargoLimit || ''}
              value={userInfo.coverageRequest.cargoLimit || ''}

              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="physicalDamage">Physical Damage:</label>
            <input
              id="physicalDamage"
              name="physicalDamage"
              // value={userInfo.Business && userInfo.Business.coverageRequest.physicalDamage || ''}
              value={userInfo.coverageRequest.physicalDamage || ''}

              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="generalLiability">General Liability Limit:</label>
            <input
              id="generalLiability"
              name="generalLiability"
              // value={userInfo.Business && userInfo.Business.coverageRequest.generalLiability || ''}
              value={userInfo.coverageRequest.generalLiability || ''}

              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="unidentifiedTrailer">Unidentitides/ None owned Trailer:</label>
            <input
              id="unidentifiedTrailer"
              name="unidentifiedTrailer"
              // value={userInfo.Business && userInfo.Business.coverageRequest.unidentifiedTrailer || ''}
              value={userInfo.coverageRequest.unidentifiedTrailer || ''}

              onChange={handleChange}
            // required
            ></input>
          </div>

          <div className="input-container">
            <label htmlFor="trailerInterchange">Trailer Interchange:</label>
            <input
              id="trailerInterchange"
              name="trailerInterchange"
              // value={userInfo.Business && userInfo.Business.coverageRequest.trailerInterchange || ''}
              value={userInfo.coverageRequest.trailerInterchange || ''}

              onChange={handleChange}
            // required
            ></input>
          </div>
        </>
      )}

      {/* RV, ClassicCar */}
      {(selections.RV || selections.ClassicCar) && (
        <div className="input-container">
          <label htmlFor="limbiPd">LIMBI & PD:</label>
          <input
            id="limbiPd"
            name="limbiPd"
            // value={
            //   selections.RV
            //     ? (userInfo.RV && userInfo.RV.userInsurance.limbiPd) || ''
            //     : selections.ClassicCar
            //       ? (userInfo.ClassicCar && userInfo.ClassicCar.userInsurance.limbiPd) || ''
            //       : ''
            // }

            value={userInfo.coverageRequest.limbiPd || ''}

            onChange={handleChange}
          // required
          ></input>
        </div>
      )}

      {/* ClassicCar */}
      {selections.ClassicCar && (
        <div className="input-container">
          <label htmlFor="carValue">Value of Car:</label>
          <input
            id="carValue"
            name="carValue"
            // value={userInfo.ClassicCar && userInfo.ClassicCar.coverageRequest.carValue || ''}

            value={userInfo.coverageRequest.carValue || ''}

            onChange={handleChange}
          // required
          ></input>
        </div>
      )}
    </div>
  );
};

export default CoverageRequest;
