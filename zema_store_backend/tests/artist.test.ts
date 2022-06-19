import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";

import configs from "../src/configs/app.configs";
import app from "../src/app";
import { connect, setUpDatabase, artistOneId } from "./fixtures/db";

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

describe("POST /api/artists", () => {
  it("Should create artist", async () => {
    const res = await agent
      .post("/api/artists")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        email: "john@zema.com",
        password: "Test1234-!",
        phone: "0912354678",
        firstName: "Yohannes",
        lastName: "Girma",
      });

    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /api/artists", () => {
  it("Should get list of artists", async () => {
    const res = await agent
      .get("/api/artists")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.artists.length).toBe(3);
    expect(JSON.parse(res.text).data).toBeDefined();
    expect(JSON.parse(res.text).data.artists).toBeDefined();
    expect(JSON.parse(res.text).data.totalPages).toBeDefined();
    expect(JSON.parse(res.text).data.totalItems).toBeDefined();
    expect(JSON.parse(res.text).data.pageNumber).toBeDefined();
  });
});

describe("GET /api/artists/artistId", () => {
  it("Should get artist by id", async () => {
    const res = await agent
      .get(`/api/artists/${artistOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data.email).toBe("dave@zema.com");
    expect(JSON.parse(res.text).data).toBeDefined();
    expect(JSON.parse(res.text).data.phone).toBeDefined();
    expect(JSON.parse(res.text).data.profileId).toBeDefined();
    expect(JSON.parse(res.text).data.email).toBeDefined();
  });
});

describe("PATCH /api/artists/artistId", () => {
  it("Should update user data", async () => {
    const res = await agent
      .patch(`/api/artists/${artistOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        firstName: "Updated name",
      });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data.profileId["firstName"]).toBe(
      "Updated name"
    );
  });
});

describe("DELETE /api/artists/aritstId", () => {
  it("Should delete artist from database", async () => {
    const res = await agent
      .delete(`/api/artists/${artistOneId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    expect(res.statusCode).toEqual(200);
  });
});

