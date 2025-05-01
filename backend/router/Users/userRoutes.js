const express = require("express");
const router = express.Router();
const userController = require("../../controller/Users/userControllers");
const VerifyAdminToken = require("../../middleware/auth_adminMiddleware");
const userVerifyToken = require("../../middleware/authMiddleware");

router.post("/", userController.createUser);
router.get("/", VerifyAdminToken, userController.getAllUsers);
router.get("/:id", VerifyAdminToken, userController.getUserById);
router.patch("/:id", userVerifyToken, userController.updateUser);
router.delete("/:id", VerifyAdminToken, userController.deleteUser);

module.exports = router;
