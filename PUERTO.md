# 🔧 Configuración de Puerto

## 📍 Cambiar Puerto del Servidor

Para cambiar el puerto en todo el proyecto, **solo edita UN archivo**:

### **🎯 Archivo principal**: `config.js`

```javascript
const CONFIG = {
  SERVER: {
    PORT: 3003,  // 👈 CAMBIA SOLO ESTE NÚMERO
    HOST: 'localhost'
  }
};
```

### **🎯 Archivo de testing**: `test/config.ts` 

```typescript
export const CONFIG = {
  SERVER: {
    PORT: 3003,  // 👈 CAMBIA SOLO ESTE NÚMERO
    HOST: 'localhost'
  }
};
```

## 🚀 Comandos Rápidos

### **Reiniciar servidor automáticamente**:
```bash
./restart-server.sh
```
Este script:
- 💀 Mata procesos en el puerto configurado
- 🚀 Inicia el servidor en el puerto nuevo
- 📊 Muestra todas las URLs disponibles

### **Comandos manuales**:
```bash
# Matar procesos en puerto específico
lsof -ti:3003 | xargs kill -9

# Iniciar servidor
npm start

# Ejecutar tests
cd test && npm run test:notes
cd test && npm run test:api
```

## 📁 Archivos que usan la configuración

- ✅ `src/server.js` - Servidor principal
- ✅ `test/support/hooks.ts` - Configuración de Cucumber
- ✅ `test/playwright.config.ts` - Configuración de API tests
- ✅ `test/api/notes.api.test.ts` - Tests de API

## 🎯 Ventajas

1. **Un solo lugar** para cambiar puerto
2. **Sin hardcoding** en múltiples archivos  
3. **Fácil mantenimiento** de configuración
4. **Scripts automáticos** para reiniciar
5. **Consistencia** entre servidor y tests
