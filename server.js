const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
// Servir archivos estáticos desde la carpeta 'src'
app.use('/src', express.static('src'));
// Para procesar JSON en las peticiones
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de notas
app.get('/notas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notas.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
