import React, { useState } from 'react';

const CarSearchBar = ({ cars }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCars = cars.filter((car) =>
    car.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a car..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredCars.map((car, index) => (
          <li key={index}>{car}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarSearchBar;
