const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

//Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log("Returned all users");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return user");
  }
});

//Get specific user
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select("-password");
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
    console.log(`Returned user ${userId}`);
  } catch (err) {
    res.json({ message: err });
    console.log(`Failed to return user ${userId}`);
  }
});

//Delete user
router.delete("/:userId", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.userId });
    res.json(removedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
