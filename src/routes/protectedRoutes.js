const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// Returns the decoded token payload (userId, email)
router.get("/me", auth, async (req, res) => {
  const { userId, email } = req.user || {};
  return res.status(200).json({ userId, email });
});

module.exports = router;