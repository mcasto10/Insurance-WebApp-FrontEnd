import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Home from '../../assets/Agents/updatedHome.png';


import Boat from '../../assets/Agents/updatedBoat.png';
import ClassicCar from '../../assets/Agents/ClassicCar.png';
import Commerical from '../../assets/Agents/Commerical.png';
import Business from '../../assets/Agents/Business.png';
import Motorcycle from '../../assets/MotorCycleImage.png';
import RV from '../../assets/Agents/RV.png';
import PersonalAuto from '../../assets/Agents/updatedVehicle.png';


import './TopServices.css';

export default function TopServices() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState(0);


    const navigate = useNavigate();


    const insuranceTypes = [
        { title: "Home", image: Home },
        { title: "Boat", image: Boat },
        { title: "Business", image: Business },
        { title: "ClassicCar", image: ClassicCar },
        { title: "Commerical", image: Commerical },
        { title: "Motorcycle", image: Motorcycle },
        { title: "RV", image: RV },
        { title: "PersonalAuto", image: PersonalAuto },
    
      ];
      const handleSlideChange = (newSlide) => {
        if (newSlide < 0) {
          setCurrentSlide(insuranceTypes.length - 1);
        } else if (newSlide >= insuranceTypes.length) {
          setCurrentSlide(0);
        } else {
          setCurrentSlide(newSlide);
        }
      };
    
      const goToPrevSlide = () => {
        setPrevSlide(currentSlide);
        if (currentSlide === 0) {
          handleSlideChange(insuranceTypes.length - 4);
        } else {
          handleSlideChange(currentSlide - 1);
        }
      };
    
      const goToNextSlide = () => {
        setPrevSlide(currentSlide);
        if (currentSlide + 4 >= insuranceTypes.length) {
          handleSlideChange(0);
        } else {
          handleSlideChange(currentSlide + 1);
        }
      };

      const handleSlideClick = (index) => {
        // Redirect to the corresponding page for the selected insurance service
        switch (index) {
          case 0:
            navigate('/HomeOwnersPage');
            return;
          case 1:
            navigate('/BoatPage');
            return;
          case 2:
            navigate('/BusinessPage');
            return;
          case 3:
            navigate('/ClassicCarPage');
            return;
          case 4:
            navigate('/CommericalAutoPage');
            return;
          case 5:
            navigate('/MotorCyclePage');
            return;
          case 6:
            navigate('/RVPage');
            return;
          case 7:
            navigate('/AutoPage');
            break;
          default:
            break;
        }
      };
    
    
    
    


    return (
        <div className="section2">
            <p className="section2-header">Top Services</p>



            <div className="carousel-container">
                <div
                    className="carousel-wrapper"
                    style={{
                        transform: `translateX(-${currentSlide * (100 / 4)}%)`
                    }}
                >
                    {insuranceTypes.map((type, index) => (
                        <div
                            className={`carousel-slide ${currentSlide === index ? 'active' : ''}`}
                            key={index}
                            onClick={() => handleSlideClick(index)}
                        >
                            <div className="image-container larger-image">
                                <img src={type.image} alt={type.title} />
                            </div>
                            <p className="image-container-text">{type.title}</p>
                        </div>
                    ))}
                </div>


                <button className="carousel-arrow prev" onClick={goToPrevSlide}>
                    &#8592;
                </button>
                <button className="carousel-arrow next" onClick={goToNextSlide}>
                    &#8594;
                </button>
            </div>
        </div>

    )
}