import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Fetch flashcards from the server
    const fetchFlashcards = async () => {
      const response = await axios.get('http://localhost:5000/api/flashcards', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setFlashcards(response.data);
    };

    fetchFlashcards();
  }, []);

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setFlipped(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  if (flashcards.length === 0) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-md">
        <div
          className={`transition-transform duration-500 transform ${flipped ? 'rotate-y-180' : ''} bg-white p-6 rounded shadow-lg`}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={handleFlip}
        >
          <div className="absolute inset-0 flex items-center justify-center backface-hidden">
            <p className="text-xl font-bold">{flashcards[currentIndex].question}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white backface-hidden rotate-y-180">
            <p className="text-xl font-bold">{flashcards[currentIndex].answer}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Previous
          </button>
          <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
