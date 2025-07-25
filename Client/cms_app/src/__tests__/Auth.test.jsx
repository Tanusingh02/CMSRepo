// userRoutes.test.js
const request = require("supertest");
const app = require("../../../../Server/index");

describe("GET /user/latest-users", () => {
  it("should return 401 if no token is provided", async () => {
    const res = await request(app).get("/user/latest-users");
    expect(res.statusCode).toBe(401);
  });
});
