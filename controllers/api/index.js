// COMMENT: Required Dependencies
const router = require("express").Router();
const userRoute = require("./userRoute.js");
const cartRoute = require("./cartRoute.js");
const productRoute = require("./productRoute.js");
const vendorRoute = require("./vendorRoute.js");
const adminRoute = require("./adminRoute.js");

// COMMENT: Routes after the /api path
router.use("/users", userRoute);
router.use("/cart", cartRoute);
router.use("/products", productRoute);
router.use("/vendors", vendorRoute);
router.use("/admin", adminRoute);

// COMMENT: Exports the router
module.exports = router;
