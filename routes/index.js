const express = require('express');
const router = express.Router();
const db = require('../db/config'); // tu pool de mysql2/promise

/* Show home page. */
router.get('/', async function(req, res) {
  try {
    // Verificar si la tabla 'contacts' existe
    const [existsRows] = await db.query(
      "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'contacts'"
    );

    if (existsRows[0].count === 0) {
      // La tabla no existe
      res.render('index', { error: null, contacts: null, title: 'Contact List' });
      return;
    }

    // La tabla existe, obtener los registros
    const [contactsRows] = await db.query('SELECT * FROM contacts');
    res.render('index', { error: null, contacts: contactsRows, title: 'Contact List' });

  } catch (err) {
    console.error(err);
    res.render('index', { error: 'Database connection failure! ' + err.stack, contacts: null, title: 'Contact List' });
  }
});

/* Seed test data */
router.post('/seed', async function(req, res) {
  try {
    const seedSQL = `
      DROP TABLE IF EXISTS contacts;
      CREATE TABLE contacts(
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email VARCHAR(50) NOT NULL
      );
      INSERT INTO contacts(firstname, lastname, email) VALUES
        ('Bilbo','Baggins','bilbo@theshire.com'),
        ('Frodo','Baggins','frodo@theshire.com'),
        ('Samwise','Gamgee','sam@theshire.com'),
        ('Peregrin','Took','pippin@theshire.com'),
        ('Meriadoc','Brandybuck','merry@theshire.com');
    `;

    // mysql2 no permite múltiples queries por defecto en pool.query
    // Habilitar multipleStatements en config.js si quieres ejecutar todo junto
    await db.query(seedSQL);

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.render('index', { error: 'Seeding database failure! ' + err.stack, contacts: null, title: 'Contact List' });
  }
});

module.exports = router;
