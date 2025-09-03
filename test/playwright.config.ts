import { defineConfig } from '@playwright/test';

/**
 * 🎭 Configuración de Playwright para API Testing
 * 
 * Esta configuración está optimizada para tests de API:
 * - Sin browser (más rápido)
 * - Timeouts apropiados para APIs
 * - Reportes detallados
 */

export default defineConfig({
  // 📂 Carpeta de tests de API
  testDir: './api',
  
  // ⚡ Configuración de ejecución
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  // 📊 Reportes
  reporter: [
    ['html', { outputFolder: 'test-results/api-report' }],
    ['json', { outputFile: 'test-results/api-results.json' }],
    ['list']
  ],
  
  // ⚙️ Configuración global de tests
  use: {
    // 🌐 Base URL para APIs
    baseURL: 'http://localhost:3002',
    
    // ⏱️ Timeouts para APIs (más cortos que UI)
    actionTimeout: 10000,
    
    // 📝 Capturar requests/responses para debugging
    trace: 'retain-on-failure',
  },
  
  // 🚀 Proyectos de testing (solo API, sin browser)
  projects: [
    {
      name: 'api-tests',
      use: {
        // Sin browser - solo HTTP requests
      },
    },
  ],
});

/**
 * 📚 COMANDOS DISPONIBLES:
 * 
 * npm run test:api           - Ejecutar todos los tests de API
 * npm run test:api:headed    - Ejecutar con debug visible
 * npm run test:api:report    - Ver reporte HTML de resultados
 */
