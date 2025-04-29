//Importing modules and files
const { findUserByEmail } = require("../../Models/userModel");
const generateToken = require("../../utlis/generateToken");
const bcrypt = require("bcryptjs");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await findUserByEmail(email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = generateToken(user);

  res.json({ message: "User login successful", token });
};

const protectedRoute = (req, res) => {
  try {
    res.json({
      message: "User protected route accessed successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("User protected route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userLogin, protectedRoute };
