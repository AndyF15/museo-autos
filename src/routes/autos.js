const express = require('express');
const router = express.Router();
const db = require('../database/db'); 

// 1. RUTA PARA CATEGORÍAS
router.get('/categoria/:tipo', async (req, res) => {
    const categoriaUrl = req.params.tipo.toUpperCase();
    
    try {
        // Buscamos en la base de datos
        const [rows] = await db.query(
            'SELECT * FROM autos WHERE UPPER(TRIM(categoria)) = ?', 
            [categoriaUrl]
        );
        
        res.render('galeria', { 
            autos: rows, 
            categoria: categoriaUrl, 
            titulo: categoriaUrl 
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send('Error en el servidor');
    }
});

// 2. RUTA ADMIN
router.get('/admin', (req, res) => {
    res.render('admin');
});

// 3. RUTA AGREGAR AUTO
router.post('/admin/add', async (req, res) => {
    const { nombre, categoria, descripcion, imagen_url, hp, año } = req.body;
    try {
        await db.query(
            'INSERT INTO autos (nombre, categoria, descripcion, imagen_url, hp, año) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, categoria.toUpperCase(), descripcion, imagen_url, hp, año]
        );
        res.redirect('/'); 
    } catch (err) {
        res.status(500).send('Error al guardar');
    }
});

module.exports = router;
