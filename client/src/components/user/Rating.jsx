import React, { useState, useEffect } from 'react'

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);
  
  const handleRating = (value) => {
    setRating(value);
    if (onRate) onRate(value);
  };
  
  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span 
            onClick={() => handleRating(starValue)}
            key={index}
            className={`flex text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? 'text-yellow-500 d-flex' : 'text-gray-400 d-flex'
            }`}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
}  

export default Rating