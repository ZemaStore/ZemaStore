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
    let title;
    let summary;
    let start_date;
    let end_date;
    let event = {
      id: "8",
      title: "test",
      summary: "test",
      start_date: "2020-05-05",
      end_date: "2020-05-05",
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
    cy.getByTestId("add-event-btn").click();
    cy.wait(1000);
    cy.getByTestId("add_event_modal").should("exist");

    cy.getByTestId("title").as("title");

    cy.get("@title")
      .type("Test Event")
      .invoke("val")
      .should((value) => {
        console.log(value, "value");
        title = value;
        expect(value).to.equal("Test Event");
      });

    cy.getByTestId("summary").as("summary");
    cy.get("@summary")
      .type("Test Event Description")
      .invoke("val")
      .should((value) => {
        summary = value;
        expect(value).to.equal("Test Event Description");
      });

    cy.getByTestId("start_date").as("start_date");
    cy.get("@start_date")
      .type("2020-01-01")
      .invoke("val")
      .should((value) => {
        start_date = value;
        expect(value).to.equal("2020-01-01");
      });

    cy.getByTestId("end_date").as("end_date");
    cy.get("@end_date")
      .type("2020-01-01")
      .invoke("val")
      .should((value) => {
        end_date = value;
        expect(value).to.equal("2020-01-01");
      });

    cy.getByTestId("add_event_button").click();

    cy.wait(1000);

    store.dispatch(addEvent(event));
    cy.log(store.getState().events, event);
    cy.wait(1000);

    const getEvents = (win) => {
      return win.store.getState().events.events;
    };

    cy.window().then(getEvents).as("events");

    cy.getByTestId("cancel_event_button").click();
    cy.wait(1000);

    cy.getByTestId("event-item").as("events");

    cy.get("@events").then((events) => {
      expect(events.length).to.equal(2);
    });
  });

  it.only("Updates a Events", () => {
    let title;
    let summary;
    let state = store.getState().events;
    const unchangedEvent = state.events.find((event) => event.id === "1");
    cy.getByTestId("event-item").as("events");

    cy.getByTestId("more-button-0").should("exist").click();
    cy.waitForReact()
    cy.getByTestId("edit_button").should("visible").click();

    let event = {
      title: "test",
      summary: "test",
      start_date: "2020-05-05",
      end_date: "2020-05-05",
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
    cy.wait(1000);
    cy.getByTestId("add_event_modal").should("exist");

    cy.getByTestId("title").as("title");

    cy.get("@title")
      .clear()
      .type("Updated Test Event")
      .invoke("val")
      .should((value) => {
        title = value;
        expect(value).to.equal("Updated Test Event");
      });

    cy.getByTestId("summary").as("summary");
    cy.get("@summary")
      .clear()
      .type("Updated Test Event Description")
      .invoke("val")
      .should((value) => {
        summary = value;
        expect(value).to.equal("Updated Test Event Description");
      });

    cy.intercept(
      {
        method: "PUT",
        url: "**/events/*",
      },
      {
        statusCode: 404,
        body: { error: "error" },
        headers: { "access-control-allow-origin": "*" },
        delayMs: 500,
      }
    ).as("putEvent");

    
    cy.waitFor("@putEvent");
    cy.getByTestId("add_event_button").click();

    cy.wait(1000);

    // Stub a response to PUT events/ ****
    store.dispatch(
      updateEvent({ ...event, title, summary })
    );
    cy.wait(1000);
    state = store.getState().events;
    // let changedEvent = state.events.find((event) => event.id === "8");
    // expect(changedEvent?.title).eq("Updated Test Event");
    // expect(changedEvent?.summary).eq("Updated Test Event Description");
  });

  it("Deletes a event from list with id", () => {
    let state = store.getState().events;
    const initialEventCount = state.events.length;

    store.dispatch(deletEvent({ id: "8" }));
    state = store.getState().events;

    expect(state.events.length).toBeLessThan(initialEventCount); // Checking if new length smaller than inital length, which is 3
  });
});
