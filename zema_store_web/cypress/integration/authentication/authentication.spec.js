/// <reference types="cypress" />

context("Sign In Actions", () => {
  const baseUrl = Cypress.config().baseUrl;
  const serverUrl = Cypress.env("serverUrl");

  before(() => {
    cy.viewport(1600, 1000);
    // cy.clearLocalStorage();
    cy.visit("http://localhost:3000/signin");
    cy.waitForReact();
  });

  beforeEach(() => {
    // cy.visit("http://localhost:3000/signin");
    cy.waitForReact();
  });

  it("should sign in", () => {
    // cy.getById("email")
    // .focus()
    // .clear()
    // .type("bekele.petros@gmail.com", { delay: 100 })
    // .should("have.value", "bekele.petros@gmail.com");

    // cy.getById("password")
    // .type("Pass@word1", { delay: 100 })
    // .should("have.value", "Pass@word1");
    // });//////////  ///////////////////////////////////////////////////////

    cy.getReactById("Field", "email")
      .type("bekele.petros@gmail.com", { delay: 100 })
      .should("have.value", "bekele.petros@gmail.com");

    cy.getReactById("Field", "password")
      .type("Pass@word1", { delay: 100 })
      .should("have.value", "Pass@word1");
    // });

    // "should store the token in local storage"
    cy.getById("login-form").submit();
    cy.wait(5000);
    cy.getLocalStorageItem("token").as("token");

    cy.get("@token").should("exist");

    // should go to dashbaord page"
    cy.url().should("eq", "http://localhost:3000/dashboard");
  });

  it("should sign out", () => {
    // "should remove the token from local storage"
    cy.getById("logout-button").click();
    cy.wait(2000);

    cy.url().should("eq", "http://localhost:3000/signin");
  });

  it("should error for an invalid password for existing user", () => {
    cy.getReactById("Field", "email")
      .type("bekele.petros@gmail.com", { delay: 100 })
      .should("have.value", "bekele.petros@gmail.com");

    cy.getReactById("Field", "password")
      .type("incorrect-password", { delay: 100 })
      .should("have.value", "incorrect-password");
    // });

    // "should submit"
    cy.getById("login-form").submit();
    cy.wait(5000);

    // "should display error message"
    cy.getById("error-message").should("exist");
  });


});
