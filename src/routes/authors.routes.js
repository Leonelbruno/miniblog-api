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

/* let authors = [
    {
        id: 1,
        name: "Alexelcapo",
        email: "alexelcapo@gmail.com",
        bio: "Crítico y amante de videojuegos"
    },
    {
        id: 2,
        name: "Anton Ego",
        email: "anton@gmail.com",
        bio: "Crítico de comida"
    },
    {
        id: 3,
        name: "Miranda Priestly",
        email: "mirandapriestly@gmail.com",
        bio: "Editora y crítica de tendencias culturales globales"
    }
];

router.get("/", (req, res) => {
    res.json(authors);
}); */

module.exports = router;