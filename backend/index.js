import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1111password',
  database: 'flashcards_db'
});
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to DB');
    connection.release();
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
})();
// Flashcard Routes

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM flashcards');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching flashcards' });
  }
});

// Add a flashcard
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
      [question, answer]
    );
    res.status(201).json({ message: 'Flashcard added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error adding flashcard' });
  }
});

// Edit a flashcard
app.put('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
      [question, answer, id]
    );
    res.json({ message: 'Flashcard updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating flashcard' });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM flashcards WHERE id = ?', [id]);
    res.json({ message: 'Flashcard deleted successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting flashcard' });
  }
});

// Authentication Routes

// Register Route
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store user in database
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get user from database
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    const user = rows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
