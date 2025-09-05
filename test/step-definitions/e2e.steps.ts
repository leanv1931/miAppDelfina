import { Given, Then, When } from "@cucumber/cucumber";
import { HomePage } from "../pages/HomePage";
import { NotesPage } from "../pages/NotesPage";

Given("user is on home page", async function () {
    const homePage = new HomePage(this.page);
    await homePage.goto();
    await homePage.checkTitleHomePage();
});

When("user click on notes button", async function() { 
    await this.homePage.getNotesButton().click();
})

Then("user is redirected to notes page", async function () {
    const notesPage = new NotesPage(this.page);
    await notesPage.checkTitleNotesPage();
})

Then("user can add new notes", async function () {
    
    await this.notesPage.getNotesContainer().isVisible();
    await this.notesPage.addNote("IR AL PEDIATRA");
})
Then("user can go back to home page", async function () {
    await this.notesPage.getBackButton().click();
    await this.homePage.checkTitleHomePage();
})