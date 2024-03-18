import React, { useState } from 'react';
import { useUserInfo } from './UserInfoProvider';

const AccordionItem = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);



  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
<div onClick={toggleAccordion} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', backgroundColor: '#F7F8FC', color: '#000', marginBottom: '5px' }}>
  {isOpen ? ' - ' : ' + '} <strong>{title}</strong>
</div>

      {!isOpen && (
        <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderTop: 'none' }}>
          {content}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => (
        <AccordionItem key={index} title={section.title} content={section.content} />
      ))}
    </div>
  );
};

const DisplayAllContent = () => {
  const { userInfo } = useUserInfo();


  const Usercontent = () => (
    <ul>
      <li><strong>Name:</strong> {userInfo.name}</li>
      <li><strong>Fax:</strong> {userInfo.fax}</li>
      <li><strong>Phone:</strong> {userInfo.phone}</li>
      <li><strong>City:</strong> {userInfo.city}</li>
      <li><strong>Email:</strong> {userInfo.email}</li>
      <li><strong>Zipcode:</strong> {userInfo.zipcode}</li>
      <li><strong>Address:</strong> {userInfo.address}</li>
      <li><strong>Contact:</strong> {userInfo.contact}</li>
    </ul>
  );


  // generalInformation Information
  const userGeneralLabel = {
    businessName: "Business Name",
    owner: "Owner (Contact)",
    date: "Date",
    yearsInBusiness: "Years in Business",
    mailingAddress: "Mailing Address",
    cityMailing: "City (Mailing)",
    stateMailing: "State (Mailing)",
    zipCodeMailing: "Zip Code (Mailing)",
    garagingAddress: "Garaging Address",
    cityGaraging: "City (Garaging)",
    stateGaraging: "State (Garaging)",
    zipCodeGaraging: "Zip Code (Garaging)",
    businessPhone: "Business Phone",
    businessCellPhone: "Business Cell Phone",
    commericalFax: "Commerical Fax",
    radiusOfOperation: "Radius of Operation",
    currentInsurer: "Current Insurer",
    commoditiesHauled: "Commodities Hauled and %'s",
    iccMCNumber: "ICC MC#",
    caDmvMcp: "CA DMV MCP65",
    other: "Other",
    vehicleYear: "Year",
    vehicleMake: "Make",
    vehicleType: "Type",
    gvwValue: "GVW Value",
    deductible: "Deductible",
    typeOfBusiness: "Type of Business",
    categoryOfBusiness: "Category of Business",
    businessOperations: "Description of Business Operations",
    commericalName: "Commerical Name",
    businessName: "Business Name",
    state: "State",
    feiNumber: "FEI Number",
    dba: "DBA",
    contactName: "Contact Name",
    businesFax: "Busines Fax",
    commericalPhone: "Commerical Phone",
    commericalEmail: "Commerical Email",
    businesEmail: "Business Email Address",
    commericalCity: "Commerical City",
    commericalAddress: "Commerical Address",
    commericalZipCode: "Commerical Zipcode",
    currentInsuranceCompany: "Current Insurance Company",
    currentPolicyExpirationDate: "Current Policy Expiration Date",
    yearsInsured: "Number of Years Insured",
    claimsInLast3Years: "Have you had any claims in the last 3 years (yes or no)",
    numClaims: "How many claims and what kind of claims",
  };


  const AdditionalUsercontent = () => (
    <ul>
      {Object.entries(userInfo).map(([key, value]) => {
        // Check if the key exists in userGeneralLabel
        if (userGeneralLabel.hasOwnProperty(key)) {
          // Check if value is not an object (including null)
          const isNotObjectOrNull = !(typeof value === "object" && value !== null);
  
          // If value is not an object or null, render it as it is
          if (isNotObjectOrNull) {
            return (
              <li key={key}>
                <strong>{userGeneralLabel[key]}:</strong> {value}
              </li>
            );
          } else {
            // If value is an object, map over its entries
            return (
              <li key={key}>
                <strong>{userGeneralLabel[key]}:</strong>{" "}
                {Object.entries(value).map(([nestedKey, nestedValue]) => (
                  <div key={nestedKey}>
                    <strong>{nestedKey}:</strong> {nestedValue}
                  </div>
                ))}
              </li>
            );
          }
        } else {
          // Return null if the key is not found in userGeneralLabel
          return null;
        }
      })}
    </ul>
  );
  
  
  const userInsuranceLabels = {
    currentIns: "Current Insurance Company",
    CurrentExp: "Current Policy Expiration Date",
    numIns: "Number of Years Insured",
    numClaim: "Have you had any claims",
    loanAmount: "Loan Amount",
    alarmSys: "Alarm System",
    numStories: "Number of Stories",
    gateComm: "Gated Community",
    homePurchYear: "Year Home was Purchased",
    sqFootage: "Square Footage of Residence",
    lossFiveYear: "Any losses during the last 5 years",
    numCarGarage: "Number of Car Garage",
    breedOfDog: "Breed of Dog if any",
    constructionType: "Construction Type",
    roofType: "Roof Type",
    electric: "Electrical",
    plumbing: "Plumbing",
  };



  const RenderUserInsurance = () => {
    const userInsuranceKeys = Object.keys(userInfo.userInsurance);

    return (
      <div>
        <ul>
          {userInsuranceKeys.map(key => (
            <li key={key}><strong>{userInsuranceLabels[key]}:</strong> {userInfo.userInsurance[key]}</li>
          ))}
        </ul>
      </div>
    );
  };


  const coverageRequestLabels = {
    bodyInj: "Bodily Injury Liability",
    propDamage: "Property Damage",
    uniMotor: "Uninsured Motorists Limits",
    medPay: "Medical Payment",
    collDeduct: "Collision Deductible",
    compDeduct: "Comprehensive Deductible",
    liabilityLimit: "Liability Limit",
    cargoLimit: "Cargo Limit",
    physicalDamage: "Physical Damage",
    generalLiabilityLimit: "General Liability Limit",
    unidentitidesNoneOwnedTrailer: "Unidentitides/None Owned Trailer",
    trailerInterchange: "Trailer Interchange",
    fullName: "Full Name",
    licenseNumberState: "Full License Number & State",
    violationsAccidents: "Violations/Accidents",
    yearsExperience: "Years Experience",
    dateOfBirth: "Date of Birth (optional)",
    limbiPd: "LIMBI & PD",
    carValue: "Value of Car"
  };


  const RenderUserCoverageReq = () => {
    const coverageRequest = Object.keys(userInfo.coverageRequest);

    return (
      <div>
        <ul>
          {coverageRequest.map(key => (

            <li key={key}><strong>{coverageRequestLabels[key]}:</strong> {userInfo.coverageRequest[key]}</li>
          ))}
        </ul>
      </div>
    );
  };

  const driverInputFormLabels = {
    name: "Name of Driver",
    licenseNumber: "Driver License Number",
    marital: "Marital Status",
    gender: "Gender",
    birthday: "Birthday",
    movingViolations: "Number of Moving Violations",
    atFaultAccidents: "Number of at-fault accidents",
    boatOwnershipYear: "Year Boat Ownership",
    boatingExperienceYear: "Year Boat Experience",
    marineInsuranceLoss: "Describe all marine insurance loss",
    licenseDescription: "Describe license number",
    completedBoatingSafetyCourse: "Have any operators completed a boating safety course",
  };

  const RenderDriverInfo = () => (
    <div>
      {userInfo.driverInfo.map((driver, index) => (
        <div key={index}>
          <strong>Driver {index + 1}</strong>
          <ul>
            {Object.entries(driver).map(([key, value]) => (
              <li key={key}>
                {typeof value === 'object' ? (
                  <ul>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <li key={nestedKey}>
                        <strong>{nestedKey}:</strong> {nestedValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>
                    <strong>{driverInputFormLabels[key]}:</strong> {value}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  

  const vehicleInputFormLabels = {
    year: "Year",
    make: "Vehicle Type",
    value: "Value",
    model: "Model",
    usage: "Usage",
    purchasedPrice: "Price",
    identificationNumber: "Identification Number",
    annualMileage: "Annual Mileage",
    customParts: "Custom Parts or Equipment",
    purchasePrice: "Boat - Purchase Price",
    vin: "Vehicle Identification Number (VIN)",
    radiusOfDriving: "Radius of Driving",
    parkedLocation: "Location RV primarily parked",
  };



  const RenderVehicleInfo = () => (
    <div>
      {userInfo.vehiclesInfo.map((vehicle, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>Vehicle {index + 1}</strong>
          <ul>
            {Object.entries(vehicle).map(([key, value]) => (
              <li key={key}>
                {typeof value === "object" ? (
                  <ul>
                    {Object.entries(value).map(([nestedKey, nestedValue]) => (
                      <li key={nestedKey}>
                        <strong>{nestedKey}:</strong> {nestedValue}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <>
                    <strong>{vehicleInputFormLabels[key]}:</strong> {value}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const sections = [
    {
      title: <div className='displayTitleColor'>Contact Info</div>,
      content: <div className='displayParColor'><Usercontent /></div>
    },
    {
      title: <div className='displayTitleColor'> Additional User Information</div>,
      content: <div className='displayParColor'><AdditionalUsercontent /></div>

    },
    {
      title: <div className='displayTitleColor'>General Insurance Info</div>,
      content: <div className='displayParColor'><RenderUserInsurance /></div>
    },
    {
      title: <div className='displayTitleColor'>Coverage Request</div>,
      content: <div className='displayParColor'><RenderUserCoverageReq /></div>
    },
    {
      title: <div className='displayTitleColor'>Driver Info</div>,
      content: <div className='displayParColor'><RenderDriverInfo /></div>
    },
    {
      title: <div className='displayTitleColor'>Vehicle Info</div>,
      content: <div className='displayParColor'><RenderVehicleInfo /></div>
    },
  ];


  return (
    <div style={{ marginBottom: '35px', marginTop: '95px' }}>
      <h2 style={{ fontSize: '50px', color: 'rgb(63, 89, 120)' }}> Quote Confirmation Page </h2>

      <Accordion sections={sections} />
    </div>
  );
};

export default DisplayAllContent;
