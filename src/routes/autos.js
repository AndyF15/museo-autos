// Ruta para ver autos por categoría (MODIFICADA)
router.get('/categoria/:tipo', async (req, res) => {
    // Convertimos lo que viene en la URL a MAYÚSCULAS
    const categoriaSeleccionada = req.params.tipo.toUpperCase();
    
    try {
        // Ahora buscamos siempre en mayúsculas
        const [rows] = await db.query('SELECT * FROM autos WHERE UPPER(categoria) = ?', [categoriaSeleccionada]);
        
        console.log(`Buscando categoría: ${categoriaSeleccionada}. Encontrados: ${rows.length}`);

        res.render('galeria', { 
            autos: rows, 
            categoria: categoriaSeleccionada, 
            titulo: categoriaSeleccionada 
        });
    } catch (err) {
        console.error("Error en la consulta:", err);
        res.status(500).send('Error al obtener los autos');
    }
});
