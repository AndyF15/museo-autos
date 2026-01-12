const express = require('express');
const router = express.Router();
const db = require('../database/db'); // Importamos la conexión a MySQL

// 1. RUTA PARA VER AUTOS POR CATEGORÍA (REFORZADA)
router.get('/categoria/:tipo', async (req, res) => {
    // Convertimos lo que viene en la URL a MAYÚSCULAS para que siempre coincida
    const categoriaSeleccionada = req.params.tipo.toUpperCase();
    
    try {
        // Buscamos ignorando mayúsculas/minúsculas y quitando espacios extra
        const [rows] = await db.query(
            'SELECT * FROM autos WHERE UPPER(TRIM(categoria)) = ?', 
            [categoriaSeleccionada]
        );
        
        console.log(`Buscando: ${categoriaSeleccionada} | Encontrados: ${rows.length}`);

        res.render('galeria', { 
            autos: rows, 
            categoria: categoriaSeleccionada, 
            titulo: `Categoría: ${categoriaSeleccionada}` 
        });
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send('Error al obtener los autos');
    }
});

// 2. RUTA PARA VER EL FORMULARIO DE ADMIN
router.get('/admin', (req, res) => {
    res.render('admin');
});

// 3. RUTA PARA PROCESAR EL FORMULARIO DE AGREGAR AUTO
router.post('/admin/add', async (req, res) => {
    const { nombre, categoria, descripcion, imagen_url, hp, año } = req.body;
    
    try {
        // Aseguramos que la categoría se guarde en MAYÚSCULAS para mantener orden
        await db.query(
            'INSERT INTO autos (nombre, categoria, descripcion, imagen_url, hp, año) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, categoria.toUpperCase(), descripcion, imagen_url, hp, año]
        );
        res.redirect('/'); 
    } catch (err) {
        console.error("Error al insertar:", err);
        res.status(500).send('Error al guardar el auto');
    }
});

module.exports = router;
