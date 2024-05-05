const { test, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const reverse = require("../utils/for_testing");

describe("test all user routes", () => {
  test("test to get user profile", async () => {
    const res = await api
      .get("/api/user/profile")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.message, "User profile");
  });

  test("test to register user", async () => {
    const res = await api
      .post("/api/user/register")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.message, "Register User");
  });
});
describe("Test artwork routes", () => {
  test("test to get all artworks", async () => {
    const res = await api
      .get("/api/artworks")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(res.body.artworks.length, 3);
  });
});
