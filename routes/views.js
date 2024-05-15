const router = require("express").Router();
const path = require("path");

// HTML routes
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname,"..", "public", "notes.html"));
});

module.exports = router;
