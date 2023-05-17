const router = require('express').Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./api/profileRoutes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
// router.use("/profile", profileRoutes);

module.exports = router;