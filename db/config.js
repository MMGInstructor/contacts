require('dotenv').config();
const mysql = require('mysql2/promise');

// Ejemplo de variable de entorno:
// DB_CONFIG = mysql://usuario:password@localhost:3306/nombre_basedatos
const DB_CONFIG = process.env.DB_CONFIG || 'mysql://contacts:contacts@localhost:3306/contacts';

async function createConnection() {
  try {
    const connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Conexión a MySQL establecida correctamente');
    return connection;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error);
    throw error;
  }
}

module.exports = { createConnection };
