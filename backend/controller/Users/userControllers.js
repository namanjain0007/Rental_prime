const db = require("../../database/postgres");
const bcrypt = require("bcryptjs");
const { findUserByEmail } = require("../../Models/userModel");

// CREATE
exports.createUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "No data provided" });
  }
  const { name, email, password, user_type } = req.body;

  if (!name || !email || !password || !user_type) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const user = await findUserByEmail(email);
  if (user) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.query(
      "INSERT INTO users (name, email, password, user_type) VALUES ($1, $2, $3, $4)",
      [name, email, hashedPassword, user_type]
    );
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ALL
exports.getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
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
  if (req.user.user_id !== parseInt(req.params.id)) {
    return res.status(403).json({ error: "Access denied" });
  }
  if (!req.body || !req.body.name || !req.body.email) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const check = await db.query("SELECT * FROM users WHERE user_id = $1", [
      id,
    ]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE user_id = $3 RETURNING *",
      [name || check.rows[0].name, email || check.rows[0].email, id]
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
    const result = await db.query("DELETE FROM users WHERE user_id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
