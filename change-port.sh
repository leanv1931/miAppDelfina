#!/bin/bash

# 🔧 Script para cambiar puerto en ambos archivos
# Uso: ./change-port.sh 4000

NEW_PORT=$1

if [ -z "$NEW_PORT" ]; then
    echo "❌ Error: Especifica el puerto"
    echo "Uso: ./change-port.sh 4000"
    exit 1
fi

echo "🔄 Cambiando puerto a $NEW_PORT en ambos archivos..."

# Cambiar en config.js
sed -i '' "s/PORT: [0-9]*/PORT: $NEW_PORT/" config.js

# Cambiar en test/config.ts  
sed -i '' "s/PORT: [0-9]*/PORT: $NEW_PORT/" test/config.ts

echo "✅ Puerto actualizado a $NEW_PORT en:"
echo "   📁 config.js"
echo "   📁 test/config.ts"

echo "🚀 Reiniciando servidor..."
./restart-server.sh
