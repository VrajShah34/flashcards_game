import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [view, setView] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleFlashcardsUpdate = (newFlashcard) => {
    setFlashcards([...flashcards, newFlashcard]);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4 text-white">
        <button onClick={() => setView('home')} className="mr-4">Home</button>
        <button onClick={() => setView('dashboard')}>Admin Dashboard</button>
      </nav>

      {view === 'home' ? (
        <div className="p-4 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
          <h1 className="text-base font-thin mt-5 from-neutral-400">Click to reveal answer</h1>
          {flashcards.length > 0 ? (
            <div className="flex flex-col items-center , cursor-pointer">
              <div
                className="relative w-64 h-40"
                onClick={handleFlip}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`absolute w-full h-full text-center transition-transform transform duration-700 ease-in-out ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div
                    className="absolute w-full h-full flex items-center justify-center backface-hidden bg-white shadow-lg p-6 rounded-lg"
                    style={{ transform: 'rotateY(0deg)', backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-xl font-semibold">
                      {flashcards[currentIndex].question}
                    </span>
                  </div>
                  <div
                    className="absolute w-full h-full flex items-center justify-center backface-hidden bg-white shadow-lg p-6 rounded-lg"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                  >
                    <span className="text-xl font-semibold">
                      {flashcards[currentIndex].answer}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={handlePrevious}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p>No flashcards available. Please add some in the Admin Dashboard.</p>
          )}
        </div>
      ) : (
        <Dashboard onFlashcardsUpdate={handleFlashcardsUpdate} />
      )}
    </div>
  );
};

export default App;
