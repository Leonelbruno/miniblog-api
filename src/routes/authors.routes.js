const express = require("express");
const router = express.Router();
const authorsService = require("../services/authors.services");
const { validateAuthorInput } = require("../validators/authors.validators");

router.get("/", async (req, res) => {
    try {

        const authors = await authorsService.getAllAuthors();
        res.json(authors);

    } catch (error) {

        console.error(error);
        res.status(500).json({

            error: "Error interno del servidor"

        });
    }
});

router.post("/", async (req, res) => {
    try {
        const validation = validateAuthorInput(req.body);

        if (validation.error) {
            return res.status(400).json({
                error: validation.error
            });
        }

        const { name, email, bio } = validation.data;

        const newAuthor = await authorsService.createAuthor(
            name,
            email,
            bio
        );

        res.status(201).json(newAuthor);
    } catch (error) {

        if (error.code === "23505") {
            return res.status(400).json({
                error: "El email ya existe"
            });
        }

        console.error(error);
        
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        const validation = validateAuthorInput(req.body);

        if (validation.error){
            return res.status(400).json({
                error: validation.error
            });
        }
        const {name, email, bio} = validation.data;

        const updatedAuthor = await authorsService.updateAuthor(
            id,
            name,
            email,
            bio
        );

        if (!updatedAuthor) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        res.json(updatedAuthor);
    } catch (error) {

        if (error.code === "23505") {
            return res.status(400).json({
                error: "El email ya existe"
            });
        }

        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }
        const author = await authorsService.getAuthorById(id);

        if (!author) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }
        res.json(author);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        const deletedRows = await authorsService.deleteAuthor(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


module.exports = router;