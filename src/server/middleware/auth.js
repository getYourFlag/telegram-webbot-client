require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function(requiredPermission = 0) {
  return function(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({ message: "Token not found." });
    }

    jwt.verify(token, process.env.jwtKey, function(err, payload) {
      if (err) {
        return res.status(401).send({ message: "Token was not valid." });
      }
      if (requiredPermission > payload.permission) {
        return res.status(401).send({ message: "Permissions denied." });
      }
      req.user = payload;
      next();
    });
  };
};
