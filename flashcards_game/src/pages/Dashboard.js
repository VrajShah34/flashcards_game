import React, { useState, useEffect } from 'react';

const Dashboard = ({ onFlashcardsUpdate }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

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

  const handleAddOrUpdateFlashcard = async () => {
    if (editMode) {
      await fetch(`http://localhost:5000/api/flashcards/${currentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
    } else {
      const response = await fetch('http://localhost:5000/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, answer }),
      });
      const newFlashcard = await response.json();
      onFlashcardsUpdate(newFlashcard);
    }

    setEditMode(false);
    setQuestion('');
    setAnswer('');
    setCurrentId(null);
    const fetchUpdatedFlashcards = async () => {
      const response = await fetch('http://localhost:5000/api/flashcards');
      const updatedData = await response.json();
      setFlashcards(updatedData);
    };
    fetchUpdatedFlashcards();
  };

  const handleEditFlashcard = (id, currentQuestion, currentAnswer) => {
    setEditMode(true);
    setQuestion(currentQuestion);
    setAnswer(currentAnswer);
    setCurrentId(id);
  };

  const handleDeleteFlashcard = async (id) => {
    await fetch(`http://localhost:5000/api/flashcards/${id}`, {
      method: 'DELETE',
    });

    const fetchUpdatedFlashcards = async () => {
      const response = await fetch('http://localhost:5000/api/flashcards');
      const updatedData = await response.json();
      setFlashcards(updatedData);
    };
    fetchUpdatedFlashcards();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleAddOrUpdateFlashcard}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          {editMode ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Manage Flashcards</h2>
        <ul>
          {flashcards.map((flashcard) => (
            <li key={flashcard.id} className="mb-2 p-2 border rounded flex justify-between items-center">
              <div>
                <p className="font-semibold">{flashcard.question}</p>
                <p className="text-gray-600">{flashcard.answer}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEditFlashcard(flashcard.id, flashcard.question, flashcard.answer)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteFlashcard(flashcard.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
