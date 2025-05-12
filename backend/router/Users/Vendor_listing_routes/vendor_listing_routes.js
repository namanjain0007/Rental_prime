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
const adminVerifyToken = require("../../../middleware/auth_adminMiddleware");
const isOwnerOrAdmin = require("../../../middleware/isOwnerOrAdmin");
const checkListingLimit = require("../../../middleware/checkListingLimit");

// Create a new listing (can be done by both owner and superadmin)
router.post("/listing", isOwnerOrAdmin, checkListingLimit, createListing);

// Get all listings by the owner
router.get("/:ownerId", adminVerifyToken, getOwnerListings);

// Get all listings
router.get("/", adminVerifyToken, getAllListings);

// Get a specific listing
router.get("/listing/:listingId", getListings);

// Update a listing (can be done by both owner and superadmin)
router.patch("/listing/:listingId", isOwnerOrAdmin, updateListing);

// Delete a listing (can be done by both owner and superadmin)
router.delete("/listing/:listingId", isOwnerOrAdmin, deleteListing);

module.exports = router;
