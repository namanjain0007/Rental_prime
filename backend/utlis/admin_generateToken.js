const jwt = require("jsonwebtoken");

const admin_generateToken = (admin) => {
  return jwt.sign(
    {
      admin_id: admin.admin_id,
      admin_user_type: admin.admin_user_type,
      email: admin.email,
      name: admin.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

module.exports = admin_generateToken;
