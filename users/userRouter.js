const express = require("express");

const router = express.Router();
const Users = require("./userDb.js");

router.post("/", (req, res) => {
  Users.insert(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.post("/:id/posts", (req, res) => {
  Posts.insert(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.get("/", (req, res) => {
  Users.get()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.get("/:id/posts", (req, res) => {
  Users.getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.delete("/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
