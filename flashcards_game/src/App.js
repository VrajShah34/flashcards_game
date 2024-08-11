import React, { useState } from 'react';
import FlashcardList from './components/FlashcardList';
import Navigation from './components/Navigation';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is a Component?', answer: 'Reusable pieces of UI in a React application.' },
    { question: 'What is State?', answer: 'A way to store and manage data in a React component.' },
  ];

  const handlePrev = () => {
    setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : 0);
  };

  const handleNext = () => {
    setCurrentIndex(currentIndex < flashcards.length - 1 ? currentIndex + 1 : flashcards.length - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <FlashcardList cards={[flashcards[currentIndex]]} />
      <Navigation
        currentIndex={currentIndex}
        total={flashcards.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
};

export default App;
