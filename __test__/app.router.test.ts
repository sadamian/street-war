import request from "supertest";
import app from "../src/app";

describe("Test dumb api call", () => {
  test("Get a 200", async () => {
    const response = await request(app).get("/test");
    expect(response.status).toBe(200);
  });
});
