import request from "supertest";

import app from "../src/app";
// import "./fixtures/db";
import { connect, setUpDatabase } from "./fixtures/db";

const agent = request.agent(app);

beforeAll(connect);
beforeEach(setUpDatabase);

jest.setTimeout(200000);

describe("POST /api/auth/admin-sign-in", () => {
  it("signs in admin", async () => {
    const res = await agent.post("/api/auth/admin-sign-in").send({
      email: "admin@test.com",
      password: "Test1234-!",
    });

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text).data.accessToken).toBeDefined();
    expect(JSON.parse(res.text).data.refreshToken).toBeDefined();
    expect(JSON.parse(res.text).data.user).toBeDefined();
    expect(JSON.parse(res.text).data.user.email).toBeDefined();
    expect(JSON.parse(res.text).data.user.phone).toBeDefined();
    expect(JSON.parse(res.text).data.user.profileId).toBeDefined();
  });

  it("Shouldn't allow signin with wrong email", async () => {
    const res = await agent.post("/api/auth/admin-sign-in").send({
      email: "wrong@email.com",
      password: "Test1234-!",
    });

    expect(res.statusCode).toEqual(400);
  });

  it("Shouldn't allow signin with wrong password", async () => {
    const res = await agent.post("/api/auth/admin-sign-in").send({
      email: "admin@test.com",
      password: "WrongPassw0rd!",
    });

    expect(res.statusCode).toEqual(400);
  });
});
