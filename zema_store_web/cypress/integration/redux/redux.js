context("Redux", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should have a Redux store", () => {
    cy.window().its("store").should("exist");
  });

  it("should have a Redux store with the correct state", () => {
    cy.window().its("store").should("have.property", "getState");
    cy.window().its("store").invoke("getState").should("deep.equal", {
      counter: 0,
      todos: [],
    });
  });

  it("should have a Redux store with the correct state after a dispatch", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "INCREMENT",
    });
    cy.window().its("store").invoke("getState").should("deep.equal", {
      counter: 1,
      todos: [],
    });
  });

  it("should have a Redux store with the correct state after a dispatch", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "DECREMENT",
    });
    cy.window().its("store").invoke("getState").should("deep.equal", {
      counter: -1,
      todos: [],
    });
  });

  it("should have a Redux store with the correct state after a dispatch", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "ADD_TODO",
      text: "Learn Redux",
    });
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", {
        counter: 0,
        todos: [{ text: "Learn Redux", completed: false }],
      });
  });

  it("should have a Redux store with the correct state after a dispatch", () => {
    cy.window().its("store").invoke("dispatch", {
      type: "TOGGLE_TODO",
      index: 0,
    });
  });
});


