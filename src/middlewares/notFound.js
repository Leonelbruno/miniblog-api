const { notFound } = require("../utils/errors");

function notFoundHandler(req, res, next) {
    next(notFound(`No se encontró la ruta ${req.originalUrl}`));
}

module.exports = notFoundHandler;