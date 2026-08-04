const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    // Verificar que la base de datos esté respondiendo
    await db.query('SELECT 1');
    res.status(200).json({ status: 'UP', message: 'API is running and connected to database.' });
  } catch (error) {
    console.error('Health Check Error:', error);
    res.status(500).json({ status: 'DOWN', message: 'Database connection failed.' });
  }
});

module.exports = router;
