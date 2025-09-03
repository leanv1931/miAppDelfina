import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium } from '@playwright/test';

// Importar configuración desde archivo JavaScript
const { CONFIG, URLS } = require('../../config.js');

// Set default timeout from config
setDefaultTimeout(CONFIG.TESTING.TIMEOUT);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: CONFIG.TESTING.SLOW_MO // Pausa configurada
  });
});

Before(async function () {
  context = await browser.newContext({
    baseURL: URLS.BASE, // 👈 URL dinámica desde config
    viewport: CONFIG.TESTING.VIEWPORT
  });
  this.page = await context.newPage();
  
  // Inicializar las páginas
  await this.initializePages();
});

After(async function () {
  // Pausa antes de cerrar para ver el resultado
  await this.page.waitForTimeout(2000);
  await this.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
