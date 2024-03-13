import React from 'react';

import OpeningPage from './Section1/OpeningPage.js';
import AutoRegistration from './Section4/AutoRegistration.js';
import ReviewInfo from './Section6/ReviewInfo.js';
import InsuranceInfo from './Section5/InsuranceInfo.js';

import AboutUsInfo from './Section8/AboutUsInfo.js';

import OfficeLocationInfo from './Section7/OfficeLocationinfo.js';
import ContactAgent from './Section9/ContactAgent.js';
import MobilePhone from './Section3/MobilePhone';
import TopServices from './Section2/TopServices.js';


import "./Home.css";


export default function Home() {

  // const [isOpen, setIsOpen] = useState(false);


  // useEffect(() => {
  //   const autoSlideInterval = setInterval(() => {
  //     setCurrentIndex((prevIndex) =>
  //       prevIndex < galleryItems.length - 1 ? prevIndex + 1 : 0
  //     );
  //   }, 6000);

  //   return () => {
  //     clearInterval(autoSlideInterval);
  //   };
  // }, []);


  // const toggleDropdown = () => {
  //   setIsOpen((prevIsOpen) => !prevIsOpen);
  // };




  // const handleReviewClick = async () => {
  //   try {
  //     const responseUserInfo = await axios.get('http://localhost:3001/user/CheckAuthStatus', {
  //       withCredentials: true,
  //     });


  //     if (responseUserInfo.status === 200) {
  //       try {
  //         const responseUser = await axios.get(`http://localhost:3001/user/GetUserInformation?userId=${responseUserInfo.data.user.userId}`, {
  //           withCredentials: true,
  //         });


  //         // Check if the response data contains user information
  //         if (responseUser.data) {
  //           const { firstName, middleName, lastName } = responseUser.data.userInfo;

  //           const fullName = `${firstName} ${middleName} ${lastName}`.trim().replace(/\s+/g, ' ');


  //           navigate(`/MakeReview?user=${fullName}`);

  //         }
  //       } catch (error) {
  //         console.log("Incorrect User authentication ${error)");
  //       }
  //     }

  //   } catch (error) {
  //     console.error(`Error checking user login Status: ${error.message}`);

  //     navigate('/Login-Type?routeFrom=ReviewPage');
  //   }
  // }

  return (
    <div className="home">

      {/* Section1 */}
      <OpeningPage />

      {/* Section2 */}
      <TopServices />

      {/* Section3 */}
      <MobilePhone />

      {/* Section4 */}
      <AutoRegistration />

      {/* Section5 */}
      <InsuranceInfo />


      {/* Section6 */}
      <ReviewInfo />


      {/* Section7 */}
      <OfficeLocationInfo />


      {/* Section8 */}
      <AboutUsInfo />


      {/* Section9 */}
      <ContactAgent />
    </div>
  );
}