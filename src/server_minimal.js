const express = require('express');
const path = require('path');
const { CONFIG } = require('../config.js');

const app = express();
app.use(express.json());

// Servir archivos estáticos
const staticPath = path.join(process.cwd(), 'public');
app.use(express.static(staticPath));

// Base de datos en memoria
let notes = [
    { id: 1, text: "Nota de ejemplo", createdAt: new Date().toISOString() }
];
let nextId = 2;

// API: Ver notas
app.get('/api/notes', (req, res) => {
    res.json({ notes });
});

// API: Crear nota
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Text required' });
    }
    
    const newNote = {
        id: nextId++,
        text,
        createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    res.status(201).json({ note: newNote });
});

// Rutas web
app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.get('/notas', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'notas.html'));
});

// Para desarrollo local
if (require.main === module) {
    app.listen(CONFIG.SERVER.PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${CONFIG.SERVER.PORT}`);
    });
}

module.exports = app;
