const express = require("express");
const router = express.Router();
const {
  createListing,
  getListings,
  getOwnerListings,
  updateListing,
  deleteListing,
} = require("../../../controller/Users/Vendor_Listing/Listing_CRUD");

// Create a new listing
router.post("/listing", createListing);

// Get all listings by the owner
router.get("/:ownerId", getOwnerListings);

// Get a specific listing
router.get("/listing/:listingId", getListings);

// Update a listing
router.patch("/listing/:listingId", updateListing);

// Delete a listing
router.delete("/listing/:listingId", deleteListing);

module.exports = router;
