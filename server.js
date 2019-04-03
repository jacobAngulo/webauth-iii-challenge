const express = require("express");

const AuthRouter = require("./auth/authRouter");
const UserRouter = require('./users/usersRouter')

const server = express();

server.use(express.json());
server.use("/api/auth", AuthRouter);
server.use("/api/users", UserRouter);

server.get("/", (req, res) => {
  res.send("welcom to the /");
});

module.exports = server;
