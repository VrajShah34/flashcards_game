import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlashcardList from './components/FlashcardList';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';

const App = () => {
  const flashcards = [
    { question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { question: 'What is a Component?', answer: 'Reusable pieces of UI in a React application.' },
    { question: 'What is State?', answer: 'A way to store and manage data in a React component.' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4">
          <Link to="/" className="mr-4 text-blue-600">Home</Link>
          <Link to="/dashboard" className="text-blue-600">Admin Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FlashcardList cards={flashcards} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
