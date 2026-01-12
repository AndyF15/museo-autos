const express = require('express');
const app = express();
const path = require('path');
const autosRoutes = require('./src/routes/autos'); // Importar rutas

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));

// USAR LAS RUTAS
app.use('/', autosRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});
app.use(express.urlencoded({ extended: true }));