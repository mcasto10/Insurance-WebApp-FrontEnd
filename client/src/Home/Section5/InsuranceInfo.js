// Content containing the Slider
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./InsuranceInfo.css";

import officePerson from '../../assets/OfficeAgent.png';
import AccidentPictures from '../../assets/UpdatedDamage.png';
import FamilyPage from '../../assets/FamilyImg.png';

const SectionSix = () => {
  const [setShowSlider] = useState(true);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 6000, // Set the autoplay speed in milliseconds (adjust as needed)
    afterChange: function handleAfterChange(index) {
      // Check if it's the last slide
      if (index === 4) {
        // Switch to text content after the last slide
        setShowSlider(false);
        // Set a timeout to switch back to the slider after a delay
        setTimeout(() => {
          setShowSlider(true);
          // Restart autoplay when switching back to the slider
          Slider.slickPlay();
        }, 6000); // Adjust the delay as needed
      }
    },
  };

  return (
    <div className="section5">
      <div className="slider-container">
        <h1 className="section-title">Trusted Insurance Service Partner</h1>
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="slider-content">
            <div>
              <img src={officePerson} alt="OfficePersonImg" className="slider-image" />
              <h2 className="slider-heading">Years of Extensive Expertise</h2>
              <p className="slider-text">
                With a commitment to excellence, we've served over 33,240 clients through our comprehensive policies. Our 15-strong agent team provides expert solutions tailored to your needs. Celebrating 20 years, we're your trusted partner in essential insurance services.
              </p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="slider-content">
            <div>
              <img src={AccidentPictures} alt="AccidentImg" className="slider-image" />
              <h2 className="slider-heading">Always there to lend a hand</h2>
              <p className="slider-text">
                Dedicated to serving the diverse needs of businesses, individuals, and families, we offer a comprehensive range of policies and provide tailored insurance solutions to meet the unique requirements of each client. Our commitment to excellence ensures that you receive personalized service and coverage suited to your specific needs.
              </p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="slider-content">
            <div>
              <img src={FamilyPage} alt="FamilyPageImg" className="slider-image" />
              <h2 className="slider-heading">Bringing Comfort for Peaceful Moments</h2>
              <p className="slider-text">
                Experience peace of mind during challenging times, knowing that we've got you covered with our comprehensive insurance solutions. Whether it's safeguarding your business, securing your family's future, or protecting your individual needs, our dedicated team is here to support you every step of the way.
              </p>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SectionSix;
