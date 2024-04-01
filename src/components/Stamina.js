import React from 'react';
import { FaStar } from 'react-icons/fa';

const Stamina = ({ stamina }) => {
  const getRating = () => {
    if (stamina >= 80) {
      return 5;
    } else if (stamina >= 60) {
      return 4;
    } else if (stamina >= 40) {
      return 3;
    } else if (stamina >= 20) {
      return 2;
    } else {
      return 1;
    }
  };

  const rating = getRating();

  return (
    <div className="flex items-center">
      <div className="text-xl text-yellow-500 mr-2">
        {Array.from({ length: rating }).map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>
      <div className="text-lg text-white-700">{`Stamina: ${stamina}`}</div>
    </div>
  );
};

export default Stamina;
