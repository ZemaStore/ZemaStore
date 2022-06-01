import { datatype, address, image } from "@withshepherd/faker";

context("Crud Albums", () => {
  const baseUrl = Cypress.config().baseUrl;
  let token;
  let store;
  let ourAlbum;

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
    let albumId = '62973bbe0932be75f329028c';

    // cy.request({
    //   method: "POST",
    //   url: `https://zema-store.herokuapp.com/api/albums`,
    //   headers: {
    //     "Access-Token": token,
    //   },
    //   body: {
    //     title: datatype.string(),
    //     artistId: '62932f4991d45adaf55d2201',
    //     releaseDate: new Date(),
    //   },
    // }).then((response) => {
    //   expect(response.status).to.eq(200)
    //   expect(response.body.data).to.have.property('album')
    //   expect(response.body.data).to.have.property('songs')
    //   albumId = response.body.data.album.id
    // })
    
    cy.request({
      method: "GET",
      url: `https://zema-store.herokuapp.com/api/albums`,
      headers: {
        "Access-Token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.albumList).to.have.length(10)
      expect(response).to.have.property('headers')
    })

    cy.request({
      method: "PATCH",
      url: `https://zema-store.herokuapp.com/api/albums/${albumId}`,
      headers: {
        "Access-Token": token,
      },
      body: {
        title: 'album updated',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data.album.title).to.eq('album updated')
      expect(response.body.data).to.have.property('album')
    })

    cy.request({
      method: "GET",
      url: `https://zema-store.herokuapp.com/api/albums/${albumId}`,
      headers: {
        "Access-Token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.data).to.have.property('album')
    })

    cy.request({
      method: "DELETE",
      url: `https://zema-store.herokuapp.com/api/albums/6297157b95f1ec87049b12dd`,
      headers: {
        "Access-Token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  });
});
