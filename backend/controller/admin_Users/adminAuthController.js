//Importing modules and files
const { findadminUserByEmail } = require("../../Models/adminUserModel");
const admin_generateToken = require("../../utlis/admin_generateToken");
const bcrypt = require("bcryptjs");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const admin = await findadminUserByEmail(email);
  if (!admin) return res.status(400).json({ message: "Admin_user not found" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(400).json({ message: "Wrong password" });

  const token = admin_generateToken(admin);

  res.json({ message: "Admin_user login successful", token });
};

const adminProtectedRoute = (req, res) => {
  try {
    res.json({
      message: "Admin_user protected route accessed successfully",
      admin: req.user,
    });
  } catch (error) {
    console.error("Admin_user protected route error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { adminLogin, adminProtectedRoute };
