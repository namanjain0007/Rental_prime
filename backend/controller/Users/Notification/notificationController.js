const Notification = require("../../../Models/notificationModel");

exports.createNotification = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  if (
    !req.body.sender_id ||
    !req.body.sender_type ||
    !req.body.receiver_id ||
    !req.body.receiver_type ||
    !req.body.type ||
    !req.body.message
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const {
      type,
      message,
      sender_id,
      sender_type,
      receiver_id,
      receiver_type,
    } = req.body;
    if (sender_type === receiver_type) {
      return res
        .status(400)
        .json({ error: "Sender and receiver cannot be the same" });
    }
    const notification = await Notification.createNotification({
      sender_id,
      sender_type,
      receiver_id,
      receiver_type,
      type,
      message,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserNotifications = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (parseInt(userId) !== req.user.user_id) {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const notifications = await Notification.getUserNotifications(
      userId,
      req.user.user_type
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    const deleted = await Notification.deleteNotification(id);
    res.json({ message: "Notification deleted", deleted });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

/**
 * Get all notifications in the system
 * This route is restricted to super_admin users only
 */
exports.getAllNotifications = async (req, res) => {
  try {
    // The auth_adminMiddleware already verifies that the user is a super_admin
    const notifications = await Notification.getAllNotifications();
    res.json({
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch all notifications",
      message: err.message,
    });
  }
};
