/// <reference types="cypress" />

context("Users Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/users");

    cy.request(
      "https://zema-store.herokuapp.com/api/users?sortBy=createdAt%3Aasc"
    ).then((response) => {
      cy.writeFile("cypress/fixtures/users.json", response.body);
    });
  });

  it("should get users", () => {
    cy.intercept("GET", "**/users/*", { fixture: "users.json" }).as("getUsers");

    // click users button
    cy.get(".users-btn").click();

    cy.wait("@getUsers")
      .its("response.body")
      .should("have.property", "name")
      .and("include", "Using fixtures to represent data");
  });
});
