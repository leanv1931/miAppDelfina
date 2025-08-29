import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { NotesPage } from '../pages/NotesPage';

declare module '@cucumber/cucumber' {
  interface World {
    page: Page;
    homePage: HomePage;
    notesPage: NotesPage;
    initializePages(): Promise<void>;
  }
}

export { };

