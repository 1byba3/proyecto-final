const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRoutes = require('./routes/health');
const booksRoutes = require('./routes/books');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRoutes);
app.use('/books', booksRoutes);

// Rutas base servidas desde la carpeta public
app.use(express.static('public'));

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
