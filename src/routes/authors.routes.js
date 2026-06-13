const express = require("express");
const router = express.Router();
const authorsService = require("../services/authors.services");

router.get("/", async (req,res)=>{
    try{

        const authors = await authorsService.getAllAuthors();
        res.json(authors);

    } catch (error){

        console.error(error);
        res.status(500).json({

            error: "Error interno del servidor"
            
        });
    }
});

router.post("/", async (req,res)=>{
    try{
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const bio = req.body.bio?.trim() || null;

        if(!name || !email){
            return res.status(400).json({
                error: "Name y email son obligatorios"
            });
        }

        const newAuthor = await authorsService.createAuthor(
            name,
            email,
            bio
);

        res.status(201).json(newAuthor);
    } catch (error){

        if (error.code === "23505"){
            return res.status(400).json({
                error: "El email ya existe"
            });
        }

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.put("/:id", async (req, res)=>{
    try{
        const id = Number(req.params.id);
        const name = req.body.name?.trim();
        const email = req.body.email?.trim().toLowerCase();
        const bio = typeof req.body.bio === "string" ? req.body.bio.trim() || null : null;

        if(Number.isNaN(id)){
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        if(!name || !email){
            return res.status(400).json({
                error: "Name y email son obligatorios"
            });
        }

        const updatedAuthor = await authorsService.updateAuthor(
            id,
            name,
            email,
            bio
);

        if (!updatedAuthor){
            return res.status(400).json({
                error: "Autor no encontrado"
            });
        }

        res.json(updatedAuthor);
    } catch (error){
        console.error(error);

        if (error.code === "23505"){
            return res.status(400).json({
                error: "El email ya existe"
            });
        }

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/:id", async (req, res) =>{
    try{
        const id = Number(req.params.id);

        if(Number.isNaN(id)) {
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }
        const author = await authorsService.getAuthorById(id);

        if(!author){
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }
        res.json(author);
    } catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        const id = Number(req.params.id);

        if(Number.isNaN(id)){
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        const deletedRows = await authorsService.deleteAuthor(id);

        if (deletedRows === 0){
            return res.status(404).json({
                error: "Autor no encontrado"
            });
        }

        res.status(204).send();
    } catch (error){
        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


module.exports = router;