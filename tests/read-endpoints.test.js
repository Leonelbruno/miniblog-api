const request = require("supertest");
const app = require("../src/app");

describe("Read endpoints", () => {
    test("GET /authors debe responder 200 y devolver un array", async () => {
        const response = await request(app).get("/authors");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    
    test("GET /posts debe responder 200 y devolver un array", async () => {
        const response = await request(app).get("/posts");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /authors/hola debe responder 400", async () => {
        const response = await request(app).get("/authors/hola");
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
    test("GET /posts/hola debe responder 400", async () => {
        const response = await request(app).get("/posts/hola");
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});