//Importing modules and files
const express = require("express");
const app = express();
const cors = require("cors");

//Routes files
const userRoutes = require("./router/Users/userRoutes");
const authRoutes = require("./router/Users/authRoutes");
const adminUserRoutes = require("./router/Admin/adminUserRoutes");
const adminUserAuth = require("./router/Admin/adminUserAuth");
const vendorListingRoutes = require("./router/Users/Vendor_listing_routes/vendor_listing_routes");
const categoryRoutes = require("./router/Admin/Category/categoryRoute");
const pricingPlanRoutes = require("./router/Admin/pricingPlanRoutes");
const notificationRoutes = require("./router/Users/Notification_routes/notification_routes");

app.use(cors());

//Middleware for parsing JSON data
app.use(express.json());

//Database connection
const db = require("./database/postgres");

//Routes

//users CRUD
app.use("/users", userRoutes);

//login and procected route for user
app.use("/auth/user", authRoutes);

//admin users CRUD
app.use("/admin", adminUserRoutes);

//login and procected route for admin_user
app.use("/auth/admin", adminUserAuth);

//vendor listing CRUD
app.use("/vendor_listing", vendorListingRoutes);

//category CRUD
app.use("/category", categoryRoutes);

//pricing plan CRUD
app.use("/pricing_plans", pricingPlanRoutes);

//notification CRUD
app.use("/notification", notificationRoutes);

//Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at ${process.env.DB_HOST}:${PORT}`);
});
