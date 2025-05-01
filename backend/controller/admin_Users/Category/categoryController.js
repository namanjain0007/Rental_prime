const pool = require("../../../database/postgres");

// Create Category
exports.createCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "No data provided" });
  }

  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const find = await pool.query(`SELECT * FROM categories WHERE name = $1`, [
    name,
  ]);
  if (find.rows.length > 0) {
    return res.status(400).json({ msg: "Category already exists" });
  }

  try {
    const newCategory = await pool.query(
      `INSERT INTO categories (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).json(newCategory.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query(`SELECT * FROM categories`);
    res.json(categories.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ msg: "Category ID is required" });
  }

  try {
    const category = await pool.query(
      `SELECT * FROM categories WHERE category_id = $1`,
      [categoryId]
    );

    if (category.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  if (!req.params.categoryId) {
    return res.status(400).json({ msg: "Category ID is required" });
  }
  if (!req.body) {
    return res.status(400).json({ msg: "No data provided to update" });
  }

  const { categoryId } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await pool.query(
      `UPDATE categories
       SET name = $1, updated_at = CURRENT_TIMESTAMP
       WHERE category_id = $2 RETURNING *`,
      [name, categoryId]
    );

    if (updatedCategory.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(updatedCategory.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  if (!categoryId) {
    return res.status(400).json({ msg: "Category ID is required" });
  }

  try {
    const deletedCategory = await pool.query(
      `DELETE FROM categories WHERE category_id = $1 RETURNING *`,
      [categoryId]
    );

    if (deletedCategory.rows.length === 0) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({ msg: "Category deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
