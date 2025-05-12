const pool = require("../database/postgres");

const countListingsByUser = async (userId) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM listings WHERE owner_id = $1",
    [userId]
  );
  return result.rows[0].count;
};

module.exports = { countListingsByUser };
