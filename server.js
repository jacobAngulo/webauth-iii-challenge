const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("welcom to the /");
});

module.exports = server;
