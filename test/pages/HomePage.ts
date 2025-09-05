import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  async checkTitleHomePage() {
    const title = await this.getTitle();
    await expect(title).toContain("Delfina");
    console.log("Titulo de la pagina HomePage verificado");
  }
  async gotoWeb() {
    await this.page.goto('http://localhost:3004');
  }

   async goto() {
    await this.page.goto('/');
  }

  async getTitle() {
    return await this.page.title();
  }

  getHeading() {
    return this.page.locator('h1');
  }

  getBabyImage() {
    return this.page.locator('img');
  }

  getNotesButton() {
    return this.page.locator('a[href="/notas"]');
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle('Delfina');
    await expect(this.getHeading()).toHaveText('Bienvenida Delfina');
    await expect(this.getBabyImage()).toBeVisible();
  }
}
