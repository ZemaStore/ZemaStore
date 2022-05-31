const serverUrl = Cypress.env("serverUrl");
import reducer, {
  addAllEvent,
  addEvent,
  removeEvent,
  eventsSelector,
  eventsSlice,
  updateEvent,
} from "../../../src/app/store/features/events/eventsSlice";
// import { store } from "../../../src/app/store";

context("Events ", () => {
  let store;
  before(() => {
    cy.visit("http://localhost:3000/signin");
    cy.login("bekele.petros@gmail.com", "Pass@word1");
    cy.visit("http://localhost:3000/events").as("eventsPage");
    cy.waitFor("@eventsPage");
    cy.waitForReact();
    cy.window()
      .then((win) => {
        store = win.store;
      })
      .its("store")
      .then((st) => {
        store = st;
      });
  });
  beforeEach(() => {
    // load subcription.json fixture file and store
  });

  it("should populate initial data", () => {
    cy.wait(1000);
    cy.fixture("events.json").then((data) => {
      store.dispatch(
        addAllEvent({
          events: data.events,
          searchEvents: data.events,
          loading: false,
          error: null,
          meta: {
            total: data.total,
            totalPage: data.pageCount,
            currentPage: data.page,
            limit: data.pageSize,
          },
        })
      );
    });
    cy.wait(5000);
    cy.getByTestId("event-item").should("exist").should("have.length", 7);
  });

  it("should add a event", () => {
    const event = {
      id: "8",
      title: "Event 8",
      summary: "Event 8 summary",
      cover:
        "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
      venue: {
        lat: "37.7749295",
        lng: "-122.4194155",
        country: "United States",
        city: "San Francisco",
        street: "1 Market St",
        zip: "94105",
      },
    };

    store.dispatch(addEvent(event));

    cy.wait(1000);

    const getEvents = (win) => {
      return win.store.getState().events.events;
    };

    cy.window().then(getEvents).as("events");
    cy.get("@events").then((events) => {
      expect(events.length).to.equal(8);
      expect(events[0]).to.deep.equal(event);
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
