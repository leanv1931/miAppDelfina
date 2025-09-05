import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// ESCENARIO ON : notes.feature

Given('que estoy en la página de notas', async function () {
  await this.notesPage.goto();
  await this.notesPage.verifyPageLoaded();
});

When('escribo {string} en el campo de nueva nota', async function (texto: string) {
  await this.notesPage.getNotesInput().fill(texto);
});

When('hago clic en el botón guardar', async function () {
  await this.notesPage.getSaveButton().click();
});

Then('debo ver la nota {string} en la lista de notas guardadas', async function (textoNota: string) {
  await this.notesPage.verifyNoteExists(textoNota);
});

// need implementation!! 

Given('que navego a la página de notas', async function () {
  // 👆 Ejemplo de step alternativo con diferente texto
  await this.notesPage.goto();
  await this.notesPage.verifyPageLoaded();
});

When('agrego una nota que dice {string}', async function (texto: string) {
  // 👆 Ejemplo de step alternativo que combina escribir y guardar
  await this.notesPage.addNote(texto);
});

Then('la nota aparece en la lista', async function () {
  // 👆 Ejemplo de validación más genérica
  await expect(this.notesPage.getNotesContainer()).toBeVisible();
});

Then('puedo ver el texto {string}', async function (texto: string) {
  await expect(this.page.locator('body')).toContainText(texto);
});
