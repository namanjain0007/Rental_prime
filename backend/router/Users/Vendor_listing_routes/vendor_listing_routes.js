const express = require("express");
const router = express.Router();
const {
  createListing,
  getAllListings,
  getListings,
  getOwnerListings,
  updateListing,
  deleteListing,
} = require("../../../controller/Users/Vendor_Listing/Listing_CRUD");
const verifyToken = require("../../../middleware/authMiddleware");
const isOwner = require("../../../utlis/isOwner");

// Create a new listing
router.post("/listing", verifyToken, isOwner, createListing);

// Get all listings by the owner
router.get("/:ownerId", getOwnerListings);

// Get all listings
router.get("/", getAllListings);

// Get a specific listing
router.get("/listing/:listingId", getListings);

// Update a listing
router.patch("/listing/:listingId", verifyToken, isOwner, updateListing);

// Delete a listing
router.delete("/listing/:listingId", verifyToken, isOwner, deleteListing);

module.exports = router;
