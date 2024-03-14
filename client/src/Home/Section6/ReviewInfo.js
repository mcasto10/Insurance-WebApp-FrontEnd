import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import ReviewPage from '../../ReviewPage/ReviewPage.js';

import './ReviewInfo.css';

export default function ReviewInfo() {

  const navigate = useNavigate();


  const handleReviewClick = async () => {
    try {
      const responseUserInfo = await axios.get('https://insurance-webapp-backend.onrender.com/user/CheckAuthStatus', {
        withCredentials: true,
      });
    

      if (responseUserInfo.status === 200) {
        try {
          const responseUser = await axios.get(`https://insurance-webapp-backend.onrender.com/user/GetUserInformation?userId=${responseUserInfo.data.user.userId}`, {
            withCredentials: true,
          });
        

          // Check if the response data contains user information
          if (responseUser.data) {
            const { firstName, middleName, lastName } = responseUser.data.userInfo;

            const fullName = `${firstName} ${middleName} ${lastName}`.trim().replace(/\s+/g, ' ');


            navigate(`/MakeReview?user=${fullName}`);

          }
        } catch (error) {
          console.log("Incorrect User authentication ${error)");
        }
      }

    } catch (error) {
      console.error(`Error checking user login Status: ${error.message}`);

      navigate('/Login-Type?routeFrom=ReviewPage');
    }
  }





  return (
    <div className="section6" style={{ background: '#F7F8FC' }}>

      <ReviewPage />
      <div className="table-row">

        <div className="row-divider"></div>

        <div className="reviewContent">

          <div className="see-more">
            <Link to="/Review">
              <button className = "SeeAllComments"> See all Reviews </button>
            </Link>

            <button className = "MakeReview" onClick={handleReviewClick}>Make a Review</button>
          </div>


        </div>
      </div>
    </div>
  )

}