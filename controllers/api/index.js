const router = require("express").Router();
const userRoute = require("./userRoute.js");
const productRoute = require("./productRoute.js");

router.use("/users", userRoute);
router.use("/products", productRoute);

module.exports = router;
