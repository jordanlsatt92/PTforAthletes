/**
 * @author Jordan Satterfield
 * @description Contains routes for user profiles and deletion 
 * of user, symptoms and profile; this is
 * unimplemented on the front end. All requests with "auth" in
 * the request are private; the user must have a valid JSON web
 * token to make the request otherwise it is rejected.
 */
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

/**
 * @route Get api/profile/me
 * @description Get the current user's profile.
 * @access Private
 */
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route Get api/profile
 * @description Create or update user profile.
 * @access Private
 */
router.post(
  "/",
  auth,
  check("activities", "Activities are required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { activities } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (activities) {
      profileFields.activities = activities
        .split(",")
        .map((activities) => activities.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route Get api/profile/user/:user_id
 * @description Get user's profile by user ID
 * @access Private
 */
router.get("/user/:user_id", auth, async ({ params: { user_id}}, res) => {
    try {
        const profile = await Profile.findOne({ user: user_id }).populate('user', ['name']);

        if(!profile) {
            return res.status(400).json({ msg: "Profile not found"});
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found'});
        }
        res.status(500).send('Server Error');      
    }
  }
);

/**
 * @route Delete api/profile
 * @description Delete user profile, user symptoms, and user.
 * @access Private
 */
router.delete('/', auth, async (req, res) => {
    try {
      // Remove user symptoms
      // Remove profile
      // Remove user
      await Promise.all([
//        Symptom.deleteMany({ user: req.user.id }),
        Profile.findOneAndRemove({ user: req.user.id }),
        User.findOneAndRemove({ _id: req.user.id })
      ]);
  
      res.json({ msg: 'User deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
