const express = require("express");
const { decodeJwt } = require("./usersMiddleware");
const Users = require("./usersModel");

const router = express.Router();

router.get("/", decodeJwt, (req, res) => {
  Users.getUsers()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
