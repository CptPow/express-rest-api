const express = require("express");
const router = express.Router();
const posts = require("./posts.js");



module.exports = router
.get("/", (req, res) => {
    res.status(200).json(posts)
})


.get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
        res.status(200).json(post)
    } else {
        return res.json({status: 404, message: "id non trovato"})
    }
})


.post("/", (req, res) => {
    const params = req.url;
    if (params === "/?user=admin&auth-token=admin123"){
        res.send("Sei loggato con metodo POST")
    } else {
        res.send("Log in non riuscito con metodo POST")
    }
}) 
.patch("/", (req, res) => {
    const params = req.url;
    if (params === "/?user=admin&auth-token=admin123"){
        res.send("Sei loggato con metodo PATCH")
    } else {
        res.send("Log in non riuscito con metodo PATCH")
    }
}) 




