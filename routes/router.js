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

  .get("/:id", (req, res, next) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (post) {
      res.status(200).json(post);
    } else {
      return next();
    }
  })

  .get("/:slug", (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);

    if (post) {
        res.status(200).json(post)
    } else {
        res.json({status: 404, message: "id non trovato"})
    }
  })

  .post("/", (req, res) => {
    paramsController(req, res);
  })

  .patch("/:param", (req, res) => {
    let post = posts.find((p) => p.id === parseInt(req.params.param))

    if(!post) {
      post = posts.find((p) => p.slug === parseInt(req.params.param))
    }

    if(post) {
      return res.status(200).json(`Post con id: ${post.id} aggiornato`)
    } else {
      res.json({status : 404, message: "id o slug non trovato"})
    }
  })

  .delete("/:param", (req, res) => {
    let post = posts.find((p) => p.id === parseInt(req.params.param))

    if(!post) {
      post = posts.find((p) => p.slug === parseInt(req.params.param))
    }

    if(post) {
      return res.status(200).json(`Post con id: ${post.id} eliminato`)
    } else {
      res.json({status : 404, message: "id o slug non trovato"})
    }
  });
