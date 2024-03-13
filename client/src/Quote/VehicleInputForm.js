import React, { useState } from 'react';
import { useUserInfo } from './UserInfoProvider.js';
import { useFormContext } from './FormProvider';
import './InputForm.css';


const VehicleInputForm = () => {
    const [numDriver, setNumDriver] = useState(1);
    const [vehiclesInfo, setVehiclesInfo] = useState([]);

    const { userInfo, setUserInfo } = useUserInfo();
    const { selections } = useFormContext();

    const handleChangeNumDriver = (event) => {
        const count = parseInt(event.target.value, 10);
        if (count >= 0) {
            setNumDriver(count);
            setUserInfo((prevState) => ({
                ...prevState,
                vehiclesInfo: new Array(count).fill({}).map(() => ({
                    year: '',
                    make: '',
                    value: '',
                    model: '',
                    usage: '',
                    identificationNumber: '',
                    Motorcycle: selections.MotorCycle ? { purchasedPrice: '', annualMileage: '', customParts: '' } : null,
                    Boat: selections.Boat ? { purchasedPrice: '', annualMileage: '', customParts: '' } : null,
                    RV: selections.RV ? { annualMileage: '', parkedLocation: '' } : null,
                    Boat: selections.Boat ? {
                        boat: {
                            engines: [
                                { year: '', engineSize: '', location: '' },
                                { year: '', engineSize: '', location: '' }
                            ],
                            purchasePrice: '',
                            primaryStored: '',
                            engineTwoSize: '',
                            storedAfloat: '',
                            rangeOfNavigation: '',
                            trailer: { year: '', make: '', model: '' }
                        }
                    } : null
                })),
            }));
        }
    };

    const handleInputChange = (index, field, value) => {
        setUserInfo((prevState) => {
            const updatedInfo = [...prevState.vehiclesInfo];
            updatedInfo[index] = {
                ...updatedInfo[index],
                [field]: value,
            };
            return {
                ...prevState,
                vehiclesInfo: updatedInfo,
            };
        });
    };

    return (

        // I should set vehicle type here with a state
        <div>
        
                {selections.Auto ? (
                       <h2 style={{ fontSize: '50px', color: '#3F5978' }}>Number of Vehicles? </h2>
                ) : selections.MotorCycle ? (
                    <h2 style={{ fontSize: '50px', color: '#3F5978' }}>NNumber of MotorCycles? </h2>
                ) : selections.Boat ? (
                    <h2 style={{ fontSize: '50px', color: '#3F5978' }}>NNumber of Boats? </h2>
                ) : null}

            <select
                id="numDriver"
                value={numDriver}
                onChange={handleChangeNumDriver}
                className='numPeopleSelect'

            >
                {[...Array(9)].map((_, index) => (
                    <option key={index} value={index + 1}>{index + 1}</option>
                ))}
            </select>

            <div className='line'></div>

            {[...Array(numDriver)].map((_, index) => (
                <div key={index}>
                    <h2 style={{ fontSize: '25px', color: '#3F5978' }}>Vehicle {index + 1}</h2>
                    <div className="input-row">

                        <div className="input-container">
                            <label>Year </label>

                            <input
                                type="text"
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.year || ''}
                                onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                            // placeholder="Year"
                            />

                        </div>

                        <div className="input-container">
                            <label> Vehicle Type </label>
                            <select
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.make || ''}
                                onChange={(e) => handleInputChange(index, 'make', e.target.value)}
                                className='typeSelect'
                            >
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                            </select>

                        </div>
                    </div>


                    <div className="input-row">
                        <div className="input-container">
                            <label>Value </label>

                            <input
                                type="text"
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.value || ''}
                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                            // placeholder="Value"
                            />

                        </div>

                        <div className="input-container">
                            <label>Model </label>


                            <input
                                type="text"
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.model || ''}
                                onChange={(e) => handleInputChange(index, 'model', e.target.value)}
                            // placeholder="Model"
                            />

                        </div>
                    </div>



                    <div className="input-row">
                        <div className="input-container">
                            <label> Usage </label>

                            <select
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.usage || ''}
                                onChange={(e) => handleInputChange(index, 'usage', e.target.value)}
                                className='typeSelect'
                            >
                                <option value="commute">Commute</option>
                                <option value="pleasure">Pleasure</option>
                                <option value="business">Business</option>
                            </select>

                        </div>

                        <div className="input-container">

                            <label> Price </label>


                            <input
                                type="text"
                                value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.purchasedPrice || ''}
                                onChange={(e) => handleInputChange(index, 'purchasedPrice', e.target.value)}
                            // placeholder="Purchased Price"
                            />

                        </div>

                    </div>

                    {(selections.Boat) && (
                        <div>

                            <div className="input-row">
                                <div className="input-container">
                                    <label> Identification Number </label>

                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.identificationNumber || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'identificationNumber', e.target.value)}
                                    // placeholder="Identification Number"
                                    />

                                </div>

                                <div className="input-container">
                                    <label> Annual Mileage </label>

                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.annualMileage || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'annualMileage', e.target.value)}

                                    // placeholder="Annual Mileage"
                                    />
                                </div>
                            </div>


                            <div className="input-row">
                                <div className="input-container">

                                    <label> Custom Parts or Equipment </label>

                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.customParts || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'customParts', e.target.value)}
                                    // placeholder="Custom Parts or Equipment"
                                    />
                                </div>



                                {/* Boat Details */}
                                <div className="input-container">

                                    <label> Year of Engine One </label>

                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.engines[0]?.year || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'boat.engines[0].year', e.target.value)}
                                    // placeholder="Year of Engine One"
                                    />

                                </div>
                            </div>



                            <div className="input-row">
                                <div className="input-container">

                                    <label> Boat - Purchase Price </label>


                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.purchasePrice || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'boat.purchasePrice', e.target.value)}
                                    // placeholder="Boat - Purchase Price"
                                    />

                                </div>
                                <div className="input-container">

                                    <label> Engine Size (Horsepower) </label>

                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.engines[0]?.engineSize || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'boat.engines[0].engineSize', e.target.value)}
                                    // placeholder="Engine Size (Horsepower)"
                                    />

                                </div>
                            </div>
                        </div>


                    )}


                    {selections.ClassicCar && (
                        <div>

                            <div className="input-row">
                                <div className="input-container">
                                    <label>ClassicCar - Year:</label>
                                    <input
                                        type="text"
                                        value={(selections.ClassicCar ? userInfo.vehiclesInfo[index]?.year || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'classicCar.year', e.target.value)}
                                    />

                                </div>

                                <div className="input-container">


                                    <label>ClassicCar - Make:</label>
                                    <input
                                        type="text"
                                        value={(selections.ClassicCar ? userInfo.vehiclesInfo[index]?.make || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'classicCar.make', e.target.value)}
                                    />

                                </div>
                            </div>


                            <div className="input-row">
                                <div className="input-container">

                                    <label>ClassicCar - Model:</label>
                                    <input
                                        type="text"
                                        value={(selections.ClassicCar ? userInfo.vehiclesInfo[index]?.model || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'classicCar.model', e.target.value)}
                                    />
                                </div>

                                <div className="input-container">


                                    <label>Value of the vehicle:</label>
                                    <input
                                        type="text"
                                        value={(selections.ClassicCar ? userInfo.vehiclesInfo[index]?.value || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'classicCar.value', e.target.value)}
                                    />

                                </div>
                            </div>



                            <div className="input-row">
                                <div className="input-container">


                                    <label>Vehicle Identification Number (VIN):</label>
                                    <input
                                        type="text"
                                        value={(selections.ClassicCar ? userInfo.vehiclesInfo[index]?.vin || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'classicCar.vin', e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    )}



                    {(selections.MotorCycle || selections.CommericalAuto) && (
                        <div className="input-row">
                            <div className="input-container">
                                <label>Radius of Driving:</label>
                                <select
                                    value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.radiusOfDriving || ''}


                                    onChange={(e) => handleInputChange(index, 'radiusOfDriving', e.target.value)}
                                >
                                    <option value="0-50">0-50 miles</option>
                                    <option value="50-100">50-100 miles</option>
                                    <option value="100-200">100-200 miles</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {(selections.RV) && (
                        <div className="input-row">
                            <div className="input-container">

                                <label> Annual Mileage </label>

                                <input
                                    type="text"
                                    value={userInfo.vehiclesInfo[index]?.annualMileage || ''}
                                    onChange={(e) => handleInputChange(index, 'annualMileage', e.target.value)}
                                    placeholder="Annual Mileage"
                                />

                            </div>

                            <div className="input-container">

                                <label> Location RV primarily parkede </label>

                                {/* Location RV primarily parked */}
                                <input
                                    type="text"

                                    value={userInfo.vehiclesInfo[index]?.parkedLocation || ''}

                                    onChange={(e) => handleInputChange(index, 'parkedLocation', e.target.value)}
                                    placeholder="Location RV primarily parked"
                                />
                            </div>
                        </div>
                    )}

                    {vehiclesInfo[index]?.filteredCars && (
                        <ul>
                            {userInfo.vehiclesInfo[index].filteredCars.map((car, idx) => (
                                <li key={idx}>{car}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VehicleInputForm;