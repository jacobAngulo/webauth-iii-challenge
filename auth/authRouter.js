const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../secrets").jwtSecret;

const router = express.Router();

const Auth = require("./authModel");

const {
  checkRegistrationRequirements,
  checkLoginRequirements,
  hashPassword
} = require("./authMiddleware");

router.post(
  "/register",
  checkRegistrationRequirements,
  hashPassword,
  (req, res) => {
    const user = req.body;
    console.log(user);
    Auth.addUser(user)
      .then(user => res.status(201).json(user))
      .catch(err => res.status(500).json(err));
  }
);

router.post("/login", checkLoginRequirements, (req, res) => {
  const { username, password } = req.body;

  Auth.findBy({ username: username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => res.status(500).json(err));
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const secret = jwtSecret;
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options); // returns valid token
}

module.exports = router;
