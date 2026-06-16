const express = require("express");
const router = express.Router();
const postsService = require("../services/posts.services");
const {validatePostInput} = require("../validators/posts.validators");

router.get("/", async (req, res)=>{
    try{
        const posts = await postsService.getAllPosts();
        res.json(posts);
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const validation = validatePostInput(req.body);

        if (validation.error) {
            return res.status(400).json({
                error: validation.error
            });
        }


        const { authorId, title, content, published } = validation.data;

        const newPost = await postsService.createPost(
            authorId,
            title,
            content,
            published
        );
        res.status(201).json(newPost);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(400).json({
                error: "El author_id no existe"
            });
        }
        console.error(error);

        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.get("/author/:authorId", async (req,res)=>{
    try{
        const authorID = Number(req.params.authorId);

        if (Number.isNaN(authorID)){
            return res.status(400).json({
                error: "El authorId debe ser un numero"
            });
        }

        const posts = await postsService.getPostByAuthor(authorID);
        res.json(posts);
    
        } catch (error){
            console.error(error);

            res.status(500).json({
                error: "Error interno del servidor"
            });
        }
});

router.get("/:id", async(req,res)=>{
    try{
        const id = Number(req.params.id);

        if (Number.isNaN(id)){
            return res.status(400).json({
                error: "El id debe ser un numero"
            });
        }

        const post = await postsService.getPostById(id);

        if (!post){
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }
        res.json(post);

    } catch (error) {
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

        const validation = validatePostInput(req.body);

        if (validation.error) {
            return res.status(400).json({
                error: validation.error
            });
        }

        const { authorId, title, content, published } = validation.data;

        const updatedPost = await postsService.updatePost(
            id,
            authorId,
            title,
            content,
            published
        );

        if (!updatedPost) {
            return res.status(404).json({
                error: "Post no encontrado"
            });
        }

        res.json(updatedPost);
    } catch (error) {
        if (error.code === "23503") {
            return res.status(400).json({
                error: "El author_id no existe"
            });
        }

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

        const deletedRows = await postsService.deletePost(id);

        if (deletedRows === 0) {
            return res.status(404).json({
                error: "Post no encontrado"
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