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

describe("POST /api/songs", () => {
  it("Should create song", async () => {
    const res = await agent
      .post("/api/songs")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        albumId: albumOneId,
        artistId: artistOneId,
        title: "Efeligihalew",
        genre: "reggae",
        length: "446",
        releaseDate: "2022-07-21",
      });

    expect(res.statusCode).toEqual(400);
  });
});

describe("GET /api/songs", () => {
  it("Should get list of songs", async () => {
    const res = await agent
      .get("/api/songs")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    console.log(JSON.parse(res.text));
    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data).toBeDefined();
    expect(JSON.parse(res.text).data.songs.length).toBe(0);
    expect(JSON.parse(res.text).data.totalPages).toBe(0);
    expect(JSON.parse(res.text).data.totalItems).toBe(0);
    expect(JSON.parse(res.text).data.pageNumber).toBe(0);
  });
});
