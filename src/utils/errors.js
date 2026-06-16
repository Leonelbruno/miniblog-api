function createError(message, statusCode) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
}

function badRequest(message) {
    return createError(message, 400);
}

function notFound(message) {
    return createError(message, 404);
}

function internalError(message = "Error interno del servidor") {
    return createError(message, 500);
}

module.exports = {
    createError,
    badRequest,
    notFound,
    internalError
};