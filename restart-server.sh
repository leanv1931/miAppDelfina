#!/bin/bash

# 🔧 Script para limpiar puertos y reiniciar servidor
# Uso: ./restart-server.sh

# Cargar configuración desde archivo JavaScript
PORT=$(node -e "const config = require('./config.js'); console.log(config.CONFIG.SERVER.PORT);")

echo "🔍 Buscando procesos en puerto $PORT..."

# Matar cualquier proceso en el puerto configurado
if lsof -ti:$PORT >/dev/null 2>&1; then
    echo "💀 Matando procesos en puerto $PORT..."
    lsof -ti:$PORT | xargs kill -9
    sleep 2
else
    echo "✅ Puerto $PORT está libre"
fi

echo "🚀 Iniciando servidor en puerto $PORT..."
npm start

echo "📡 Servidor disponible en:"
echo "   🌐 Principal: http://localhost:$PORT"
echo "   📝 Notas: http://localhost:$PORT/notas"
echo "   📡 API: http://localhost:$PORT/api/notes"
