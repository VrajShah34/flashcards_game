import axios from 'axios';

const API_URL = 'http://localhost:5000/api/flashcards';

export const getFlashcards = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addFlashcard = async (question, answer) => {
  const response = await axios.post(API_URL, { question, answer });
  return response.data;
};

export const updateFlashcard = async (id, question, answer) => {
  const response = await axios.put(`${API_URL}/${id}`, { question, answer });
  return response.data;
};

export const deleteFlashcard = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
