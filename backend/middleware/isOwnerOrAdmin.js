const jwt = require("jsonwebtoken");

/**
 * Middleware to check if the user is either an owner or a superadmin
 * This middleware independently verifies both user and admin tokens
 */
const isOwnerOrAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    // Try to verify the token as either a user token or an admin token
    try {
      // First, try to verify as a user token
      const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

      // Check if it's a user token with owner type
      if (decodedUser.user_type === "Owner") {
        req.user = decodedUser;
        return next();
      }

      // Check if it's an admin token with super_admin type
      if (decodedUser.admin_user_type === "super_admin") {
        req.admin = decodedUser;
        return next();
      }

      // If we get here, the token is valid but doesn't have the right permissions
      return res.status(403).json({
        message:
          "Access denied: Only owners or superadmins can perform this action",
      });
    } catch (err) {
      // Token verification failed
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Authorization error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = isOwnerOrAdmin;
