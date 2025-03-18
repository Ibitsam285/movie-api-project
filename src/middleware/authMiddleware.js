const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const isTestEnv = process.env.NODE_ENV === "test";

const authMiddleware = (req, res, next) => {
    if (isTestEnv) {
        return next(); // Skip authentication in test mode
    }
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

  try {
    // console.log(token.split(" ")[1])
    // console.log(authConfig.secret)
    const verified = jwt.verify(token.split(" ")[1], authConfig.secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware; 
