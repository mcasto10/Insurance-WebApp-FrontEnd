import React, { useState, useEffect } from 'react';
import './Review.css';

const Review = ({ value }) => {
  const [rating, setRating] = useState(value || 0);

  return (
<div className="star-rating">
  {[1, 2, 3, 4, 5].map((starValue) => (
    <span
      key={starValue}
      className={`star ${starValue <= rating ? 'filled' : ''} ${starValue - 0.5 === rating ? 'half-filled' : ''}`}
    >
      ★
    </span>
  ))}
</div>


  );
};

export default Review;
