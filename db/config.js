// db/config.js
const mysql = require('mysql2/promise');
require('dotenv').config();

// Leer variables de entorno
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'contacts';
const DB_PASSWORD = process.env.DB_PASSWORD || 'contacts';
const DB_NAME = process.env.DB_NAME || 'contacts';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true 
});

// Test de conexión al iniciar la app
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida correctamente');
    conn.release();
  } catch (err) {
    console.error('❌ Error al conectar con MySQL:', err);
    process.exit(1); // salir si no se puede conectar
  }
})();

module.exports = pool;

