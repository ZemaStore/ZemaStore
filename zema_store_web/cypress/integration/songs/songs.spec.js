import { datatype, address, image } from "@withshepherd/faker";
import reducer, {
    addSong,
    searchSongs, removeSong, handlePaginate, updateSong
} from "../../../src/app/store/features/songs/songsSlice"

context("Songs", () => {
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

  beforeEach(()=>{
      // load 
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

  
})