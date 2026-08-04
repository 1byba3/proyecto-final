const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM books ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Agregar un nuevo libro
router.post('/', async (req, res) => {
  const { title, author, published_year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  try {
    const query = 'INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *';
    const values = [title, author, published_year];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
