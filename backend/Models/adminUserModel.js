const pool = require("../database/postgres");

const findadminUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

module.exports = { findadminUserByEmail };
