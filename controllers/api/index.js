const router = require("express").Router();
const userRoute = require("./userRoute.js");

router.use("/users", userRoute);

module.exports = router;
