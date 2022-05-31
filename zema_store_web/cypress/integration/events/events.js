const serverUrl = Cypress.env("serverUrl");

describe("event app - e2e", () => {
  beforeEach(() => {
    // network call
    cy.intercept("GET", `${serverUrl}/events`).as("getAllEvents");

    cy.visit("/");
    cy.wait("@getAllEvents");
    cy.get("h1").contains("Event List");
  });

  it("should display the event list", () => {
    cy.get("li").its("length").should("eq", 2);
    cy.get("li").eq(0).contains("walk");
  });

  it("should toggle a event correctly", () => {
    cy.get("li")
      .eq(0)
      .contains("walk")
      .should("have.css", "text-decoration", "none solid rgb(74, 74, 74)");
    cy.get("li").eq(0).contains("walk").click();
    cy.get("li")
      .eq(0)
      .contains("walk")
      .should(
        "have.css",
        "text-decoration",
        "line-through solid rgb(74, 74, 74)"
      );
  });
});
