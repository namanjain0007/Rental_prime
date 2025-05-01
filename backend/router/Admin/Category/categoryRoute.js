const express = require("express");
const router = express.Router();
const categoryController = require("../../../controller/admin_Users/Category/categoryController");
const verify_adminToken = require("../../../middleware/auth_adminMiddleware");

// Routes
router.post("/", verify_adminToken, categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get(
  "/:categoryId",
  // verify_adminToken,
  categoryController.getCategoryById
);
router.patch(
  "/:categoryId",
  verify_adminToken,
  categoryController.updateCategory
);
router.delete(
  "/:categoryId",
  verify_adminToken,
  categoryController.deleteCategory
);

module.exports = router;
