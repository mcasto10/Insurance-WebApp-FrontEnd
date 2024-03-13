import React, { useState } from 'react';
import { useUserInfo } from './UserInfoProvider';
import { useFormContext } from './FormProvider';
import './InputForm.css';

const DriverInputForm = () => {
    const [numPeople, setNumPeople] = useState(1);

    const [driverInfo, setDriverInfo] = useState([]);

    const { userInfo, setUserInfo } = useUserInfo();

    const { selections } = useFormContext();

    const handleChangeNumPeople = (event) => {
        const count = parseInt(event.target.value, 10);
        if (count >= 0) {
            setNumPeople(count);
            setUserInfo((prevState) => ({
                ...prevState,
                driverInfo: new Array(count).fill({}).map(() => ({
                    name: '',
                    marital: '',
                    gender: '',
                    education: '',
                    birthday: '',
                    Motorcycle: {
                        licenseNumber: '',
                        movingViolations: '',
                        atFaultAccidents: '',
                    },
                    CommericalAuto: {
                        movingViolations: '',
                        atFaultAccidents: '',
                    },
                    Boat: {
                        boatOwnershipYear: '',
                        boatingExperienceYear: '',
                        completedBoatingSafetyCourse: '',
                        marineInsuranceLoss: '',
                        licenseDescription: '',
                    },
                })),
            }));
        }
    };


    const handleInputChange = (index, field, value) => {
        const charRegex = /^[A-Za-z\s]*$/;
        const numericRegex = /^[0-9]*$/;

        let newValue;

        switch (field) {
            case 'name':
                // Allow only characters for "Name"
                newValue = charRegex.test(value) ? value : userInfo.driverInfo[index][field] || '';
                break;
            case 'licenseNumber':
            case 'movingViolations':
            case 'atFaultAccidents':
            case 'boatOwnershipYear':
            case 'boatingExperienceYear':
            case 'completedBoatingSafetyCourse':
            case 'marineInsuranceLoss':
            case 'licenseDescription':
                // Allow only numeric characters for specific fields
                newValue = numericRegex.test(value) ? value : userInfo.driverInfo[index][field] || '';
                break;
            default:
                // For other fields, use the existing logic
                newValue = value;
        }

        setUserInfo((prevState) => {
            const updatedInfo = [...prevState.driverInfo];
            updatedInfo[index] = {
                ...updatedInfo[index],
                [field]: newValue,
            };
            return {
                ...prevState,
                driverInfo: updatedInfo,
            };
        });
    };


    return (
        <div>
   
            <h2 style={{ fontSize: '40px', color: '#3F5978' }}>How many people's information do you want to enter?</h2>

            <select
                id="numPeople"
                value={numPeople}
                onChange={handleChangeNumPeople}
                className='numPeopleSelect'
            >
                {[...Array(9)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
            </select>

            <div className='line'> </div>

            {[...Array(numPeople)].map((_, index) => (
                <div key={index}>
                    <h2 style={{ fontSize: '25px', color: '#3F5978' }}>Person {index + 1}</h2>

                    {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}

                    <div className="input-row">
                        <div className="input-container">

                            <label>Name of Driver:</label>
                            <input
                                type="text"
                                value={userInfo.driverInfo[index] && userInfo.driverInfo[index]?.name || ''}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                            />
                        </div>

                        <div className="input-container">

                            {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}
                            <label>Driver License Number:</label>
                            <input
                                type="text"
                                value={userInfo.driverInfo[index] && userInfo.driverInfo[index]?.licenseNumber || ''}
                                onChange={(e) => handleInputChange(index, 'licenseNumber', e.target.value)}
                            />
                        </div>


                    </div>


                    <div className="input-row">


                        <div className="input-container">

                            {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}
                            <label>Marital Status:</label>
                            <select
                                value={userInfo.driverInfo[index] && userInfo.driverInfo[index]?.marital || ''}
                                onChange={(e) => handleInputChange(index, 'marital', e.target.value)}
                                className='typeSelect'
                            >
                                <option value="Married">Married</option>
                                <option value="Single">Single</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        <div className="input-container">


                            {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}
                            <label>Gender:</label>
                            <select
                                value={userInfo.driverInfo[index] && userInfo.driverInfo[index]?.gender || ''}
                                onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                                className='typeSelect'
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                        </div>

                        <div className="input-container">


                            {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}
                            <label>Birthday:</label>
                            <input
                                type="date"
                                value={userInfo.driverInfo[index] && userInfo.driverInfo[index]?.birthday || ''}
                                onChange={(e) => handleInputChange(index, 'birthday', e.target.value)}
                            />

                        </div>

                    </div>


                    {/* MotorCycle, Commerical Auto */}
                    {(selections.Motorcycle || selections.CommericalAuto) && (
                        <div className="input-row">

                            <div className="input-container">

                                <label>Number of Moving Violations:</label>
                                <input
                                    type="text"
                                    value={
                                        selections.Motorcycle
                                            ? (userInfo.driverInfo[index]?.Motorcycle && userInfo.driverInfo[index]?.Motorcycle.movingViolations) || ''
                                            : selections.CommercialAuto
                                                ? (userInfo.driverInfo[index]?.CommercialAuto && userInfo.driverInfo[index]?.CommercialAuto.movingViolations) || ''
                                                : ''
                                    }



                                    onChange={(e) => handleInputChange(index, 'movingViolations', e.target.value)}
                                />

                            </div>

                            <div className="input-container">


                                <label>Number of at-fault accidents:</label>
                                <input
                                    type="text"
                                    value={(selections.Motorcycle) ? userInfo.driverInfo[index]?.Motorcycle.atFaultAccidents || '' :
                                        (selections.CommericalAuto) ? userInfo.driverInfo[index]?.CommercialAuto.atFaultAccidents || '' : ''}
                                    onChange={(e) => handleInputChange(index, 'atFaultAccidents', e.target.value)}
                                />

                            </div>
                        </div>
                    )}

                    {/* Boat */}
                    {selections.Boat && (

                        <div>
                            <div className="input-row">
                                <div className="input-container">
                                    <label>Year Boat Ownership:</label>
                                    <input
                                        type="text"
                                        value={
                                            (selections.Boat ? userInfo.driverInfo[index]?.atFaultAccidents || '' : '')
                                        }
                                        onChange={(e) => handleInputChange(index, 'boatOwnershipYear', e.target.value)}
                                    />
                                </div>


                                <div className="input-container">
                                    <label>Year Boat Experience:</label>
                                    <input
                                        type="text"
                                        value={
                                            (selections.Boat ? userInfo.driverInfo[index]?.boatingExperienceYear || '' : '')
                                        }
                                        onChange={(e) => handleInputChange(index, 'boatingExperienceYear', e.target.value)}
                                    />
                                </div>
                            </div>


                            <div className="input-row">


                                <div className="input-container">
                                    <label>Have any operators completed a boating safety course:</label>
                                    <input
                                        type="text"
                                        value={selections.Boat ? userInfo.driverInfo[index]?.completedBoatingSafetyCourse || '' : ''}
                                        onChange={(e) => handleInputChange(index, 'completedBoatingSafetyCourse', e.target.value)}
                                    />

                                </div>

                                <div className="input-container">


                                    <label>Describe all marine insurance loss:</label>
                                    <input
                                        type="text"
                                        value={selections.Boat ? userInfo.driverInfo[index]?.marineInsuranceLoss || '' : ''}
                                        onChange={(e) => handleInputChange(index, 'marineInsuranceLoss', e.target.value)}
                                    />

                                </div>

                                <div className="input-container">


                                    <label>Describe license number:</label>
                                    <input
                                        type="text"
                                        value={selections.Boat ? userInfo.driverInfo[index]?.licenseDescription || '' : ''}
                                        onChange={(e) => handleInputChange(index, 'licenseDescription', e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ))
            }
        </div >
    );
};

export default DriverInputForm;
