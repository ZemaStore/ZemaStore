// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", (email, password) => {
  cy.visit("http://localhost:3000/users");
  cy.waitForReact();

  cy.getReactById("Field", "email").type(email, { delay: 100 });
  cy.getReactById("Field", "password").type(password, { delay: 100 });
  cy.getById("login-form").submit();
  cy.wait(5000);
  cy.getLocalStorageItem("token").as("token");
  cy.get("@token").should("exist");
});

Cypress.Commands.add("logout", (email, password) => {
  // This is a child command
  cy.request("POST", "https://zema-store.herokuapp.com/api/logout", {
    user: {
      email,
      password,
    },
  }).then((res) => {
    localStorage.setItem("token", res.body.token);

    cy.visit("http://localhost:3000");
  });
});
Cypress.Commands.add("getLocalStorageItem", (token) => {
  return localStorage.getItem(token);
});

Cypress.Commands.add("getReactById", (component, name) => {
  return cy.react(component, { props: { "data-test-id": name } });
});

Cypress.Commands.add("getById", { prevSubject: false }, (id) => {
  return cy.get(`[data-test-id="${id}"]`);
});

Cypress.Commands.add("getByClass", { prevSubject: false }, (className) => {
  return cy.get(`[data-test-class="${className}"]`);
});

Cypress.Commands.add("getByText", { prevSubject: false }, (text) => {
  return cy.get(`[data-test-text="${text}"]`);
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => {});
