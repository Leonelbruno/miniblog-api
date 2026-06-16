function validateAuthorInput(body) {
    if (body.name === undefined || body.name === null) {
        return {
            error: "Name es obligatorio"
        };
    }

    if (typeof body.name !== "string") {
        return {
            error: "Name debe ser un texto"
        };
    }

    const name = body.name.trim();

    if (!name) {
        return {
            error: "Name es obligatorio"
        };
    }

    if (name.length > 50) {
        return {
            error: "Name no puede superar los 50 caracteres"
        };
    }

    if (body.email === undefined || body.email === null) {
        return {
            error: "Email es obligatorio"
        };
    }

    if (typeof body.email !== "string") {
        return {
            error: "Email debe ser un texto"
        };
    }

    const email = body.email.trim().toLowerCase();

    if (!email) {
        return {
            error: "Email es obligatorio"
        };
    }

    if (email.length > 100) {
        return {
            error: "Email no puede superar los 100 caracteres"
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            error: "El formato del email es inválido"
        };
    }

    let bio = null;

    if (body.bio !== undefined && body.bio !== null) {
        if (typeof body.bio !== "string") {
            return {
                error: "La bio debe ser un texto"
            };
        }

        bio = body.bio.trim() || null;
    }

    return {
        error: null,
        data: {
            name,
            email,
            bio
        }
    };
}

module.exports = {
    validateAuthorInput
};