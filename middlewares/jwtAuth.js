const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
  const token = req.body.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid credentials" });
      }
      next();
    });
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};

exports.authenticateJWT = authenticateJWT;
