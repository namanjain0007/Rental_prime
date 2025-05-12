// Import the necessary models and middleware
const Listing = require("../Models/listingModel");
const User = require("../Models/userModel");

// Define the middleware function
module.exports = async (req, res, next) => {
  const userId = req.user.user_id; // Get the user ID from the request
  console.log("userId", userId);

  try {
    const user = await User.getUserById(userId); // Get the user by ID

    if (!user || user.user_type !== "Owner" || !user.membership_plan_id) {
      return res.status(403).json({ error: "Plan not assigned" });
    }

    const plan = await User.getPlanById(user.membership_plan_id); // Get the plan by ID

    const allowed = plan.available_listing;
    // console.log("allowed", allowed);
    // Get the allowed number of listings from the plan

    const used = await Listing.countListingsByUser(userId); // Get the number of listings by user ID
    // console.log("used", used);

    if (used >= allowed) {
      return res.status(403).json({ error: "Listing limit reached" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Error checking listing limit" });
  }
};
