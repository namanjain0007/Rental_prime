const express = require("express");
const router = express.Router();
const notificationController = require("../../../controller/Users/Notification/notificationController");
const verifyToken = require("../../../middleware/authMiddleware");

router.post("/", verifyToken, notificationController.createNotification);
router.get(
  "/:userId",
  verifyToken,
  notificationController.getUserNotifications
);
// router.patch("/:id/read", notificationController.markAsRead);
router.delete("/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;
