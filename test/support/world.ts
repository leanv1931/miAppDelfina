import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NotesPage } from '../pages/NotesPage';
import './types'; // Importar las definiciones de tipos

export class CustomWorld extends World {
  page!: Page;
  homePage!: HomePage;
  notesPage!: NotesPage;

  async initializePages(): Promise<void> {
    this.homePage = new HomePage(this.page);
    this.notesPage = new NotesPage(this.page);
  }
}

setWorldConstructor(CustomWorld);
