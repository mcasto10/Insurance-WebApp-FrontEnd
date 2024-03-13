import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  // Assuming you are using React Router
import AllReviewStars from './AllReviewStars.js';

const ReviewPage = () => {

  const location = useLocation();
  const isReviewPage = location.pathname === '/Review';

  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState([]);
  const [ratingData, setRatingData] = useState([]);
  const [ratingStar, setRatingStar] = useState();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const commentsPerPage = 5; // Adjust as needed

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    setRatingData(calculateRatingDistribution(reviews));
    setRatingStar(calculateTotalRating(reviews));
  }, [reviews]);

  useEffect(() => {
    // Update visible reviews when reviews change or commentsPerPage changes
    setVisibleReviews(reviews.slice(0, commentsPerPage));
  }, [reviews, commentsPerPage]);

  const fetchReviews = async () => {
    try {
      const responseAllUserReview = await axios.get('http://localhost:3001/user/getAllUserComments', {
        params: {
          selectedLocations: selectedLocations.join(',')
        }
      });

      if (responseAllUserReview.status === 200) {
        const data = responseAllUserReview.data;
        setReviews(data);
        setShowLoadMoreButton(data.length > commentsPerPage && isReviewPage);
      } else {
        console.error('Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleLoadMoreClick = () => {
    const currentlyVisible = visibleReviews.length;
    const newVisible = reviews.slice(currentlyVisible, currentlyVisible + commentsPerPage);
    setVisibleReviews((prevVisible) => [...prevVisible, ...newVisible]);
    setShowLoadMoreButton(reviews.length > currentlyVisible + commentsPerPage && isReviewPage);
  };

  const handleRestrictionButton = async (event) => {
    event.preventDefault();
    await fetchReviews(); // Call the fetchReviews function here
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedLocations((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedLocations((prevSelected) => prevSelected.filter((loc) => loc !== value));
    }
  };

  const timeConvertion = (timestamp) => {
    const newDateFormat = new Date(timestamp);

    let hours = newDateFormat.getHours();
    const minutes = newDateFormat.getMinutes();
    const seconds = newDateFormat.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format if needed
    hours = hours % 12 || 12; // Handle the case when hours is 0

    const formattedDate = `${String(newDateFormat.getMonth() + 1).padStart(2, '0')}/${String(newDateFormat.getDate()).padStart(2, '0')}/${newDateFormat.getFullYear()} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${amOrPm}`;

    return formattedDate;
  }

  const ReviewItem = ({ rating, user, createdAt, comment, officeLocation }) => (
    <div>
      <div className="table-row">
        <div className="table-cell" style={{ display: 'flex', alignItems: 'center' }}
        >
          <AllReviewStars value={rating} />
          <div style={{ fontSize: '25x', marginLeft: '10px' }}>{user} </div>
        </div>
        <div className="table-cell" style={{ fontSize: '18px' }}>
          {timeConvertion(createdAt)}
        </div>
        <div className="table-cell" style={{ fontSize: '18px' }}>
          {officeLocation}
        </div>
      </div>
      <div className="table-row">
        <div style={{ fontSize: '22px' }}>{comment}</div>
      </div>
      <div style={{ fontSize: '18px' }}>Like</div>
      <div className="row-divider"></div>
    </div>
  );

  const calculateTotalRating = (reviews) => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length || 0;
    return averageRating.toFixed(1); // Assuming you want to display a decimal value
  };

  const calculateRatingDistribution = (reviews) => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    reviews.forEach(review => {
      distribution[review.rating] += 1;
    });

    const totalReviews = reviews.length;

    return Object.entries(distribution).map(([stars, count]) => ({
      stars: parseInt(stars, 10),
      percentage: Math.round((count / totalReviews) * 100)  // Rounded to the whole number

    }));
  };



  return (
    <form className='section6'>
      <div className='margins'>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '54px', color: '#3F5978', marginTop: '8%' }}>Customers Reviews</h1>
        </div>
        <div className="row-divider"></div>

        <div className="table-row">

          <div className='leftReviewHeader' >
            <div className="horizontal-bar-chart">
              {ratingData.map((data) => (
                <div key={data.stars} className='full-bar-container'>
                  <div>{data.stars} star</div>
                  <div className="bar-container">
                    <div className="bar" style={{
                      width: `${data.percentage}%`, borderRadius: data.percentage === 100 ? '5px' : '5px 0 0 5px',
                    }}></div>
                  </div>
                  <div className="percentage">{data.percentage}%</div>
                </div>
              ))}

              <div className="table-cell" style={{ fontSize: '20px' }}>
                Total Rating: {calculateTotalRating(reviews)}
              </div>
              <div className="table-cell">
                <AllReviewStars value={ratingStar} />
              </div>

            </div>
          </div>



          <div className='rightReviewHeader' >

            <h3 style={{ color: '#3F5978', fontSize: '25px' }}> Filter to see specific comments:</h3>



            <div className="checkbox-container">
              <input
                type="checkbox"
                value="Harbor City CA 90710"
                onChange={handleCheckboxChange}
                style={{ marginRight: '8px' }}

              />
              <p style={{ fontSize: '18px' }}> Harbor City, CA 90710 </p>
            </div>
            <div className="checkbox-container">

              <input
                type="checkbox"
                value="Paramount CA 90723"
                style={{ marginRight: '8px' }}
                onChange={handleCheckboxChange}
              />
              <p style={{ fontSize: '18px' }}> Paramount, CA 90723 </p>
            </div>
            <div className="checkbox-container">

              <input
                type="checkbox"
                value="San Pedro CA 90731"
                style={{ marginRight: '8px' }}
                onChange={handleCheckboxChange}
              />
              <p style={{ fontSize: '18px' }}> San Pedro, CA 90731 </p>
            </div>

            <button onClick={handleRestrictionButton} style={{
              width: '35%',
              padding: '8px',
              marginTop: '10px',
              background: '#3F5978'
            }}> Apply </button>


          </div>

        </div>

        <div className="row-divider"></div>
        <div>
          {visibleReviews.map((review) => (
            <ReviewItem key={review.id} {...review} />
          ))}
        </div>

        {showLoadMoreButton && (
          <button style={{ background: '#3F5978', marginTop: '40px', marginBottom: '40px' }} onClick={handleLoadMoreClick}>Load More Comments</button>
        )}
      </div>
    </form>
  );
};

export default ReviewPage;
