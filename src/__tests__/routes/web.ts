import * as request from "supertest";
import { server as app } from "../../server";

describe("App Request", () => {
  test("should responds with 200", async (done) => {
    const result = await request(app).get("/");
    expect(result.status).toBe(200);
    done();
  });
});

afterAll(async () => {
  await app.close();
  await new Promise((resolve) => setTimeout(() => resolve(), 500)); // avoid jest open handle error
});
