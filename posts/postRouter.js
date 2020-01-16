const express = require("express");

const router = express.Router();

const Posts = require("./postDb.js");

router.get("/", (req, res) => {
  Posts.get()
    .then(result => {
      res.status(200).json(result.message);
    })
    .catch(err => {
      res.status(500).json(result.message);
    });
});

router.get("/:id", validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(result => {
      res.status(200).json(result.message);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.delete("/:id", validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(result => {
      res.status(200).json(result.message);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.put("/:id", validatePostId, (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(result => {
      res.status(200).json(result.message);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

// custom middleware

function validatePostId(req, res, next) {
  if (!Posts.getById(req.params.id)) {
    res.status(400).json({ error: "No post of that ID could be found." });
  } else next();
}

module.exports = router;
