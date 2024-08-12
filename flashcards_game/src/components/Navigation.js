
import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ cards }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {cards.map((card, index) => (
        <Flashcard key={index} card={card} />
      ))}
    </div>
  );
};

export default FlashcardList;
