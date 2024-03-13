import React, { useState } from 'react';
import { useUserInfo } from '../UserInfoProvider';
import { useFormContext } from '../FormProvider';

const ClassicCarInputForm = () => {
    const [numPeople, setNumPeople] = useState(1);
    const { selections } = useFormContext();
    const { userInfo, setUserInfo } = useUserInfo();
    const [driverInfo, setDriverInfo] = useState([]);

    const handleChangeNumPeople = (event) => {
        const count = parseInt(event.target.value, 10);
        if (count >= 0) {
            setNumPeople(count);
            setUserInfo(prevState => ({
                ...prevState,
                drivers: new Array(count).fill({}).map(() => ({
                    year: '',
                    make: '',
                    model: '',
                    value: '',
                    vin: '',
                }))
            }));
        }
    };

    const handleInputChange = (index, field, value) => {
        setDriverInfo(prevState => {
            const updatedInfo = [...prevState];
            updatedInfo[index] = {
                ...updatedInfo[index],
                [field]: value
            };
            return updatedInfo;
        });
    };

    return (
        <div>
            <div>
                <label>How many classic cars do you want to insure?</label>
                <select
                    id="numPeople"
                    value={numPeople}
                    onChange={handleChangeNumPeople}
                >
                    {[...Array(9)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>

            {[...Array(numPeople)].map((_, index) => (
                <div key={index}>
                    <h3>Person {index + 1}</h3>

                    {/* Auto, Motorcycle, Boat, RV, ClassicCar, Commerical Auto */}
                    <label>Name of Driver:</label>
                    <input
                        type="text"
                        value={userInfo.drivers[index]?.name || ''}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    />

                    {/* ClassicCar Fields */}
                    {selections.ClassicCar && (
                        <>
                            <label>ClassicCar - Year:</label>
                            <input
                                type="text"
                                value={userInfo.drivers[index]?.classicCar?.year || ''}
                                onChange={(e) => handleInputChange(index, 'classicCar.year', e.target.value)}
                            />

                            <label>ClassicCar - Make:</label>
                            <input
                                type="text"
                                value={userInfo.drivers[index]?.classicCar?.make || ''}
                                onChange={(e) => handleInputChange(index, 'classicCar.make', e.target.value)}
                            />

                            <label>ClassicCar - Model:</label>
                            <input
                                type="text"
                                value={userInfo.drivers[index]?.classicCar?.model || ''}
                                onChange={(e) => handleInputChange(index, 'classicCar.model', e.target.value)}
                            />

                            <label>Value of the vehicle:</label>
                            <input
                                type="text"
                                value={userInfo.drivers[index]?.classicCar?.value || ''}
                                onChange={(e) => handleInputChange(index, 'classicCar.value', e.target.value)}
                            />

                            <label>Vehicle Identification Number (VIN):</label>
                            <input
                                type="text"
                                value={userInfo.drivers[index]?.classicCar?.vin || ''}
                                onChange={(e) => handleInputChange(index, 'classicCar.vin', e.target.value)}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ClassicCarInputForm;
