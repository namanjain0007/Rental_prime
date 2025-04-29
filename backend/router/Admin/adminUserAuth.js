const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminProtectedRoute,
} = require("../../controller/admin_Users/adminAuthController");
const verifyToken = require("../../middleware/authMiddleware");

router.post("/login", adminLogin);
router.get("/protected_route", verifyToken, adminProtectedRoute);

module.exports = router;
