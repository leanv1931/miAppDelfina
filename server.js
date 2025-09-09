const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// Servir archivos estáticos
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de notas
app.get('/notas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notas.html'));
});

// Solo iniciar servidor si no es Vercel
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

module.exports = app;
