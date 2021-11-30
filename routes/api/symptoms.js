const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Symptom = require("../../models/Symptom");
const User = require("../../models/User");

// @route   symptom api/symptoms
// @desc    Create a symptom
// @access  Private

router.post(
  "/",
  auth,
  check("name", "The symptom name is required").notEmpty(),
  check("description", "The symptom description is required").notEmpty(),
  check(
    "effected_parts",
    "The muscle group(s) and/or joint(s) effected are required"
  ).notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        "-password -security_question"
      );

      const { name, effected_parts, description } = req.body;
      const symptomFields = {};
      symptomFields.user = req.user.id;
      symptomFields.name = name;
      symptomFields.description = description;
      symptomFields.effected_parts = effected_parts
        .split(",")
        .map((effected_parts) => effected_parts.trim());

      const symptom = new Symptom(symptomFields);

      await symptom.save();

      res.json(symptom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   symptom api/symptoms/user/:user_id
// @desc    Get symptoms by user id
// @access  Private

router.get("/user/:user_id", auth, async ({ params: { user_id } }, res) => {
  try {
    const symptoms = await Symptom.find({ user: user_id })
      .sort({ date: -1 })
      .populate("user", ["name"]);

    if (symptoms.length === 0) {
      return res.status(400).send("You currently have no recorded symptoms");
    }

    res.json(symptoms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   symptom api/symptoms/user/:user_id
// @desc    Get symptoms by user id
// @access  Private

router.get("/me", auth, async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user.id })
      .sort({ date: -1 })
      .populate("user", ["name"]);

    // Check User
    if (symptoms[0].user._id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    if (symptoms.length === 0) {
      return res.status(400).send("You currently have no recorded symptoms");
    }

    res.json(symptoms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   Get api/symptom/:id
// @desc    Get symptoms by symptom id
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);

    if (!symptom) {
      return res.status(404).json({ msg: "Symptom not found" });
    }

    res.json(symptom);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Symptom not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   Delete api/symptom/:id
// @desc    Delete symptoms by symptom id
// @access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);

    if (!symptom) {
      return res.status(404).json({ msg: "Symptom not found" });
    }

    // Check User
    if (symptom.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await symptom.remove();

    res.json({ msg: "Symptom removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Symptom not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route   symptom api/symptoms/update/:id
// @desc    Update a symptom
// @access  Private

router.post(
  "/update/:id",
  auth,
  check("text", "The text name is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select(
        "-password -security_question"
      );

      const symptom = await Symptom.findById(req.params.id);

      if (symptom.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      const newUpdate = {
        text: req.body.text,
      };

      symptom.updates.unshift(newUpdate);

      await symptom.save();

      res.json(symptom.updates);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   Delete api/symptoms/update/:id/:update_id
// @desc    Delete update
// @access  Private

router.delete("/update/:id/:update_id", auth, async (req, res) => {
  try {
    const symptom = await Symptom.findById(req.params.id);

    // Pull out update
    const update = symptom.updates.find(
      (update) => update.id === req.params.update_id
    );
    // Make sure update exists
    if (!update) {
      return res.status(404).json({ msg: "update does not exist" });
    }
    // Check user
    if (symptom.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    symptom.updates = symptom.updates.filter(
      ({ id }) => id !== req.params.update_id
    );

    await symptom.save();

    return res.json(symptom.updates);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
