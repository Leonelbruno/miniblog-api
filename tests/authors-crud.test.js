const request = require("supertest");
const app = require("../src/app");

describe("CRUD de authors", () => {
    let createdAuthorId;
    test("POST /authors debe crear un autor con datos válidos", async () => {
        const response = await request(app)
            .post("/authors")
            .send({
                name: "Autor Test",
                email: `autor.test.${Date.now()}@gmail.com`,
                bio: "Autor creado desde test automático"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Autor Test");
        expect(response.body.email).toContain("autor.test");

        createdAuthorId = response.body.id;
    });


    test("GET /authors/:id debe devolver el autor creado", async () => {
        const response = await request(app).get(`/authors/${createdAuthorId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", createdAuthorId);
        expect(response.body.name).toBe("Autor Test");
    });



    test("PUT /authors/:id debe actualizar el autor creado", async () => {
        const response = await request(app)
            .put(`/authors/${createdAuthorId}`)
            .send({
                name: "Autor Test Actualizado",
                email: `autor.actualizado.${Date.now()}@gmail.com`,
                bio: "Bio actualizada desde test"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", createdAuthorId);
        expect(response.body.name).toBe("Autor Test Actualizado");
        expect(response.body.bio).toBe("Bio actualizada desde test");
    });


    test("DELETE /authors/:id debe eliminar el autor creado", async () => {
        const response = await request(app).delete(`/authors/${createdAuthorId}`);

        expect(response.statusCode).toBe(204);
    });

    test("GET /authors/:id despues de borrar debe responder 404", async () => {
        const response = await request(app).get(`/authors/${createdAuthorId}`);
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });
});