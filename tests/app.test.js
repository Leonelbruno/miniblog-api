const request = require("supertest");
const app = require("../src/app");

describe("GET /health", ()=>{
    test("debe responder status 200 y status ok", async ()=>{
        const response = await request(app).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("status", "ok");
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("uptime");
    })
})