const { Pool } = require('pg');
require('dotenv').config();

// Conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // Si usas Render, a veces se requiere ssl:
  ssl: { rejectUnauthorized: false }
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    published_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function setupDatabase() {
  try {
    console.log('Conectando a la base de datos...');
    await pool.query(createTableQuery);
    console.log('✅ ¡Éxito! La tabla "books" fue creada correctamente en tu base de datos.');
  } catch (error) {
    console.error('❌ Hubo un error al crear la tabla:', error.message);
  } finally {
    await pool.end();
  }
}

setupDatabase();
