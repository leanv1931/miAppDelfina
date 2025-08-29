import { Given, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('que estoy en la página de notas', async function (this: CustomWorld) {
  console.log('🌐 Navegando a la página de notas...');
  await this.initializePages();
  await this.notesPage.goto();
  await this.page.waitForLoadState('networkidle');
  console.log('✅ Página de notas cargada');
  
  console.log('🔍 Verificando que la página de notas esté correctamente cargada...');
  await this.notesPage.verifyPageLoaded();
  console.log('✅ Página de notas verificada');
});

When('escribo {string} en el campo de nueva nota', async function (this: CustomWorld, noteText: string) {
  console.log(`✍️ Escribiendo nota: "${noteText}"`);
  await this.notesPage.getNotesInput().highlight();
  await this.notesPage.getNotesInput().clear();
  await this.notesPage.getNotesInput().type(noteText, { delay: 100 });
  console.log('✅ Nota escrita en el campo');
});

When('hago clic en el botón guardar', async function (this: CustomWorld) {
  console.log('🖱️ Haciendo clic en el botón Guardar...');
  await this.notesPage.getSaveButton().highlight();
  await this.notesPage.getSaveButton().click();
  
  console.log('⏳ Esperando a que se procese el guardado...');
  await this.page.waitForTimeout(1500);
  console.log('✅ Botón guardar clickeado');
});

Then('debo ver la nota {string} en la lista de notas guardadas', async function (this: CustomWorld, noteText: string) {
  console.log(`🔍 Verificando que la nota "${noteText}" aparezca en la lista...`);
  await this.notesPage.getNotesContainer().highlight();
  await this.notesPage.verifyNoteExists(noteText);
  console.log('✅ Nota encontrada en la lista');
});
