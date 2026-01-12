const express = require('express');
const app = express();
const path = require('path');
const autosRoutes = require('./src/routes/autos');

// 1. MIDDLEWARES (Deben ir antes que las rutas)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

// 2. CONFIGURACIÓN DE VISTAS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 3. RUTAS
app.use('/', autosRoutes);

// Ruta para la home (si no está definida en autosRoutes)
app.get('/', (req, res) => {
    res.render('index');
});

// 4. ENCENDIDO DEL SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en puerto ${PORT}`);
});
