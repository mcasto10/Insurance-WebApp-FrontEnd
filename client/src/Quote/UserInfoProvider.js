import React, { createContext, useContext, useState, useEffect } from 'react';
import { useFormContext } from './FormProvider';

const UserInfoContext = createContext();

export const useUserInfo = () => {
    return useContext(UserInfoContext);
};

const INITIAL_STATE = {
    // General User Info
    name: '',
    fax: '',
    phone: '',
    city: '',
    email: '',
    zipcode: '',
    address: '',
    contact: '',
    // General User insurance info
    userInsurance: {
        currentIns: '',
        CurrentExp: '',

    },
    coverageRequest: {
        medPay: ''
    },
    driverInfo: [],
    vehiclesInfo: [],
};

// const SELECTIONS_CONFIG = {
//     Auto: {
//         userInsurance: {
//             numIns: 0
//         },
//         coverageRequest: {
//             bodyInj: '',
//             propDamage: '',
//             collDeduct: '',
//             compDeduct: '',
//             uniMotor: '',
//         },
//     },
//     Motorcycle: {
//         userInsurance: {
//             numIns: 0
//         },

//         coverageRequest: {
//             bodyInj: '',
//             propDamage: '',
//             collDeduct: '',
//             compDeduct: '',
//             uniMotor: '',
//         }
//     },
//     Boat: {
//         userInsurance: {
//             numIns: 0
//         },
//         coverageRequest: {
//             dwellingAmount: '',
//             otherStructureAmount: '',
//             lossOfUseAmount: '',
//             personLiabilitiesAmount: '',
//             collDeduct: '',
//             compDeduct: '',
//             uniMotor: '',
//             liabilityLimit: '',
//             limbiPd: '',
//             carValue: '',
//         }
//     },

//     RV: {
//         coverageRequest: {
//             dwellingAmount: '',
//             otherStructureAmount: '',
//             lossOfUseAmount: '',
//             personLiabilitiesAmount: '',
//             collDeduct: '',
//             compDeduct: '',
//             uniMotor: '',
//             liabilityLimit: '',
//             limbiPd: '',
//             carValue: '',
//         }
//     },

//     ClassicCar: {
//         userInsurance: {
//             numberOfClaims: '',
//             numIns: 0,
//             numClaim: ''
//         },
//         coverageRequest: {
//             dwellingAmount: '',
//             otherStructureAmount: '',
//             lossOfUseAmount: '',
//             personLiabilitiesAmount: '',
//             collDeduct: '',
//             compDeduct: '',
//             uniMotor: '',
//             liabilityLimit: '',
//             limbiPd: '',
//             carValue: '',
//         }
//     },

//     Homeowners: {
//         userInsurance: {
//           loanAmount: '',
//           numIns: 0,
//         },
//         coverageRequest: {
//           dwellingAmount: '',
//           otherStructureAmount: '',
//           lossOfUseAmount: '',
//           personLiabilitiesAmount: '',
//           collDeduct: '',
//           compDeduct: '',
//           uniMotor: '',
//           liabilityLimit: '',
//           limbiPd: '',
//           carValue: '',
//         },
//         homeOwnerExtra: {
//           alarmSys: '',
//           numStories: 0,
//           gateComm: '',
//           homePurchYear: 0,
//           sqFootage: '',
//           lossFiveYear: '',
//           numCarGarage: 0,
//           breedOfDog: '',
//           constructionType: '',
//           roofType: '',
//           electric: '',
//           plumbing: '',
//         },
//       },
// };

// const setBusinessInitialState = () => ({
//     Business: {
//         businessName: '',
//         owner: '',
//         date: '',
//         yearsInBusiness: '',
//         mailingAddress: '',
//         cityMailing: '',
//         stateMailing: '',
//         zipCodeMailing: '',
//         garagingAddress: '',
//         cityGaraging: '',
//         stateGaraging: '',
//         zipCodeGaraging: '',
//         phone: '',
//         cellPhone: '',
//         fax: '',
//         email: '',
//         radiusOfOperation: '',
//         currentInsurer: '',
//     },
//     coverageRequest: {
//         liabilityLimit: '',
//         cargoLimit: '',
//         physicalDamage: '',
//         generalLiabilityLimit: '',
//         unidentitidesNoneOwnedTrailer: '',
//         trailerInterchange: '',
//     },
//     AdditionalBusinessInfo: {
//         fullName: '',
//         licenseNumberState: '',
//         violationsAccidents: '',
//         yearsExperience: '',
//         dateOfBirth: '',
//     },
//     BusinessSchedule: {
//         vehicles: [
//             {
//                 vehicleYear: '',
//                 vehicleMake: '',
//                 vehicleType: '',
//                 gvwValue: '',
//                 deductible: '',
//             },
//         ],
//     },
//     ExtraBusinessInfo: {
//         commoditiesHauled: '',
//         iccMCNumber: '',
//         caDmvMcp: '',
//         other: '',
//     },
// });

// const setCommercialAutoInitialState = () => ({
//     CommericalAuto: {
//         autoYear: '',
//         autoMake: '',
//         autoModel: '',
//         vehicleValue: '',
//         vehicleIdentificationNumber: '',
//         vehiclesUsedFor: '',
//         radiusOfDriving: '',
//     },
//     CommericalVehicle: {
//         businessName: '',
//         state: '',
//         feiNumber: '',
//         dba: '',
//         contactName: '',
//         fax: '',
//         phone: '',
//         email: '',
//         city: '',
//         address: '',
//         currentInsuranceCompany: '',
//         currentPolicyExpirationDate: '',
//         yearsInsured: '',
//         claimsInLast3Years: '',
//         numClaim: '',
//         autoYear: '',
//         autoMake: '',
//         autoModel: '',
//         vehicleValue: '',
//         vehicleIdentificationNumber: '',
//         vehiclesUsedFor: '',
//         radiusOfDriving: '',
//     },
//     ExtraCommericalAuto: {
//         typeOfBusiness: '',
//         categoryOfBusiness: '',
//         businessOperations: '',
//     },
// });

export const UserInfoProvider = ({ children }) => {
    const { selections } = useFormContext();
  
    const [userInfo, setUserInfo] = useState(() => {
      if (selections) {
        if (selections.Auto || selections.Homeowners || selections.Boat || selections.Motorcycle || selections.RV || selections.ClassicCar || selections.Business || selections.CommercialAuto) {
          return {
            ...INITIAL_STATE,
          };
        }
      }
  
      return INITIAL_STATE;
    });

    return (
      <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
        {children}
      </UserInfoContext.Provider>
    );
  };
  