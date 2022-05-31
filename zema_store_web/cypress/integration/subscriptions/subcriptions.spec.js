context("Subcription ", () => {
  beforeEach(() => {
    // load subcription.json fixture file and store
    // in the test context object
    cy.fixture("subcriptions.json").as("subcriptions");
  });
});
