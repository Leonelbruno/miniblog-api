const { validatePostInput } = require("../src/validators/posts.validators");

describe("validatePostInput", () => {
    test("acepta datos validos", () => {
        const result = validatePostInput({
            author_id: 1,
            title: " Titulo de prueba ",
            content: " Contenido del post ",
            published: true
        });

        expect(result.error).toBe(null);
        expect(result.data.authorId).toBe(1);
        expect(result.data.title).toBe("Titulo de prueba");
        expect(result.data.content).toBe("Contenido del post");
        expect(result.data.published).toBe(true);
    });

    test("si published no viene, lo deja en false", () => {
        const result = validatePostInput({
            author_id: 1,
            title: "Post sin published",
            content: "Contenido valido"
        });

        expect(result.error).toBe(null);
        expect(result.data.published).toBe(false);
    });

    test("rechaza author_id faltante", () => {
        const result = validatePostInput({
            title: "Post invalido",
            content: "Contenido"
        });

        expect(result.error).toBe("author_id es obligatorio");
    });

    test("rechaza author_id no numerico", () => {
        const result = validatePostInput({
            author_id: "hola",
            title: "Post invalido",
            content: "Contenido"
        });

        expect(result.error).toBe("author_id debe ser un numero");
    });

    test("rechaza title vacio", () => {
        const result = validatePostInput({
            author_id: 1,
            title: "   ",
            content: "Contenido"
        });

        expect(result.error).toBe("title es obligatorio");
    });

    test("rechaza content vacio", () => {
        const result = validatePostInput({
            author_id: 1,
            title: "Titulo",
            content: "   "
        });

        expect(result.error).toBe("content es obligatorio");
    });
    test("rechaza published que no sea booleano", () => {
        const result = validatePostInput({
            author_id: 1,
            title: "Titulo",
            content: "Contenido",
            published: "true"
        });
        expect(result.error).toBe("published debe ser true o false");
    });
});