const pool = require("../../../database/postgres");

// Create a new listing by owner ID
exports.createListing = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "No data provided" });
  }

  const {
    // owner_id,
    title,
    description,
    price,
    location,
    category,
    available_from,
    available_until,
  } = req.body;
  if (
    // !owner_id ||
    !title ||
    !description ||
    !price ||
    !location ||
    !category ||
    !available_from ||
    !available_until
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const newListing = await pool.query(
      `INSERT INTO listings (owner_id, title, description, price, location, category, available_from, available_until, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
      [
        req.user.user_id,
        title,
        description,
        price,
        location,
        category,
        available_from,
        available_until,
      ]
    );
    res.json(newListing.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all listings
exports.getAllListings = async (req, res) => {
  try {
    const listings = await pool.query("SELECT * FROM listings");
    res.json(listings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get all listings of a specific owner
exports.getOwnerListings = async (req, res) => {
  const { ownerId } = req.params;
  if (!ownerId) {
    return res.status(400).json({ msg: "Owner ID is required" });
  }

  try {
    const listings = await pool.query(
      "SELECT * FROM listings WHERE owner_id = $1",
      [ownerId]
    );
    res.json(listings.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get a specific listing by ID
exports.getListings = async (req, res) => {
  const { listingId } = req.params;
  if (!listingId) {
    return res.status(400).json({ msg: "Listing ID is required" });
  }

  try {
    const listing = await pool.query(
      "SELECT * FROM listings WHERE listing_id = $1",
      [listingId]
    );
    if (listing.rows.length === 0) {
      return res.status(404).json({ msg: "Listing not found" });
    }
    res.json(listing.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Update a listing by ID
// PATCH request for updating listing
exports.updateListing = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ msg: "No data provided to update" });
  }

  const { listingId } = req.params;
  const {
    title,
    description,
    price,
    location,
    category,
    available_from,
    available_until,
  } = req.body;

  const result = await pool.query(
    "SELECT * FROM listings WHERE listing_id = $1 AND owner_id = $2",
    [listingId, req.user.user_id]
  );

  if (result.rows.length === 0) {
    return res
      .status(403)
      .json({ msg: "You are not allowed to update this listing" });
  }
  // Create an array to hold values for the update query
  const updatedFields = [];
  const values = [];

  // Counter for dynamically numbered placeholders
  let paramIndex = 1;

  // Check for fields and add to the query dynamically
  let query = "UPDATE listings SET";

  if (title) {
    updatedFields.push(`title = $${paramIndex}`);
    values.push(title);
    paramIndex++;
  }
  if (description) {
    updatedFields.push(`description = $${paramIndex}`);
    values.push(description);
    paramIndex++;
  }
  if (price) {
    updatedFields.push(`price = $${paramIndex}`);
    values.push(price);
    paramIndex++;
  }
  if (location) {
    updatedFields.push(`location = $${paramIndex}`);
    values.push(location);
    paramIndex++;
  }
  if (category) {
    updatedFields.push(`category = $${paramIndex}`);
    values.push(category);
    paramIndex++;
  }
  if (available_from) {
    updatedFields.push(`available_from = $${paramIndex}`);
    values.push(available_from);
    paramIndex++;
  }
  if (available_until) {
    updatedFields.push(`available_until = $${paramIndex}`);
    values.push(available_until);
    paramIndex++;
  }

  // If no fields to update, return a bad request error
  if (updatedFields.length === 0) {
    return res.status(400).json({ msg: "No fields to update" });
  }

  // Add timestamp for update
  updatedFields.push(`updated_at = CURRENT_TIMESTAMP`);
  values.push(listingId); // Listing ID as the last parameter

  // Build the final query dynamically
  query +=
    " " +
    updatedFields.join(", ") +
    ` WHERE listing_id = $${paramIndex} RETURNING *`;

  try {
    const updatedListing = await pool.query(query, values);

    if (updatedListing.rows.length === 0) {
      return res.status(404).json({ msg: "Listing not found" });
    }

    res.json(updatedListing.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a listing by ID
exports.deleteListing = async (req, res) => {
  const { listingId } = req.params;
  if (!listingId) {
    return res.status(400).json({ msg: "Listing ID is required" });
  }

  try {
    const deletedListing = await pool.query(
      "DELETE FROM listings WHERE listing_id = $1 AND owner_id = $2 RETURNING *",
      [listingId, req.user.user_id]
    );
    if (deletedListing.rows.length === 0) {
      return res
        .status(403)
        .json({ msg: "You are not allowed to delete this listing" });
    }

    res.json({ msg: "Listing deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
