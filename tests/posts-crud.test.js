const request = require("supertest");
const app = require("../src/app");

describe("CRUD de posts", () => {
    let createdAuthorId;
    let createdPostId;
    beforeAll(async () => {
        const response = await request(app)
            .post("/authors")
            .send({
                name: "Autor para Posts Test",
                email: `autor.posts.${Date.now()}@gmail.com`,
                bio: "Autor temporal para testear posts"
            });
        createdAuthorId = response.body.id;
    });


    afterAll(async () => {
        if (createdPostId) {
            await request(app).delete(`/posts/${createdPostId}`);
        }

        if (createdAuthorId) {
            await request(app).delete(`/authors/${createdAuthorId}`);
        }
    });

    test("POST /posts debe crear un post con datos validos", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                author_id: createdAuthorId,
                title: "Post de prueba",
                content: "Contenido creado desde test automatico",
                published: true
            });


        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.author_id).toBe(createdAuthorId);
        expect(response.body.title).toBe("Post de prueba");
        expect(response.body.published).toBe(true);

        createdPostId = response.body.id;
    });


    test("GET /posts/:id debe devolver el post creado", async () => {
        const response = await request(app).get(`/posts/${createdPostId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", createdPostId);
        expect(response.body.title).toBe("Post de prueba");
    });
    test("GET /posts/author/:authorId debe devolver posts del autor", async () => {
        const response = await request(app).get(`/posts/author/${createdAuthorId}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const postEncontrado = response.body.find(post => post.id === createdPostId);
        expect(postEncontrado).toBeDefined();
    });


    test("PUT /posts/:id debe actualizar el post creado", async () => {
        const response = await request(app)
            .put(`/posts/${createdPostId}`)
            .send({
                author_id: createdAuthorId,
                title: "Post actualizado desde test",
                content: "Contenido actualizado desde test automático",
                published: false
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("id", createdPostId);
        expect(response.body.title).toBe("Post actualizado desde test");
        expect(response.body.published).toBe(false);
    });


    
    test("DELETE /posts/:id debe eliminar el post creado", async () => {
        const response = await request(app).delete(`/posts/${createdPostId}`);

        expect(response.statusCode).toBe(204);
    });

    test("GET /posts/:id despues de borrar debe responder 404", async () => {
        const response = await request(app).get(`/posts/${createdPostId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty("error");
    });

    test("POST /posts debe rechazar author_id inexistente", async () => {
        const response = await request(app)
            .post("/posts")
            .send({
                author_id: 999999,
                title: "Post invalido",
                content: "Este post no deberia crearse",
                published: true
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("error");
    });
});