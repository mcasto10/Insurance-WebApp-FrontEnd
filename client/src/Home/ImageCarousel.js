import React, { useState, useEffect } from 'react';

import Person1 from '../assets/Agents/Person1.png';
import Person2 from '../assets/Agents/Person2.png';
import Person3 from '../assets/Agents/Person3.png';
import Person4 from '../assets/Agents/Person4.png';
import Person5 from '../assets/Agents/Person5.png';
import Person6 from '../assets/Agents/Person6.png';
import Person7 from '../assets/Agents/Person7.png';
import Person8 from '../assets/Agents/Person8.png';
import Person9 from '../assets/Agents/Person9.png';
import Person10 from '../assets/Agents/Person10.png';
import Person11 from '../assets/Agents/Person11.png';
import Person12 from '../assets/Agents/Person12.png';
import Person13 from '../assets/Agents/Person13.png';
import Person14 from '../assets/Agents/Person14.png';

import './ImageCarousel.css';

const images = [
  Person1, Person2, Person3, Person4, Person5,
  Person6, Person7, Person8, Person9, Person10,
  Person11, Person12, Person13, Person14,
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="image-carousel">
      {images.map((image, index) => (
        <img
          key={index}
          className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          src={image}
          alt={`Person ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
