const express = require('express');
const path = require('path');

// 🔧 Importar configuración centralizada
const { CONFIG, URLS } = require('../config.js');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Base de datos en memoria (temporal para aprendizaje)
let notes = [
    { id: 1, text: "Nota de ejemplo", createdAt: new Date().toISOString() },
    { id: 2, text: "Aprender API testing", createdAt: new Date().toISOString() }
];
let nextId = 3;

// Servir archivos estáticos desde src/public
app.use(express.static(path.join(__dirname, 'public')));

// 📡 API ENDPOINTS
// GET /api/notes - Obtener todas las notas
app.get('/api/notes', (req, res) => {
    res.json({ 
        success: true, 
        count: notes.length,
        notes: notes 
    });
});

// GET /api/notes/:id - Obtener nota específica
app.get('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(n => n.id === id);
    
    if (!note) {
        return res.status(404).json({ 
            success: false, 
            error: 'Nota no encontrada' 
        });
    }
    
    res.json({ 
        success: true, 
        note: note 
    });
});

// POST /api/notes - Crear nueva nota
app.post('/api/notes', (req, res) => {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            error: 'El texto es requerido' 
        });
    }
    
    const newNote = {
        id: nextId++,
        text: text.trim(),
        createdAt: new Date().toISOString()
    };
    
    notes.push(newNote);
    
    res.status(201).json({ 
        success: true, 
        note: newNote 
    });
});

// PUT /api/notes/:id - Actualizar nota
app.put('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
        return res.status(400).json({ 
            success: false, 
            error: 'El texto es requerido' 
        });
    }
    
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) {
        return res.status(404).json({ 
            success: false, 
            error: 'Nota no encontrada' 
        });
    }
    
    notes[noteIndex].text = text.trim();
    notes[noteIndex].updatedAt = new Date().toISOString();
    
    res.json({ 
        success: true, 
        note: notes[noteIndex] 
    });
});

// DELETE /api/notes/:id - Eliminar nota
app.delete('/api/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) {
        return res.status(404).json({ 
            success: false, 
            error: 'Nota no encontrada' 
        });
    }
    
    const deletedNote = notes.splice(noteIndex, 1)[0];
    
    res.json({ 
        success: true, 
        message: 'Nota eliminada',
        note: deletedNote 
    });
});

// 🌐 RUTAS WEB (UI)
// Ruta para la página de notas
app.get('/notas', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notas.html'));
});

app.listen(CONFIG.SERVER.PORT, () => {
    console.log(`🚀 Servidor corriendo en ${URLS.BASE}`);
    console.log(`📝 Página de notas: ${URLS.NOTES}`);
    console.log(`📡 API: ${URLS.API_NOTES}`);
});
