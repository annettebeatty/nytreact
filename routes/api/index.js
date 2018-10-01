const router = require("express").Router();
const noteRoutes = require("./notes");

// Book routes
router.use("/notes", noteRoutes);

module.exports = router;
