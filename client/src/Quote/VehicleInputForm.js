import React, { useState } from 'react';
import { useUserInfo } from './UserInfoProvider.js';
import { useFormContext } from './FormProvider';
import './InputForm.css';

const VehicleInputForm = () => {
    const [numDriver, setNumDriver] = useState(1);

    const { userInfo, setUserInfo } = useUserInfo();
    const { selections } = useFormContext();

    const handleChangeNumDriver = (event) => {
        const count = parseInt(event.target.value, 10);
        if (count >= 0) {
            setNumDriver(count);
            setUserInfo((prevState) => ({
                ...prevState,
                vehiclesInfo: new Array(count).fill({}).map(() => {
                    const vehicleInfoObject = {
                        year: '',
                        make: '',
                        value: '',
                        model: '',
                        usage: '',
                        // identificationNumber: '',
                    };

                    // Add Motorcycle section if selected
                    if (selections.Auto) {
                        vehicleInfoObject.Auto = {
                            purchasedPrice: '',
                        };
                    }

                    // Add Motorcycle section if selected
                    if (selections.Motorcycle) {
                        vehicleInfoObject.Motorcycle = {
                            radiusOfDriving: '',
                            purchasedPrice: '',
                        };
                    }

                    // Add RV section if selected
                    if (selections.RV) {
                        vehicleInfoObject.RV = {
                            purchasedPrice: '',
                            annualMileage: '',
                            parkedLocation: '',
                        };
                    }
                    if (selections.Boat) {
                        vehicleInfoObject.Boat = {
                            purchasedPrice: '',
                            annualMileage: '',
                            customParts: '',
                            identificationNumber: '',
                            // boat: {
                            //     engines: [
                            //         { year: '', engineSize: '', location: '' },
                            //         { year: '', engineSize: '', location: '' }
                            //     ],
                            //     purchasePrice: '',
                            //     primaryStored: '',
                            //     engineTwoSize: '',
                            //     storedAfloat: '',
                            //     rangeOfNavigation: '',
                            //     trailer: { year: '', make: '', model: '' }
                            // }
                        };
                    }

                    if (selections.ClassicCar) {
                        vehicleInfoObject.ClassicCar = {
                            vin: '',
                        };
                    }


                    // Add Commercial Auto section if selected
                    if (selections.CommericalAuto) {
                        vehicleInfoObject.CommericalAuto = {
                            purchasedPrice: '',
                            radiusOfDriving: '',


                        };
                    }

                    return vehicleInfoObject;
                }),
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
        <div>
            {selections.Auto ? (
                <h2 style={{ fontSize: '50px', color: '#3F5978' }}>Number of Vehicles? </h2>
            ) : selections.Motorcycle ? (
                <h2 style={{ fontSize: '50px', color: '#3F5978' }}>Number of MotorCycles? </h2>
            ) : selections.Boat ? (
                <h2 style={{ fontSize: '50px', color: '#3F5978' }}>Number of Boats? </h2>
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
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.year) || ''}
                                onChange={(e) => handleInputChange(index, 'year', e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label> Vehicle Type </label>
                            <input
                                type="text"
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.make) || ''}
                                onChange={(e) => handleInputChange(index, 'make', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-container">
                            <label>Value </label>
                            <input
                                type="text"
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.value) || ''}
                                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                            />
                        </div>
                        <div className="input-container">
                            <label>Model </label>
                            <input
                                type="text"
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.model) || ''}
                                onChange={(e) => handleInputChange(index, 'model', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="input-container">
                            <label> Usage </label>
                            <select
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.usage) || ''}
                                onChange={(e) => handleInputChange(index, 'usage', e.target.value)}
                                className="biggerSelectOption"
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
                                value={(userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.purchasedPrice) || ''}
                                onChange={(e) => handleInputChange(index, 'purchasedPrice', e.target.value)}
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
                                    />
                                </div>
                                <div className="input-container">
                                    <label> Annual Mileage </label>
                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.annualMileage || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'annualMileage', e.target.value)}
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
                                    />
                                </div>
                                {/* <div className="input-container">
                <label> Year of Engine One </label>
                <input
                    type="text"
                    value={(selections.Boat ? userInfo.vehiclesInfo[index]?.year || '' : '')}
                    onChange={(e) => handleInputChange(index, 'Boat.boat.engines[0].year', e.target.value)}
                />
            </div> */}
                            </div>
                            <div className="input-row">
                                <div className="input-container">
                                    <label> Boat - Purchase Price </label>
                                    <input
                                        type="text"
                                        value={(selections.Boat ? userInfo.vehiclesInfo[index]?.purchasePrice || '' : '')}
                                        onChange={(e) => handleInputChange(index, 'purchasePrice', e.target.value)}
                                    />
                                </div>
                                {/* <div className="input-container">
                <label> Engine Size (Horsepower) </label>
                <input
                    type="text"
                    value={(selections.Boat ? userInfo.vehiclesInfo[index]?.engineSize || '' : '')}
                    onChange={(e) => handleInputChange(index, 'Boat.boat.engines[0].engineSize', e.target.value)}
                />
            </div> */}
                            </div>
                        </div>
                    )}

                    {selections.ClassicCar && (
                        <div>

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
                    {(selections.Motorcycle || selections.CommericalAuto) && (
                        <div className="input-row">
                            <div className="input-container">
                                <label>Radius of Driving:</label>
                                <select
                                    value={userInfo.vehiclesInfo[index] && userInfo.vehiclesInfo[index]?.radiusOfDriving || ''}
                                    className="biggerSelectOption"
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
                                <label> Location RV primarily parked </label>
                                <input
                                    type="text"
                                    value={userInfo.vehiclesInfo[index]?.parkedLocation || ''}
                                    onChange={(e) => handleInputChange(index, 'parkedLocation', e.target.value)}
                                    placeholder="Location RV primarily parked"
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default VehicleInputForm;
