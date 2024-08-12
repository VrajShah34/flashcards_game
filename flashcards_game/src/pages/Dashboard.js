import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState('');
  const [editingAnswer, setEditingAnswer] = useState('');

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await axios.get('http://localhost:5000/api/flashcards');
      setFlashcards(response.data);
    };

    fetchFlashcards();
  }, []);

  const addFlashcard = async () => {
    const response = await axios.post('http://localhost:5000/api/flashcards', {
      question: newQuestion,
      answer: newAnswer,
    });
    setFlashcards([...flashcards, { id: response.data.id, question: newQuestion, answer: newAnswer }]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const updateFlashcard = async (id) => {
    await axios.put(`http://localhost:5000/api/flashcards/${id}`, {
      question: editingQuestion,
      answer: editingAnswer,
    });
    setFlashcards(flashcards.map(flashcard => 
      flashcard.id === id ? { id, question: editingQuestion, answer: editingAnswer } : flashcard
    ));
    setEditingId(null);
  };

  const deleteFlashcard = async (id) => {
    await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
    setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
  };

  return (
    <div>
    <Navbar onLogout={() => {}} />  {/* Add Navbar here */}
    <div className="p-4 flex items-center flex-col w-full justify-center">
    
      <div className='flex items-center w-full'>
        <h1 className="text-2xl font-bold mb-4 text-center w-full">Admin Dashboard</h1>
      </div>
      
      <div className="mb-4 border-2 border-gray-900 p-4 w-full max-w-lg">
        <h1 className="text-xl font-bold mb-4">Create New Flashcard</h1>

        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="New Question"
          className="border p-2 mr-2 w-full"
        />
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="New Answer"
          className="border p-2 mr-2 w-full"
        />
        <button onClick={addFlashcard} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
          Add Flashcard
        </button>
      </div>

      <div className="w-full max-w-lg">
        {flashcards.map(flashcard => (
          <div key={flashcard.id} className="border p-4 mb-4">
            {editingId === flashcard.id ? (
              <>
                <input
                  type="text"
                  value={editingQuestion}
                  onChange={(e) => setEditingQuestion(e.target.value)}
                  placeholder="Edit Question"
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="text"
                  value={editingAnswer}
                  onChange={(e) => setEditingAnswer(e.target.value)}
                  placeholder="Edit Answer"
                  className="border p-2 mb-2 w-full"
                />
                <button onClick={() => updateFlashcard(flashcard.id)} className="bg-green-500 text-white px-4 py-2 rounded w-full">
                  Save
                </button>
                <button onClick={() => setEditingId(null)} className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="font-bold">Q: {flashcard.question}</p>
                <p className="font-bold">A: {flashcard.answer}</p>
                <button
                  onClick={() => {
                    setEditingId(flashcard.id);
                    setEditingQuestion(flashcard.question);
                    setEditingAnswer(flashcard.answer);
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 mt-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFlashcard(flashcard.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
