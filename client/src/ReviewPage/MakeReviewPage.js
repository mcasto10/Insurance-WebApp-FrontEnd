import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';

import axios from "axios";
import './MakeReviewPage.css';

const MakeReviewPage = ({ value, onRatingChange }) => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const user = queryParams.user;
  const email = queryParams.email;

  // If value exists that'll be the default 
  const [rating, setRating] = useState(value || 0);

  const [comment, setComment] = useState('');
  const [officeLocation, setOfficeLocation] = useState('');

  const handleReview = async (e) => {
    e.preventDefault();

    const userCommentInfo = {
      comment: comment || '',  // Default to empty string if undefined or null
      rating: rating || 0,     // Default to 0 if undefined or null
      officeLocation: officeLocation || '',  // Default to empty string if undefined or null
      user: user || '',         // Default to empty string if undefined or null
    }

    try {
      await axios.post('https://insurance-webapp-backend.onrender.com/user/userComment', userCommentInfo);

    } catch (error) {
      console.log(`Error logging the user's posted Review ${error}`);
    }

    navigate('/Review');
  }

  useEffect(() => {
    setRating(value || 0);
  }, [value]);

  const handleStarClick = (starValue) => {
    setRating(starValue);
    if (onRatingChange) {
      onRatingChange(starValue);
    }
  };

  return (
    <form className="comment-form">
      <div className="user-info"> User: {user} </div>

      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <span
            key={starValue}
            className={`star ${starValue <= rating ? 'filled' : ''} ${starValue - 0.5 === rating ? 'half-filled' : ''}`}
            onClick={() => handleStarClick(starValue)}
          >
            ★
          </span>
        ))}
      </div>

      <label htmlFor="officeLocation">
        Choose an office location (optional):
      </label>
      <select
        id="officeLocation"
        name="officeLocation"
        onChange={(e) => setOfficeLocation(e.target.value)}
      >
        <option value="">Select an office location</option>
        <option value="Harbor City CA 90710"> Harbor City, CA 90710 </option>
        <option value="Paramount CA 90723"> Paramount, CA 90723 </option>
        <option value="San Pedro CA 90731"> San Pedro, CA 90731 </option>
      </select>

      <div className="comment-input">
        <textarea
          placeholder="Share your experience..."
          rows="4"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="recent-comments-header"> Most recent Comments</div>

      <button type="submit" onClick={handleReview} style = {{background: '#3F5978'}}> Create review </button>
    </form>

  );
};

export default MakeReviewPage;
