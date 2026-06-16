const { validateAuthorInput} = require("../src/validators/authors.validators");

describe("validateAuthorInput", () => {
    test("acepta datos válidos y normaliza el email", () => {
        const result = validateAuthorInput({
            name: " Leonel ",
            email: " LEONEL@gmail.com ",
            bio: " Critico de videojuegos "
        });

        expect(result.error).toBe(null);
        expect(result.data.name).toBe("Leonel");
        expect(result.data.email).toBe("leonel@gmail.com");
        expect(result.data.bio).toBe("Critico de videojuegos");
    });

    test("rechaza author sin name", () => {
        const result = validateAuthorInput({
            email: "test@gmail.com"
        });

        expect(result.error).toBe("Name es obligatorio");
    });

    test("rechaza name vacío", () => {
        const result = validateAuthorInput({
            name: "   ",
            email: "test@gmail.com"
        });

        expect(result.error).toBe("Name es obligatorio");
    });

    test("rechaza email faltante", () => {
        const result = validateAuthorInput({
            name: "Leonel"
        });

        expect(result.error).toBe("Email es obligatorio");
    });

    test("rechaza email inválido", () => {
        const result = validateAuthorInput({
            name: "Leonel",
            email: "correo-invalido"
        });

        expect(result.error).toBe("El formato del email es inválido");
    });

    test("convierte bio vacía en null", () => {
        const result = validateAuthorInput({
            name: "Leonel",
            email: "leonel@gmail.com",
            bio: "   "
        });

        expect(result.error).toBe(null);
        expect(result.data.bio).toBe(null);
    });
});