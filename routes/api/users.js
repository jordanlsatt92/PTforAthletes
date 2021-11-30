const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
// @route   Post api/users
// @desc    Register user
// @access  Public

router.post(
  "/",
  check("name", "Name is required.").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 8 or more characters"
  ).isLength({ min: 8 }),
  check(
    "security_question",
    "Please enter an answer to the security question"
  ).notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, security_question } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({
        name,
        email,
        password,
        security_question,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      user.security_question = await bcrypt.hash(security_question, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }

    //    res.send("User route");
  }
);

// @route   Put api/users
// @desc    Update user password
// @access  Public

router.put(
  "/",
  check("email", "A valid email is required").notEmpty(),
  check(
    "security_question",
    "Your answer to the security question is required"
  ).notEmpty(),
  check("password", "Enter a password that is at least 8 characters in length").isLength({ min: 8}),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, security_question } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "No account associated with email" }] });
      }

      const isMatch = await bcrypt.compare(security_question, user.security_question);

      if (isMatch) {

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        return res.json({ msg: 'Your password has been changed' });

      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
