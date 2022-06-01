import { datatype, address, image } from "@withshepherd/faker";

context("Crud Albums", () => {
  const baseUrl = Cypress.config().baseUrl;
  let token;

  before(() => {
     cy.viewport(1600, 1000);
     cy.visit("http://localhost:3000/signin");
     cy.login("bekele.petros@gmail.com", "Pass@word1");
     cy.visit("http://localhost:3000/albums").as("albumsPage");
     cy.waitFor("@albumsPage");
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

  it("should create album", () => {
    cy.api({
      method: "POST",
      url: `/albums`,
      headers: {
        "Access-Token": token,
      },
      body: {
        title: datatype.string(),
        artistId: datatype.uuid(),
        photo: image.image(),
        releaseDate: datatype.date(),
      },
    });

    cy.api({
      method: "GET",
      url: `/albums`,
      headers: {
        "Access-Token": token,
      },
    })
      .its("body")
      .should((albums) => {
        const ourAlbum = Cypress._.filter(
          albums,
          (album) => album.id === albumId
        );

        expect(ourAlbum.length).to.eq(1);
      });

    cy.wrap(ourAlbum.length).should("eq", 1);

    const albumId = ourAlbum[0].albumId;

    cy.log(albumId);

    cy.api({
      method: "PUT",
      url: `/album/${albumId}`,
      headers: {
        "Access-Token": token,
      },
      body: {
        title: datatype.string(),
      },
    });
    cy.api({
      method: "GET",
      url: `/albums/${albumId}`,
      headers: {
        "Access-Token": token,
      },
    });

    cy.api({
      method: "DELETE",
      url: `/albums/${albumId}`,
      headers: {
        "Access-Token": token,
      },
    });
  });
});
