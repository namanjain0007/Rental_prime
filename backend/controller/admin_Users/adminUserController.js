const db = require("../../database/postgres");
const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../../Models/userModel");

// CREATE
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await findUserByEmail(email);
  if (user) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.query(
      "INSERT INTO admin_users (username,email, password) VALUES ($1,$2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM admin_users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM admin_users WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const check = await db.query("SELECT * FROM admin_users WHERE id = $1", [
      id,
    ]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await db.query(
      "UPDATE admin_users SET username = $1, email = $2 WHERE id = $3 RETURNING *",
      [username || check.rows[0].username, email || check.rows[0].email, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM admin_users WHERE id = $1", [
      id,
    ]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
