import React, { useState } from 'react';
import saintPedro from '../../assets/SaintPedro-Office.png';
import paremont from '../../assets/Paremont-Office.png';
import haberCity from '../../assets/HaberCity-Office.png';
import { Link } from 'react-router-dom';

import './OfficeLocationinfo.css';

import Slider from 'react-slick';

export default function OfficeLocationinfo() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryItems = [
    {   
      name: 'Paramount',
      title: 'Paramount Aris Insurance Service', location: '7922 Rosecrans Ave Ste E, Paramount, CA 90723', 
      image: saintPedro,
    },
    {
      name: 'Harbor City',
       title: 'Harbor City Aris Insurance Service', location: '1212 Pacific Coast Hwy, Harbor City, CA 90710', 
      image: paremont,
    },
    {
      name: 'San Pedro',
      title: 'San Pedro Aris Insurance Service', location: '639 W Channel St, San Pedro, CA 90731', 
      image: haberCity,
    },
  ];

  

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current, next) => {
      setCurrentIndex(next);
    },
  };


  return (
    <div className="section7">

    {/* <div className="content"> */}
      {/* <div className="center-text"> */}
      <div> 
        <h1 style={{ textAlign: 'center', fontSize: '54px' }}> Office Location </h1>
        <div className="gallery-container" id="tv-plus-gallery">
          <Slider {...settings}>
            {galleryItems.map((item, index) => (
              <div className="gallery-item-container" key={index}>
                <div
                  className="inner"
                  style={{
                    transition: 'opacity 0.5s ease',
                    position: 'relative',
                  }}
                >
                  <img
                    src={item.image}
                    alt={`Office ${index + 1}`}
                    className="gallery-image"
                    style={{
                      height: '650px',
                      width: '100%',
                      objectFit: 'cover',
                      margin: '0 auto',
                      opacity: index === currentIndex ? 1 : 0.5,
                    }}
                  />
                  {index !== currentIndex && (
                    <div
                      className="overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '90%',
                        background: 'rgba(255, 255, 255, 0.2)', // Adjust the color and opacity as needed
                        pointerEvents: 'none',
                      }}
                    ></div>
                  )}
                </div>
                <p className={`gallery-item-title ${index === currentIndex ? 'active' : ''}`}>

                <Link to={`/Agent/Calender?name=${item.title}&location=${item.location}`}>
                      <button className='buttonScheduleApp'>  Schedule an appointment at {item.name} Office</button>
                    </Link>
                    </p>
              </div>
            ))}
          </Slider>
          </div>
        </div>
      {/* </div> */}
    {/* </div> */}
    </div>
  );
}
