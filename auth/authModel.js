const db = require("../data/knexConfig");

module.exports = {
  addUser,
  findBy
};

function addUser(user) {
  return db("users")
    .insert(user)
    .then(([id]) => findBy({ id: id }))
    .catch(err => console.log(err));
}

function findBy(param) {
  return db("users")
    .where(param)
    .first();
}
