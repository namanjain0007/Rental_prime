const pool = require("../../../database/postgres");

// Create Plan
exports.createPlan = async (req, res) => {
  const { name, price, duration_in_days, available_listing } = req.body;
<<<<<<< HEAD
=======
  // console.log(available_listing);
>>>>>>> 85aaa70618fc1ebd77d415af4b68274b75baf82a

  if (!req.body) {
    return res.status(400).json({ msg: "No data provided" });
  }

  if (!name || !price || !duration_in_days || !available_listing) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const existing = await pool.query(
      `SELECT * FROM pricing_plans WHERE name = $1`,
      [name]
    );
    if (existing.rows.length > 0) {
      return res
        .status(400)
        .json({ msg: "Plan with this name already exists" });
    }

    const newPlan = await pool.query(
      `INSERT INTO pricing_plans (name, price, duration_in_days,available_listing)
       VALUES ($1, $2, $3,$4) RETURNING *`,
      [name, price, duration_in_days, available_listing]
    );

    res.status(201).json(newPlan.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get All Plans
exports.getAllPlans = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM pricing_plans ORDER BY plan_id`
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Update Plan
exports.updatePlan = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "No data provided to update" });
  }

  const { planId } = req.params;
  const { name, price, duration_in_days, available_listing } = req.body;
  if (!planId) {
    return res.status(400).json({ msg: "Plan ID is required" });
  }

  try {
    const existing = await pool.query(
      `SELECT * FROM pricing_plans WHERE plan_id = $1`,
      [planId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    // Prepare dynamic fields
    const fields = [];
    const values = [];
    let index = 1;

    if (name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(name);
    }
    if (price !== undefined) {
      fields.push(`price = $${index++}`);
      values.push(price);
    }
    if (duration_in_days !== undefined) {
      fields.push(`duration_in_days = $${index++}`);
      values.push(duration_in_days);
    }
    if (available_listing !== undefined) {
      fields.push(`available_listing = $${index++}`);
      values.push(available_listing);
    }

    if (fields.length === 0) {
      return res.status(400).json({ msg: "No fields provided to update" });
    }

    // Always update timestamp
    fields.push(`updated_at = CURRENT_TIMESTAMP`);

    // Final query
    const query = `UPDATE pricing_plans SET ${fields.join(
      ", "
    )} WHERE plan_id = $${index} RETURNING *`;
    values.push(planId);

    const result = await pool.query(query, values);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete Plan
exports.deletePlan = async (req, res) => {
  const { planId } = req.params;
  if (!planId) {
    return res.status(400).json({ msg: "Plan ID is required" });
  }

  try {
    const deleted = await pool.query(
      `DELETE FROM pricing_plans WHERE plan_id = $1 RETURNING *`,
      [planId]
    );

    if (deleted.rows.length === 0) {
      return res.status(404).json({ msg: "Plan not found" });
    }

    res.json({ msg: "Plan deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
