/// <reference types="cypress" />

context("Sign In Actions", () => {
  const baseUrl = Cypress.config().baseUrl;

  beforeAll(() => {
    cy.viewport(550, 750);
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit("http://localhost:3000/signin");
  });

  it("should sign in", () => {
    cy.get("#email")
      .focus()
      .clear()
      .type("fake@email.com", { delay: 100 })
      .should("have.value", "fake@email.com");

    cy.get(".action-password")
      .type("fakepassword", { delay: 100 })
      .type("{shift}")
      .should("have.value", "fakepassword");

    // .type() with key modifiers
    // .type("{alt}{option}") //these are equivalent
    // .type("{ctrl}{control}") //these are equivalent
    // .type("{meta}{command}{cmd}") //these are equivalent
  });

  it(".submit() - submit a form", () => {
    cy.get(".action-form")
      .submit()
      .next()
      .should("contain", "Your form has been submitted!");
  });

  it("should store the token in local storage", () => {
    cy.get(".action-form")
      .submit()
      .next()
      .should("contain", "Your form has been submitted!");

    cy.getLocalStorageItem("token").as("token");

    cy.get("@token").should("exist");
  });

  it("should go to dashbaord page", () => {
    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("should sign out", () => {
    
    cy.get(".action-signout").click();

    cy.url().should("eq", "http://localhost:3000/signin");
  });
});
