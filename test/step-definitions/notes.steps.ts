import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// 🎯 STEPS BÁSICOS DISPONIBLES
// Usa estos como referencia para crear tu propio test

Given('que estoy en la página de notas', async function () {
  await this.notesPage.goto();
  await this.notesPage.verifyPageLoaded();
});

Given('que navego a la página de notas', async function () {
  // 👆 Ejemplo de step alternativo con diferente texto
  await this.notesPage.goto();
  await this.notesPage.verifyPageLoaded();
});

When('escribo {string} en el campo de nueva nota', async function (texto: string) {
  await this.notesPage.getNotesInput().fill(texto);
});

When('agrego una nota que dice {string}', async function (texto: string) {
  // 👆 Ejemplo de step alternativo que combina escribir y guardar
  await this.notesPage.addNote(texto);
});

When('hago clic en el botón guardar', async function () {
  await this.notesPage.getSaveButton().click();
});

Then('debo ver la nota {string} en la lista de notas guardadas', async function (textoNota: string) {
  await this.notesPage.verifyNoteExists(textoNota);
});

Then('la nota aparece en la lista', async function () {
  // 👆 Ejemplo de validación más genérica
  await expect(this.notesPage.getNotesContainer()).toBeVisible();
});

Then('puedo ver el texto {string}', async function (texto: string) {
  await expect(this.page.locator('body')).toContainText(texto);
});

// 🎓 TIPS PARA TU IMPLEMENTACIÓN:
// 1. Puedes crear steps con diferente redacción
// 2. Puedes combinar acciones en un solo step
// 3. Puedes agregar más validaciones
// 4. Experimenta con diferentes formas de escribir los steps
