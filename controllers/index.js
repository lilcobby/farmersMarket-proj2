const router = require("express").Router();

const apiRoutes = require("./api/index.js");
const homeRoutes = require("./homeRoute")
// jh change to start homeroutes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
