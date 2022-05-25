/// <reference types="cypress" />

context("Should Sign In Actions", () => {
  const baseUrl = Cypress.config().baseUrl;

  before(() => {
    cy.viewport(1600, 1000);
    cy.clearLocalStorage();
    cy.login("bekele.petros@gmail.com", "Pass@word1").as("login");
    cy.waitFor("@login");
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/users");
    cy.waitForReact();
  });

  it("should list users list", () => {});
});
