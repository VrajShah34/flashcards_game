const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'flashcards_db',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Get all flashcards
app.get('/api/flashcards', (req, res) => {
  const query = 'SELECT * FROM flashcards';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching flashcards:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Add a flashcard
app.post('/api/flashcards', (req, res) => {
  const { question, answer } = req.body;
  const query = 'INSERT INTO flashcards (question, answer) VALUES (?, ?)';
  db.query(query, [question, answer], (err, result) => {
    if (err) {
      console.error('Error adding flashcard:', err);
      res.status(500).send('Server error');
    } else {
      const newFlashcard = { id: result.insertId, question, answer };
      res.status(201).json(newFlashcard);
    }
  });
});

// Update a flashcard
app.put('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  const query = 'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?';
  db.query(query, [question, answer, id], (err) => {
    if (err) {
      console.error('Error updating flashcard:', err);
      res.status(500).send('Server error');
    } else {
      res.sendStatus(204);
    }
  });
});

// Delete a flashcard
app.delete('/api/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM flashcards WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting flashcard:', err);
      res.status(500).send('Server error');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
