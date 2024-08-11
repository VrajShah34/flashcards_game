import React, { useState } from 'react';

const Flashcard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-full max-w-xs mx-auto p-8 bg-white shadow-lg rounded-lg cursor-pointer transform transition-transform duration-500 ease-in-out"
    >
      {flipped ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{card.answer}</h2>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">{card.question}</h2>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
