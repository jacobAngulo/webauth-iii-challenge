require("dotenv").config();
const bcrypt = require("bcryptjs");

module.exports = {
  checkRegistrationRequirements,
  checkLoginRequirements,
  hashPassword
};

function checkRegistrationRequirements(req, res, next) {
  const user = req.body;
  if (user.username && user.password && user.department) {
    next();
  } else {
    res.status(403).json({ message: "please fill out require fields" });
  }
}

function checkLoginRequirements(req, res, next) {
  const user = req.body;
  if (user.username && user.password) {
    next();
  } else {
    res.status(403).json({ message: "please fill out require fields" });
  }
}

function hashPassword(req, res, next) {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, process.env.HASHSYNC || 5);
  next();
}
