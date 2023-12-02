// COMMENT: Required Dependencies
const router = require("express").Router();
const userRoute = require("./userRoute.js");
const cartRoute = require("./cartRoute.js");
const productRoute = require("./productRoute.js");

// COMMENT: Routes after the /api path
router.use("/users", userRoute);
router.use("/cart", cartRoute);
router.use("/products", productRoute);

// COMMENT: Exports the router
module.exports = router;