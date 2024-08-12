import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Assuming Navbar component is in the components folder

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
    <div>
      <Navbar onLogout={() => {}} />  {/* Add Navbar here */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="relative w-full max-w-lg"> {/* Increased the size */}
          <div
            className={`transition-transform duration-500 transform ${flipped ? 'rotate-y-180' : ''} bg-white p-8 shadow-lg rounded-lg`}
            style={{ transformStyle: 'preserve-3d', height: '300px', width: '500px' }} // Correct inline styles syntax
            onClick={handleFlip}
          >
            <div className="absolute inset-0 flex items-center justify-center backface-hidden">
              <p className="text-2xl font-bold">{flashcards[currentIndex].question}</p>
            </div>
            <div className="absolute inset-0 flex  justify-center bg-yellow-200 text-black backface-hidden rotate-y-180  rounded-lg p-4 items-center">
              <p className="text-2xl font-bold">{flashcards[currentIndex].answer}</p>
            </div>
          </div>
          <div className="flex justify-between mt-7">
            <button onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Previous
            </button>
            <button onClick={handleNext} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
