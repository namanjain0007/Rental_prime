const express = require("express");
const router = express.Router();
const notificationController = require("../../../controller/Users/Notification/notificationController");
const verifyToken = require("../../../middleware/authMiddleware");
const verify_adminToken = require("../../../middleware/auth_adminMiddleware");

router.post("/", verifyToken, notificationController.createNotification);

// Get all notifications - restricted to super_admin only
router.get(
  "/all",
  verify_adminToken,
  notificationController.getAllNotifications
);

// Get user-specific notifications
router.get(
  "/:userId",
  verifyToken,
  notificationController.getUserNotifications
);

// router.patch("/:id/read", notificationController.markAsRead);
router.delete("/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;
