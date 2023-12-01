const express = require("express");
const router = express.Router();
const posts = require("./posts.js");

function paramsController(req, res) {
  const user = req.query.user;
  const authToken = req.query["auth-token"];
  if (user === "admin" && authToken === "admin123") {
    res.send("Richiesta confermata");
  } else {
    res.send("Errore nella richiesta");
  }
}

module.exports = router
  .get("/", (req, res) => {
    res.status(200).json(posts);
  })

  .get("/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
      res.status(200).json(post);
    } else {
      return res.json({ status: 404, message: "id non trovato" });
    }
  })

  .get("/:slug", (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).send("Post non trovato")
    }
  })

  .post("/", (req, res) => {
    paramsController(req, res);
  })

  .patch("/", (req, res) => {
    paramsController(req, res);
  })

  .delete("/", (req, res) => {
    paramsController(req, res);
  });
