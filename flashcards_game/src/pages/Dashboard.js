import React, { useState } from 'react';
import { getFlashcards, addFlashcard, editFlashcard, deleteFlashcard } from '../services/flashcardService';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState(getFlashcards());
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    addFlashcard(question, answer);
    setFlashcards(getFlashcards());
    setQuestion('');
    setAnswer('');
  };

  const handleEdit = (id) => {
    const card = flashcards.find(card => card.id === id);
    setQuestion(card.question);
    setAnswer(card.answer);
    setEditId(id);
  };

  const handleUpdate = () => {
    editFlashcard(editId, question, answer);
    setFlashcards(getFlashcards());
    setQuestion('');
    setAnswer('');
    setEditId(null);
  };

  const handleDelete = (id) => {
    deleteFlashcard(id);
    setFlashcards(getFlashcards());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="p-2 border border-gray-300 rounded mr-2"
        />
        {editId ? (
          <button onClick={handleUpdate} className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
        ) : (
          <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded">Add</button>
        )}
      </div>

      <div>
        {flashcards.map(card => (
          <div key={card.id} className="flex justify-between items-center bg-white p-4 mb-2 shadow rounded">
            <div>
              <p className="font-semibold">{card.question}</p>
              <p>{card.answer}</p>
            </div>
            <div>
              <button
                onClick={() => handleEdit(card.id)}
                className="px-4 py-2 bg-yellow-600 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
