const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

//Get all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log("Returned all users");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return user");
  }
});

//Get user by Id in req body
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({
      username: user.username,
      email: user.email,
      id: user._id,
    });
    console.log("Returned user");
  } catch (err) {
    res.json({ message: err });
    console.log("Failed to return user");
  }
});

//Verify user token
router.post("/token-is-valid", auth, async (req, res) => {
  res.json({ data: true });
});

//Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    if (
      email == null ||
      username == null ||
      password == null ||
      confirmPassword == null
    ) {
      return res.status(400).json({ message: "Missing information" });
    }

    //Validate registration fields
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      return res
        .status(400)
        .json({ message: "An account with this email already exists" });
    }

    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      return res
        .status(400)
        .json({ message: "This username is already taken" });
    }

    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username must be at least 3 characters long" });
    }

    if (username.length > 30) {
      return res
        .status(400)
        .json({ message: "Username must at most 30 characters long" });
    }

    const firstLetterRegExp = /[^A-Z]/i;
    if (firstLetterRegExp.test(username.charAt(0))) {
      return res
        .status(400)
        .json({ message: "Username must start with a letter" });
    }

    const usernameRegExp = /[^A-Z0-9_]/i;
    if (usernameRegExp.test(username)) {
      return res.status(400).json({
        message: "Username must only contain letters, numbers, or underscores",
      });
    }

    if (username.includes(" ")) {
      return res
        .status(400)
        .json({ message: "Username must not contain any spaces" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    const savedUser = await newUser.save();
    console.log("Successfully registered a new user");
    return res.json(savedUser);
  } catch (err) {
    res.json(500).json({ message: err });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing information" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "An account with this email does not exist" });
    }

    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordIsCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
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
