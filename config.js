/**
 * 🔧 Configuración centralizada del proyecto (CommonJS)
 * 
 * Cambia el puerto aquí y se aplicará en todos los archivos:
 * - Server
 * - Tests de Cucumber  
 * - Tests de API
 * - Configuraciones de Playwright
 */

const CONFIG = {
  // 🌐 Configuración del servidor
  SERVER: {
    PORT: 3003,  // 👈 CAMBIA SOLO ESTE NÚMERO
    HOST: 'localhost'
  },
  
  // 🧪 Configuración de testing
  TESTING: {
    TIMEOUT: 60000,
    SLOW_MO: 1000,
    VIEWPORT: {
      width: 1280,
      height: 720
    }
  }
};

// URLs generadas automáticamente
const URLS = {
  BASE: `http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}`,
  NOTES: `http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}/notas`,
  API_NOTES: `http://${CONFIG.SERVER.HOST}:${CONFIG.SERVER.PORT}/api/notes`
};

console.log(`📡 Configuración cargada: Puerto ${CONFIG.SERVER.PORT}`);

module.exports = { CONFIG, URLS };
