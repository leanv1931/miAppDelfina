const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde src/public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de notas
app.get('/notas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notas.html'));
});

app.listen(3001, () => console.log('Servidor en http://localhost:3001'));
