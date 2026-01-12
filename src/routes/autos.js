const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Importamos la conexión a MySQL

// Ruta para ver autos por categoría
router.get('/categoria/:tipo', async (req, res) => {
    const categoriaSeleccionada = req.params.tipo;
    
    try {
        // Hacemos la consulta a MySQL filtrando por la categoría de la URL
        // Usamos [rows] porque db.query devuelve un array donde el primer elemento son los resultados
        const [rows] = await db.query('SELECT * FROM autos WHERE categoria = ?', [categoriaSeleccionada]);
        
        // Renderizamos "galeria.ejs" pasándole los datos necesarios
        res.render('galeria', { 
            autos: rows, 
            categoria: categoriaSeleccionada, // Esta es la que activa al Michelin
            titulo: categoriaSeleccionada 
        });
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send('Error al obtener los autos');
    }
});

// Ruta para ver el formulario de Admin
router.get('/admin', (req, res) => {
    res.render('admin');
});

// Ruta para procesar el formulario de agregar auto
router.post('/admin/add', async (req, res) => {
    const { nombre, categoria, descripcion, imagen_url, hp, año } = req.body;
    
    try {
        await db.query(
            'INSERT INTO autos (nombre, categoria, descripcion, imagen_url, hp, año) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, categoria, descripcion, imagen_url, hp, año]
        );
        res.redirect('/'); // Al terminar, nos manda al inicio para ver el cambio
    } catch (err) {
        console.error("Error al insertar:", err);
        res.status(500).send('Error al guardar el auto');
    }
});

module.exports = router;