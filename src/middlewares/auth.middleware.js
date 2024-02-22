const jwt = require("jsonwebtoken");
const authenticatedUsers = require("../users.json");

const showAuthenticatedUserList = (req, res, next) => {
  console.log("Authenticated Users", authenticatedUsers);
  next();
};

function extractToken(req) {
  if (req.headers.authorization.split(" ")[0] === "Bearer") {
    return req.headers.authorization.split(" ")[1];
  }
  return req.headers.authorization;
}

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    jwt.verify(
      extractToken(req),
      process.env.JWT_SECRET,
      function (err, decode) {
        if (err) {
          return res.status(401).json({ message: "Token verification failed" });
        } else {
          req.user = authenticatedUsers.users.find(
            (user) => user.email === decode.email
          );

          console.log("Authenticated User", req.user);

          if (!req.user) {
            return res
              .status(401)
              .json({ message: "Token verification failed" });
          }
          next();
        }
      }
    );
  } else {
    return res.status(401).json({ message: "Authorization header not found" });
  }
};

module.exports = { showAuthenticatedUserList, verifyToken };
