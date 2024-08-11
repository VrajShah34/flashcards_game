const flashcards = [
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is a Component?', answer: 'Reusable pieces of UI in a React application.' },
    { id: 3, question: 'What is State?', answer: 'A way to store and manage data in a React component.' },
  ];
  
  let nextId = 4;
  
  export const getFlashcards = () => {
    return flashcards;
  };
  
  export const addFlashcard = (question, answer) => {
    flashcards.push({ id: nextId++, question, answer });
  };
  
  export const editFlashcard = (id, updatedQuestion, updatedAnswer) => {
    const index = flashcards.findIndex(card => card.id === id);
    if (index !== -1) {
      flashcards[index] = { id, question: updatedQuestion, answer: updatedAnswer };
    }
  };
  
  export const deleteFlashcard = (id) => {
    const index = flashcards.findIndex(card => card.id === id);
    if (index !== -1) {
      flashcards.splice(index, 1);
    }
  };
  