require('dotenv').config();
const mysql = require('mysql2/promise');

// Ejemplo de variable de entorno:
// DB_CONFIG = mysql://usuario:password@localhost:3306/nombre_basedatos
const DB_CONFIG = process.env.DB_CONFIG || 'mysql://contacts:contacts@localhost:3306/contacts';

// Crear el pool de conexiones
const pool = mysql.createPool({
  uri: DB_CONFIG,
  waitForConnections: true,
  connectionLimit: 10, // número máximo de conexiones simultáneas
  queueLimit: 0        // 0 = sin límite de solicitudes en cola
});

pool.getConnection()
  .then(conn => {
    console.log('✅ Conexión a MySQL establecida correctamente');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Error al conectar con MySQL:', err);
  });

// Exportar el pool para usarlo en otros módulos
module.exports = pool;
