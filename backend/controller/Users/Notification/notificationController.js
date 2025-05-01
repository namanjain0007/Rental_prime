const Notification = require("../../../Models/notificationModel");

// exports.createNotification = async (req, res) => {
//   try {
//     const notification = await Notification.createNotification(req.body);
//     res.status(201).json(notification);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.createNotification = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }
  if (!req.body.type || !req.body.message) {
    return res.status(400).json({ error: "Type and message are required" });
  }
  try {
    const { type, message } = req.body;
    const user_id = req.user.user_id;
    const user_type = req.user.user_type;

    const notification = await Notification.createNotification({
      user_id,
      user_type,
      type,
      message,
    });

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getUserNotifications = async (req, res) => {
//   try {
//     const userId = req.user.user_id; // Get user ID from the request
//     const userType = req.user.user_type; // Get user type from the request
//     const notifications = await Notification.getUserNotifications(
//       userId,
//       userType
//     );
//     res.json(notifications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
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
      req.user.user_id,
      req.user.user_type
    );
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// exports.markAsRead = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const notification = await Notification.markAsRead(id);
//     res.json(notification);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteNotification = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Notification.deleteNotification(id);
//     res.json({ message: "Notification deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Notification ID is required" });
    }
    const user_id = req.user.user_id; // from JWT

    const deleted = await Notification.deleteNotification(id, user_id);
    res.json({ message: "Notification deleted", deleted });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
