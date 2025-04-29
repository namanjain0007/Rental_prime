const express = require("express");
const router = express.Router();
const adminUserController = require("../../controller/Users/userControllers");

router.post("/", adminUserController.createUser);
router.get("/", adminUserController.getAllUsers);
router.get("/:id", adminUserController.getUserById);
router.patch("/:id", adminUserController.updateUser);
router.delete("/:id", adminUserController.deleteUser);

module.exports = router;
