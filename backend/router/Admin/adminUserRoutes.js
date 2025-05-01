const express = require("express");
const router = express.Router();
const adminUserController = require("../../controller/admin_Users/adminUserController");
const verify_adminToken = require("../../middleware/auth_adminMiddleware");

router.post("/", verify_adminToken, adminUserController.createUser);
router.get("/", verify_adminToken, adminUserController.getAllUsers);
router.get("/:id", verify_adminToken, adminUserController.getUserById);
router.patch("/:id", verify_adminToken, adminUserController.updateUser);
router.delete("/:id", verify_adminToken, adminUserController.deleteUser);

module.exports = router;
