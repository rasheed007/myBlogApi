const router = require("express").Router();
 
const authRoutes = require("./auth-routes");
const blogRoutes = require("./blog-routes");

 
router.use("/auth", authRoutes);
router.use("/api", blogRoutes);
 
module.exports = router;