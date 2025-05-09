const pool = require("../database/postgres");

exports.createNotification = async ({ user_id, user_type, type, message }) => {
  if (!user_id || !user_type || !type || !message) {
    throw new Error("All fields are required");
  }

  const result = await pool.query(
    "SELECT user_type FROM users WHERE user_id = $1",
    [user_id]
  );
  const user = result.rows[0];

  // Check if user_type matches
  if (!user || user.user_type !== user_type) {
    throw new Error(`User type mismatch for user_id ${user_id}`);
  }
  const notification = await pool.query(
    `INSERT INTO notifications (user_id, user_type, type, message)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, user_type, type, message]
  );
  return notification.rows[0];
};

exports.getUserNotifications = async (user_id, user_type) => {
  if (!user_id || !user_type) {
    throw new Error("User ID and user type are required");
  }

  const result = await pool.query(
    `SELECT * FROM notifications
     WHERE user_id = $1 AND user_type = $2
     ORDER BY created_at DESC`,
    [user_id, user_type]
  );
  return result.rows;
};

// exports.markAsRead = async (id) => {
//   if (!id) {
//     throw new Error("Notification ID is required");
//   }
//   const result = await pool.query(
//     `UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING *`,
//     [id]
//   );
//   return result.rows[0];
// };

// exports.deleteNotification = async (id) => {
//   if (!id) {
//     throw new Error("Notification ID is required");
//   }
//   const res = await pool.query(`DELETE FROM notifications WHERE id = $1`, [id]);
//   if (res.rowCount === 0) {
//     throw new Error("Notification not found");
//   }
//   return res.rows[0];
// };
exports.deleteNotification = async (id, user_id) => {
  if (!id || !user_id) {
    throw new Error("Notification ID and User ID are required");
  }

  // Step 1: Check if notification exists and belongs to user
  const check = await pool.query(
    `SELECT * FROM notifications WHERE id = $1 AND user_id = $2`,
    [id, user_id]
  );

  if (check.rowCount === 0) {
    throw new Error("Notification not found or access denied");
  }

  // Step 2: Delete
  const res = await pool.query(
    `DELETE FROM notifications WHERE id = $1 RETURNING *`,
    [id]
  );
  return res.rows[0];
};

exports.getAllNotifications = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM notifications
       ORDER BY created_at DESC`
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Failed to fetch all notifications: ${error.message}`);
  }
};
