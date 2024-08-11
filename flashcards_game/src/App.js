import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [view, setView] = useState('home');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/flashcards'); // Ensure the URL matches your backend setup
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setFlashcards(data); // Ensure this is storing the fetched flashcards correctly
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleFlashcardsUpdate = (newFlashcard) => {
    setFlashcards([...flashcards, newFlashcard]);
  };

  return (
    <div>
      <nav className="bg-blue-500 p-4 text-white">
        <button onClick={() => setView('home')} className="mr-4">Home</button>
        <button onClick={() => setView('dashboard')}>Admin Dashboard</button>
      </nav>

      {view === 'home' ? (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
          {flashcards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {flashcards.map((flashcard) => (
                <div key={flashcard.id} className="bg-white shadow-lg p-6 rounded-lg">
                  <div className="question text-xl font-semibold">{flashcard.question}</div>
                  <div className="answer mt-2 text-gray-700">{flashcard.answer}</div>
                </div>
              ))}
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
