/// <reference types="cypress" />

context("Should Sign In Actions", () => {
  const baseUrl = Cypress.config().baseUrl;

  before(() => {
    cy.viewport(1600, 1000);
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/users");
    cy.waitForReact();
  });

  it("should list all users list", () => {
    cy.get("[data-cy=user-list]").should("exist");
  });
});
