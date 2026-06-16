function validatePostInput(body) {
    if (body.author_id === undefined || body.author_id === null) {
        return {
            error: "author_id es obligatorio"
        };
    }

    const authorId = Number(body.author_id);

    if (Number.isNaN(authorId)) {
        return {
            error: "author_id debe ser un numero"
        };
    }

    if (!Number.isInteger(authorId) || authorId <= 0) {
        return {
            error: "author_id debe ser un numero entero positivo"
        };
    }

    if (body.title === undefined || body.title === null) {
        return {
            error: "title es obligatorio"
        };
    }

    if (typeof body.title !== "string") {
        return {
            error: "title debe ser un texto"
        };
    }

    const title = body.title.trim();
    if (!title) {
        return {
            error: "title es obligatorio"
        };
    }

    if (title.length > 225) {
        return {
            error: "title no puede superar los 225 caracteres"
        };
    }
    if (body.content === undefined || body.content === null) {
        return {
            error: "content es obligatorio"
        };
    }

    if (typeof body.content !== "string") {
        return {
            error: "content debe ser un texto"
        };
    }

    const content = body.content.trim();
    if (!content) {
        return {
            error: "content es obligatorio"
        };
    }
    let published = false;
    if (body.published !== undefined) {
        if (typeof body.published !== "boolean") {
            return {
                error: "published debe ser true o false"
            };
        }
        published = body.published;
    }
    return {
        error: null,
        data: {
            authorId,
            title,
            content,
            published
        }
    };
}

module.exports = {
    validatePostInput
};