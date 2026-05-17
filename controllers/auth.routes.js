const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/verify-token");

// POST /auth/sign-up
router.post("/sign-up", async (req, res) => {
  try {
    // 1. verify that the username doesn't already exist in the Database

    const username = req.body.username.toLowerCase().trim();
    const email = req.body.email.toLowerCase().trim();
    const password = req.body.password;

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return res.status(409).json({
        err: "Username is already taken.",
      });
    }

    // 1.5: validation for password length and characters
    // Uncomment this if you want to enforce password with 1 letter, 1 number, 8 characters minimum

    const regexString = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$";

    if (!password.match(new RegExp(regexString))) {
      return res.status(400).json({
        err: "Password must be at least 8 characters and include a letter, number, and special character",
      });
    }

    const foundEmail = await User.findOne({ email });

    if (foundEmail) {
      return res.status(409).json({
        err: "Email is already in use.",
      });
    }

    // 2. save the user in the Database with the encrypted password

    const createdUser = await User.create({
      username,
      email,
      hashedPassword: bcrypt.hashSync(password, 12),
    });

    const userObject = createdUser.toObject();
    delete userObject.hashedPassword;

    // 3. send back the created user

    return res.status(201).json({ user: userObject });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      if (err.keyPattern?.email) {
        return res.status(409).json({
          err: "Email is already in use.",
        });
      }

      if (err.keyPattern?.username) {
        return res.status(409).json({
          err: "Username is already taken.",
        });
      }
    }

    return res.status(500).json({ err: err.message });
  }
});

// POST /auth/login

// 1. user sends POST request with username and password to login
// 2. get the user from db and check if they exist the DB
// 3. compare the password they give me vs the password in the DB
// 4. Sign a new JWT token send it back as a response

router.post("/sign-in", async (req, res) => {
  try {
    const { login, password } = req.body; // destructure the username/email and password

    // 2. get the user from db and check if they exist the DB

    const cleanLogin = login.toLowerCase().trim();

    const foundUser = await User.findOne({
      $or: [{ username: cleanLogin }, { email: cleanLogin }],
    });

    if (!foundUser) {
      return res.status(401).json({
        err: "username/email or password incorrect",
      });
    }

    // 3. compare the password they give me vs the password in the DB

    const doesPasswordMatch = bcrypt.compareSync(
      password,
      foundUser.hashedPassword,
    );

    if (!doesPasswordMatch) {
      return res.status(401).json({
        err: "username/email or password incorrect",
      });
    }

    const payload = foundUser.toObject();
    delete payload.hashedPassword;

    // 4. Sign a new JWT token send it back as a response

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: err.message });
  }
});

// GET /auth
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const userObject = user.toObject();

    delete userObject.hashedPassword;
    return res.status(200).json(userObject);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.put("/debug", verifyToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
