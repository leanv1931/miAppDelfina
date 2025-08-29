#!/bin/bash

# Script para ejecutar tests con UI visible
echo "🚀 Iniciando aplicación y tests con UI..."

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
    echo "📡 Servidor ya está corriendo en puerto 3001"
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

# Abrir navegador con la aplicación
echo "🌐 Abriendo aplicación en navegador..."
if command -v open > /dev/null; then
    # macOS
    open http://localhost:3001
elif command -v xdg-open > /dev/null; then
    # Linux
    xdg-open http://localhost:3001
elif command -v start > /dev/null; then
    # Windows
    start http://localhost:3001
fi

# Ejecutar tests
echo "🧪 Ejecutando tests..."
cd test
npm run test:ui

# Abrir reporte de tests
echo "📊 Abriendo reporte de tests..."
npm run report

# Mantener servidor corriendo solo si lo iniciamos nosotros
if [ "$SERVER_RUNNING" = false ]; then
    echo "✅ Tests completados. Servidor sigue corriendo en http://localhost:3001"
    echo "📊 Reporte disponible en test-results/cucumber-report.html" 
    echo "⏹️  Presiona Ctrl+C para detener el servidor"
    wait $SERVER_PID
else
    echo "✅ Tests completados!"
    echo "📊 Reporte disponible en test-results/cucumber-report.html"
    echo "🌐 Aplicación sigue disponible en http://localhost:3001"
fi
