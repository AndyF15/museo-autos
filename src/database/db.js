require('dotenv').config(); // Esto carga los datos del archivo .env
const mysql = require('mysql2/promise');
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
});

// Esto solo es para avisarnos si funcionó
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error:', err.message);
    } else {
        console.log('✅ ¡CONECTADO A LA NUBE, BRO!');
        connection.release();
    }
});

module.exports = db;
