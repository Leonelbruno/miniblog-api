const express = require("express");
const app = express();
const authorsRouter = require("./routes/authors.routes");
const postsRouter = require("./routes/posts.routes");
const notFoundHandler = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.get("/", (req,res)=>{
    res.json({ message: "MiniBlog API funcionando"});
});

app.get("/hello", (req,res)=>{
    res.json({message: "Hello!"});
});

app.get("/health", (req,res)=>{
    res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;