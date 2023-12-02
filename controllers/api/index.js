// COMMENT: Required Dependencies
const router = require("express").Router();
const userRoute = require("./userRoute.js");
const cartRoute = require("./cartRoute.js");

// COMMENT: Routes after the /api path
router.use("/users", userRoute);
router.use("/cart", cartRoute);

// COMMENT: Exports the router
module.exports = router;
