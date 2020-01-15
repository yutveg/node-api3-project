const express = require("express");

const server = express();

const userRouter = require("./users/userRouter.js");
const postRouter = require("./posts/postRouter.js");

server.use(logger);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log({ method: req.method, url: req.url, timestamp: Date.now() });
  next();
}

module.exports = server;
