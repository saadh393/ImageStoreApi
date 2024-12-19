const express = require("express");

const router = express.Router();

// Property Route
router.use("/property", require("./property"));

module.exports = router;
