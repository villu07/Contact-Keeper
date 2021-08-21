const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator/check");

const User = require("../models/Users");

//@route POST /api/users
//@desc Register a User
//@access Public
router.post(
  "/",
  [
    check("name", "Please add Name").not().isEmpty(),
    check("email", "Please Include Valid Email").isEmail(),
    check(
      "password",
      "Please Enter a Password with 6 or more character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
      }
      user = await User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtScrect"),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Sever Error" });
    }
  }
);

module.exports = router;
