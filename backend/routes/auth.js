const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const auth = require("../middleware/auth");

//Verify user token
router.post("/token-is-valid", auth, async (req, res) => {
  res.json({ data: true });
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) throw Error("User does not exist");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//Register a new user
router.post("/register", async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;

    if (!email || !name || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please enter all fields" });
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

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    return res.json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

//Get user data
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User does not exist");
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;
