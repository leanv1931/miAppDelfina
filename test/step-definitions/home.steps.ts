import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('que estoy en la página principal', async function (this: CustomWorld) {
  console.log('🌐 Navegando a la página principal...');
  await this.initializePages();
  await this.homePage.goto();
  await this.page.waitForLoadState('networkidle');
  console.log('✅ Página principal cargada');
});

When('la página se carga completamente', async function (this: CustomWorld) {
  console.log('⏳ Esperando a que la página se cargue completamente...');
  await this.page.waitForLoadState('networkidle');
  await this.page.waitForTimeout(1000);
  console.log('✅ Página completamente cargada');
});

Then('debo ver el título {string}', async function (this: CustomWorld, expectedTitle: string) {
  console.log(`🔍 Verificando título de la página: "${expectedTitle}"`);
  const actualTitle = await this.homePage.getTitle();
  console.log(`📄 Título actual: "${actualTitle}"`);
  expect(actualTitle).toBe(expectedTitle);
  console.log('✅ Título verificado correctamente');
});

Then('debo ver el encabezado {string}', async function (this: CustomWorld, expectedHeading: string) {
  console.log(`🔍 Verificando encabezado: "${expectedHeading}"`);
  await this.homePage.getHeading().highlight();
  await expect(this.homePage.getHeading()).toHaveText(expectedHeading);
  console.log('✅ Encabezado verificado correctamente');
});

Then('debo ver la foto de Delfina', async function (this: CustomWorld) {
  console.log('🔍 Verificando que la foto de Delfina esté visible...');
  await this.homePage.getBabyImage().highlight();
  await expect(this.homePage.getBabyImage()).toBeVisible();
  console.log('✅ Foto de Delfina visible');
});

Then('debo ver el botón para navegar a notas', async function (this: CustomWorld) {
  console.log('🔍 Verificando botón de navegación a notas...');
  await this.homePage.getNotesButton().highlight();
  await expect(this.homePage.getNotesButton()).toBeVisible();
  console.log('✅ Botón de notas visible');
});
