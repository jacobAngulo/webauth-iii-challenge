const jwt = require("jsonwebtoken");
const jwtSecret = require("../secrets").jwtSecret;

module.exports = {
  decodeJwt
};

function decodeJwt(req, res, next) {
  const token = req.headers.authorization;

  console.log(
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.status(401).json({ message: 'Invalid Credentials' });

      } else {
        req.decodedJwt = decodedToken;
        console.log(req.decodedJwt);
        next();
      }
    })
  );
}
