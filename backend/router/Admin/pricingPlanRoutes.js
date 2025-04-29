const express = require("express");
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
} = require("../../controller/admin_Users/Pricing_plans/pricingPlanController");

// Pricing Plan Routes
router.post("/", createPlan);
router.get("/", getAllPlans);
router.patch("/:planId", updatePlan);
router.delete("/:planId", deletePlan);

module.exports = router;
