const serverUrl = Cypress.env("serverUrl");
import reducer , {
    getArtistsApi,
    // get÷
    addArtist,
    updateArtist,
    removeArtist,
  searchArtists,
} from "../../../src/app/store/features/artists/artistsSlice";

context("Artists ", () => {
    let store;
    before(()=> {
        cy.visit("http://localhost:3000/signin");
    cy.login("bekele.petros@gmail.com", "Pass@word1");
    cy.visit("http://localhost:3000/artists").as("artistsPage");
    cy.waitFor("@artistsPage");
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
        cy.waitFor("@artistsPage");
    cy.waitForReact();
      });

      it("should get Artits table", () => {
          cy.wait(1000);
          cy.getByTestId('artist_element').should('have.length', store.getState().artists.artists.length);
          cy.getByTestId('artist_element').contains('Minasie Alemu Sinishaw')
          cy.getByTestId('hamburgur').first().click()
          cy.getByTestId('artist_edit').click()

      });

      it("should add a Artist", () => {
        let artist = {
          artistname: "",
          email: "",
          phone: "",
          password: "",
        };
        cy.wait(1000)
        cy.getByTestId("add_artist_button").click();
        cy.wait(1000);
        cy.getByTestId("artists_page_add_edit_form").should("exist");

    
        cy.getByTestId("fullName").as("name");
    
        cy.get("@name")
          .type("Cypress Artist")
          .invoke("val")
          .should((value) => {
            console.log(value, "value");
            artist.artistname = value;
    
            expect(value).to.equal("Cypress Artist");
          });
    
        cy.getByTestId("artist_email").as("email");
        cy.get("@email")
        .type("artistemail9@gmail.com")
          .invoke("val")
          .should((value) => {
            artist.email = value;
            expect(value).to.equal("artistemail9@gmail.com");
          });
    
        cy.getByTestId("artist_phone").as("phone");
        cy.get("@phone")
          .type("0987654327")
          .invoke("val")
          .should((value) => {
            artist.phone = value;
            expect(value).to.equal("0987654327");
          });
    
        cy.getByTestId("artist_password").as("password");
        cy.get("@password")
          .type("PassWord@43")
          .invoke("val")
    
          .should((value) => {
            artist.password = value;
            expect(value).to.equal("PassWord@43");
          });
    
        cy.getByTestId("add_event_button").click();
    
        cy.wait(5000);
  
        
        cy.getByTestId('artist_element').contains('0987654327')
        cy.getByTestId('artist_element').should('have.length', store.getState().artists.artists.length);
        
      });

      it("should get Artits table", () => {
        cy.wait(1000);
        cy.getByTestId('hamburgur').first().click()
        cy.wait(1000)
        cy.getByTestId('artist_edit').click()
        cy.wait(1000)
        
        

        let artist = {
          artistname: "",
          email: "",
          phone: "",
          password: "",
        };
        cy.getByTestId("fullName").as("name");
        cy.get("@name")
        .clear()
          .type("Cypress Artist")
          .invoke("val")
          .should((value) => {
            console.log(value, "value");
            artist.artistname = value;
    
            expect(value).to.equal("Test Artist");
          });
    
        cy.getByTestId("artist_email").as("email");
        cy.get("@email")
        .clear()
        .type("artistemail3@gmail.com")
          .invoke("val")
          .should((value) => {
            artist.email = value;
            expect(value).to.equal("artistemail@gmail.com");
          });
    
        cy.getByTestId("artist_phone").as("phone");
        cy.get("@phone")
        .clear()
          .type("0987654329")
          .invoke("val")
          .should((value) => {
            artist.phone = value;
            expect(value).to.equal("0987654321");
          });
    
        cy.getByTestId("artist_password").as("password");
        cy.get("@password")
        .clear()
          .type("PassWord@43")
          .invoke("val")
    
          .should((value) => {
            artist.password = value;
            expect(value).to.equal("PassWord@43");
          });
    
        cy.getByTestId("add_event_button").click();
    
        cy.wait(5000);

    });

    it.only("should Delete Artits table", () => {
      cy.wait(1000);
      cy.getByTestId('hamburgur').first().click()
      cy.getByTestId('artist_delete').click()
      cy.getByTestId('confrim_delete').click()
      cy.url().should("eq", "http://localhost:3000/artists");
  });
})

