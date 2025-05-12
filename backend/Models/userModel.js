const pool = require("../database/postgres");

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    id,
  ]);
  return result.rows[0];
};

const getPlanById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM pricing_plans WHERE plan_id = $1",
    [id]
  );
  return result.rows[0];
};

const assignPlanToUser = async (userId, planId) => {
  const result = await pool.query(
    "UPDATE users SET membership_plan_id = $1 WHERE user_id = $2",
    [planId, userId]
  );
  return result.rows[0];
};

module.exports = {
  findUserByEmail,
  getUserById,
  assignPlanToUser,
  getPlanById,
};
