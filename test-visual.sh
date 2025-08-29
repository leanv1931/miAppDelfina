#!/bin/bash

# Script para ejecutar tests en modo DEBUG VISUAL
echo "🎬 MODO DEBUG VISUAL - Tests paso a paso"
echo "👀 Verás cada acción en el navegador con pausas"
echo "📝 Logs detallados en la consola"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo "🧹 Limpiando procesos..."
    kill $(jobs -p) 2>/dev/null
    exit
}

# Capturar señal de interrupción
trap cleanup SIGINT SIGTERM

# Verificar si el servidor ya está corriendo
if curl -s http://localhost:3001 > /dev/null; then
    echo "📡 Servidor detectado en puerto 3001"
    SERVER_RUNNING=true
else
    # Iniciar servidor en background
    echo "📡 Iniciando servidor..."
    npm start &
    SERVER_PID=$!
    SERVER_RUNNING=false
    
    # Esperar a que el servidor esté listo
    echo "⏳ Esperando a que el servidor esté listo..."
    for i in {1..10}; do
        if curl -s http://localhost:3001 > /dev/null; then
            echo "✅ Servidor listo!"
            break
        fi
        sleep 1
    done
fi

echo ""
echo "🚀 Iniciando tests en modo visual..."
echo "👁️  El navegador se abrirá y verás cada paso"
echo "⏱️  Cada acción tiene pausa de 1 segundo"
echo "🖱️  Los elementos se resaltarán antes de interactuar"
echo ""

# Ejecutar tests en modo visual
cd test
npm run test:visual

echo ""
echo "✅ Tests completados!"

# Mantener servidor corriendo solo si lo iniciamos nosotros
if [ "$SERVER_RUNNING" = false ]; then
    echo "⏹️  Presiona Ctrl+C para detener el servidor"
    wait $SERVER_PID
else
    echo "🌐 Aplicación sigue disponible en http://localhost:3001"
fi
