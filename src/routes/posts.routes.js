const express = require("express");
const router = express.Router();
const postsService = require("../services/posts.services");

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

module.exports = router;