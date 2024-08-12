import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flashcards');
        setFlashcards(response.data);
      } catch (err) {
        console.error('Error fetching flashcards:', err);
      }
    };

    fetchFlashcards();
  }, []);

  const handleAddFlashcard = async () => {
    try {
      await axios.post('http://localhost:5000/api/flashcards', { question, answer });
      setQuestion('');
      setAnswer('');
      // Refresh the list
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    } catch (err) {
      console.error('Error adding flashcard:', err);
    }
  };

  return (
    <div>
      <Navbar onLogout={() => {}} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <div className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Question"
            className="p-2 border border-gray-300 rounded mr-2"
          />
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
            className="p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleAddFlashcard}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Flashcard
          </button>
        </div>
        <div>
          {flashcards.map((card) => (
            <div key={card.id} className="p-2 border border-gray-300 mb-2">
              <p className="font-bold">{card.question}</p>
              <p>{card.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
