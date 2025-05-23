const express = require("express");
const router = express.Router();
const {
  createPlan,
  getAllPlans,
  updatePlan,
  deletePlan,
} = require("../../controller/admin_Users/Pricing_plans/pricingPlanController");
const {
  assignPlan,
} = require("../../controller/admin_Users/Pricing_plans/AssignPlanToUser");
const verify_adminToken = require("../../middleware/auth_adminMiddleware");

// Pricing Plan Routes
router.post("/", verify_adminToken, createPlan);
router.get("/", getAllPlans);
router.patch("/:planId", verify_adminToken, updatePlan);
router.delete("/:planId", verify_adminToken, deletePlan);
router.patch("/assign/:user_id", assignPlan);

module.exports = router;
