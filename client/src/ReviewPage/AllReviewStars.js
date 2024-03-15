import React from 'react';

const AllReviewStars = ({ value }) => {

    return (
        <div className="stars-container">
            {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                    key={starValue}
                    className={`star ${starValue <= value ? 'filled' : ''} ${starValue - 0.5 === value ? 'half-filled' : ''}`}
                    style={{ pointerEvents: 'none' }}
                >
                    ★
                </span>
            ))}
        </div>



    );
};

export default AllReviewStars;
