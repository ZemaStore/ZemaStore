import reducer, {
  addSubscription,
  removeSubscription,
  subscriptionsSlice,
  subscriptionsSelector,
  updateSubscription,
} from "../../../src/app/store/features/subscriptions/subscriptionsSlice";

context("Subcription ", () => {
  let store;
  before(() => {
    cy.visit("http://localhost:3000/signin");
    cy.waitForReact();
    cy.login("bekele.petros@gmail.com", "Pass@word1");
    cy.visit("http://localhost:3000/subscriptions").as("subscriptionsPage");
    cy.waitFor("@subscriptionsPage");
    cy.waitForReact();
    cy.window()
      .then((win) => {
        store = win.store;
      })
      .its("store")
      .then((store) => {
        this.store = store;
      });
    cy.log("store redux ", store);
  });
  beforeEach(() => {
    // load subcription.json fixture file and store
    // in the test context object
    cy.fixture("subcriptions.json").as("subcriptions");
    cy.get("@subcriptions").then((subcriptions) => {
      store.its("subscriptions").then((subscriptions) => {
        cy.log("subscriptions ", subscriptions);
        console.log("subscriptions ", subscriptions);
      });
    });
  });

  it("should add a subscription", () => {
    const subscription = {
      id: "1",
      name: "test",
      email: "",
    };

    store.dispatch(addSubscription(subscription));
    cy.get("@subcriptions").then((subcriptions) => {
      expect(subcriptions.length).to.equal(1);
      expect(subcriptions[0]).to.deep.equal(subscription);
    });
  });

  // it("Updates a subcription author and title", () => {
  //   let state = store.getState().book;
  //   const unchangedBook = state.bookList.find((book) => book.id === "1");
  //   expect(unchangedBook?.title).toBe("1984");
  //   expect(unchangedBook?.author).toBe("George Orwell");

  //   store.dispatch(
  //     updateBook({ id: "1", title: "1985", author: "George Bush" })
  //   );
  //   state = store.getState().book;
  //   let changeBook = state.bookList.find((book) => book.id === "1");
  //   expect(changeBook?.title).toBe("1985");
  //   expect(changeBook?.author).toBe("George Bush");

  //   store.dispatch(
  //     updateBook({ id: "1", title: "1984", author: "George Orwell" })
  //   );
  //   state = store.getState().book;
  //   const backToUnchangedBook = state.bookList.find((book) => book.id === "1");

  //   expect(backToUnchangedBook).toEqual(unchangedBook);
  // });

  // it("Deletes a book from list with id", () => {
  //   let state = store.getState().book;
  //   const initialBookCount = state.bookList.length;

  //   store.dispatch(deleteBook({ id: "1" }));
  //   state = store.getState().book;

  //   expect(state.bookList.length).toBeLessThan(initialBookCount); // Checking if new length smaller than inital length, which is 3
  // });

  // it("Adds a new book", () => {
  //   let state = store.getState().book;
  //   const initialBookCount = state.bookList.length;

  //   store.dispatch(
  //     addNewBook({ id: "4", author: "Tester", title: "Testers manual" })
  //   );
  //   state = store.getState().book;
  //   const newlyAddedBook = state.bookList.find((book) => book.id === "4");
  //   expect(newlyAddedBook?.author).toBe("Tester");
  //   expect(newlyAddedBook?.title).toBe("Testers manual");
  //   expect(state.bookList.length).toBeGreaterThan(initialBookCount);
  // });
});
