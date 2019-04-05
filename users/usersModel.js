const db = require("../data/knexConfig");

module.exports = {
  getUsers
};

function getUsers(req, res, next) {
  return db("users");
}
