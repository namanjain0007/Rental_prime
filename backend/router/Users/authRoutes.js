const express = require("express");
const router = express.Router();
const {
  userLogin,
  protectedRoute,
} = require("../../controller/Users/authController");
const verifyToken = require("../../middleware/authMiddleware");

router.post("/login", userLogin);
router.get("/protected_route", verifyToken, protectedRoute);
module.exports = router;
