import request from "supertest";
import jwt from "jsonwebtoken";

import configs from "../src/configs/app.configs";
import app from "../src/app";
import { connect, setUpDatabase, artistOneId, albumOneId } from "./fixtures/db";

const agent = request.agent(app);

let accessToken = jwt.sign(
  { _id: "62af066a09d4b5498f316d95" },
  configs.JWT_ACCESS_TOKEN,
  {
    algorithm: "HS256",
    expiresIn: "6hr",
  }
);

beforeAll(connect);
beforeEach(setUpDatabase);

jest.setTimeout(20000);

describe("POST /api/albums", () => {
  it("Should create album", async () => {
    const res = await agent
      .post("/api/albums")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        artistId: artistOneId.toString(),
        title: "Eregnaye",
        releaseDate: "2022-07-21",
      });

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /api/albums", () => {
  it("Shoud get list of albums", async () => {
    const res = await agent
      .get("/api/albums")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.albumList.length).toBe(2);
    expect(JSON.parse(res.text).data.totalItems).toBe(2);
    expect(JSON.parse(res.text).data.albumList).toBeDefined();
    expect(JSON.parse(res.text).data.totalPages).toBeDefined();
    expect(JSON.parse(res.text).data.totalItems).toBeDefined();
    expect(JSON.parse(res.text).data.pageNumber).toBeDefined();
  });
});

describe("GET /api/albums/albumId", () => {
  it("Should get album by id", async () => {
    const res = await agent
      .get(`/api/albums/${albumOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data).toBeDefined();
    expect(JSON.parse(res.text).data.album).toBeDefined();
    expect(JSON.parse(res.text).data.album.title).toBe("Yehiwot minch");
  });
});

describe("PATCH /api/albums/albumId", () => {
  it("Should update album data", async () => {
    const res = await agent
      .patch(`/api/albums/${albumOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Updated title",
      });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data.album.title).toBe("Updated title");
  });
});

describe("DELETE /api/albums/albumId", () => {
  it("Should delete album from database", async () => {
    const res = await agent
      .delete(`/api/albums${albumOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(404);
  });
});
