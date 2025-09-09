const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// 📡 API ENDPOINTS - Los dos simples que documentaste

// GET /api/hello - Endpoint simple de saludo
app.get('/api/hello', (req, res) => {
    res.json({
        success: true,
        message: '¡Hola desde la API de Delfina! 👋',
        timestamp: new Date().toISOString(),
        version: 'v7'
    });
});

// POST /api/greet - Endpoint que recibe un nombre y saluda
app.post('/api/greet', (req, res) => {
    const { name, age } = req.body;
    
    // Validación simple
    if (!name) {
        return res.status(400).json({
            success: false,
            error: 'El campo "name" es requerido'
        });
    }
    
    res.json({
        success: true,
        greeting: `¡Hola ${name}! Bienvenido/a a la API de Delfina 🚀`,
        receivedData: {
            name,
            age: age || 'No especificada'
        },
        timestamp: new Date().toISOString()
    });
});

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Para desarrollo local
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

// Para Vercel
module.exports = app;
