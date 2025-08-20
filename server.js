const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// Servir archivos estáticos desde la carpeta 'src'
app.use('/src', express.static(path.join(__dirname, 'src')));
// Para procesar JSON en las peticiones
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    console.log('Sirviendo página principal');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de notas
app.get('/notas', (req, res) => {
    console.log('Sirviendo página de notas');
    res.sendFile(path.join(__dirname, 'public', 'notas.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});

// Ruta 404 para manejar páginas no encontradas
app.use((req, res) => {
    console.log(`404 - Ruta no encontrada: ${req.path}`);
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const server = app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'desarrollo'}`);
    console.log(`Directorio base: ${__dirname}`);
});
