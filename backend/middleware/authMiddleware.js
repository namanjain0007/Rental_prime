const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err);
        return res.status(403).json({ message: "Invalid or expired token" });
      }

      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = verifyToken;
