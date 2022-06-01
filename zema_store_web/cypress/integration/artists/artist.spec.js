const serverUrl = Cypress.env("serverUrl");
import reducer , {
    addArtist,
    updateArtist,
    removeArtist,
  searchArtists,
} from "../../../src/app/store/features/artists/artistsSlice";

context("Artists ", () => {
    let store;
    before(()=> {
        cy.visit("http://localhost:3000/signin");
    cy.login("bekele.petros@gmail.com", "Pass@word1");
    cy.visit("http://localhost:3000/artists").as("artistsPage");
    cy.waitFor("@artistsPage");
    cy.waitForReact();
    cy.window()
      .then((win) => {
        store = win.store;
      })
      .its("store")
      .then((st) => {
        store = st;
      });
    });

    beforeEach(() => {
        // load subcription.json fixture file and store
      });

      it("should sign out", () => {
        // "should remove the token from local storage"
        cy.getById("artists-menu").click();
        cy.wait(2000);
    
        cy.url().should("eq", "http://localhost:3000/artists");
      });
})