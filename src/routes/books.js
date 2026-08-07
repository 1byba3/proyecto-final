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

// Actualizar un libro
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  try {
    const query = 'UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *';
    const values = [title, author, published_year, id];
    const { rows } = await db.query(query, values);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'DELETE FROM books WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully', deletedBook: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
