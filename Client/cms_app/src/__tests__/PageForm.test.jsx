const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../../index")

require("dotenv").config();

describe("GET /pages/getAll", () => {
    it("should return all pages", async () => {
        return request(app)
            .get("/pages/getAll")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});