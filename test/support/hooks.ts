import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext } from '@playwright/test';

// Set default timeout
setDefaultTimeout(60000);

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ 
    headless: false,
    slowMo: 1000 // Pausa 1 segundo entre acciones
  });
});

Before(async function () {
  context = await browser.newContext({
    baseURL: 'http://localhost:3001',
    viewport: { width: 1280, height: 720 }
  });
  this.page = await context.newPage();
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
