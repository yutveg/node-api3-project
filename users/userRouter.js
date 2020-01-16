const express = require("express");

const router = express.Router();
const Users = require("./userDb.js");
const Posts = require("../posts/postDb.js");

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  Users.insert(req.body)
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

router.get("/:id", validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: "Something has gone wrong." });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(result => {
      res.status(200).json({ message: "User has been deleted!" });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then(result => {
      result === 1
        ? res.status(200).json({ message: "Success" })
        : res.status(400).json({ error: "Could not find user with that ID." });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id).then(result => {
    result === undefined
      ? res.status(400).json({ error: "user not found" })
      : next();
  });
}

function validateUser(req, res, next) {
  if (req.body === undefined || req.body === null) {
    res.status(400).json({ message: "missing user data" });
  } else if (req.body.name === undefined || req.body.name === null) {
    res.status(400).json({ message: "missing required name field" });
  } else next();
}

function validatePost(req, res, next) {
  if (req.body === undefined || req.body === null) {
    res.status(400).json({ message: "missing post data" });
  } else if (req.body.text === undefined || req.body.text === null) {
    res.status(400).json({ message: "missing required text field" });
  } else next();
}

module.exports = router;
