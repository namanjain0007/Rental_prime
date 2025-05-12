const User = require("../../../Models/userModel");

// Assign Plan to User
exports.assignPlan = async (req, res) => {
  const userId = req.params.user_id;
  const { planId } = req.body;
  const plan = await User.getPlanById(planId);
  console.log("plan", plan);
  if (!plan) {
    return res.status(400).json({ error: "Plan not found" });
  }

  try {
    const user = await User.getUserById(userId); // Get the user by ID
    console.log("user", user);

    if (!user || user.user_type !== "Owner") {
      // Check if the user exists and is an owner
      return res.status(400).json({ error: "Only owners can have plans" }); // Return an error if the user is not an owner
    }

    await User.assignPlanToUser(userId, planId); // Assign the plan to the user
    res.status(200).json({ message: "Plan assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to assign plan" });
  }
};
