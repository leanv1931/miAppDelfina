import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class NotesPage extends BasePage {
  async goto() {
    await this.page.goto('/notas');
  }

  async getTitle() {
    return await this.page.title();
  }

  getHeading() {
    return this.page.locator('h1');
  }

  getNotesInput() {
    return this.page.locator('#notaTexto');
  }

  getSaveButton() {
    return this.page.locator('button[type="submit"]');
  }

  getBackButton() {
    return this.page.locator('a[href="/"]');
  }

  getNotesContainer() {
    return this.page.locator('#notasGuardadas');
  }

  async addNote(noteText: string) {
    await this.getNotesInput().fill(noteText);
    await this.getSaveButton().click();
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle('Notas - Delfina');
    await expect(this.getHeading()).toHaveText('Notas de Delfina');
    await expect(this.getNotesInput()).toBeVisible();
    await expect(this.getSaveButton()).toBeVisible();
  }

  async verifyNoteExists(noteText: string) {
    await expect(this.getNotesContainer()).toContainText(noteText);
  }
}
