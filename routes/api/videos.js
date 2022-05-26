/**
 * @author Jordan Satterfield
 * @description This file contains the various HTTP requests for 
 * all videos including posting a new video to the database, retrieving
 * all videos, and retrieving a single video.
 */
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Video = require("../../models/Video");

/**
 * @route video api/videos
 * @description Create a video in the database.
 * @access Public
 */
router.post(
  "/",
  check("url", "The youtube url is required.").notEmpty(),
  check("title", "The title of the video is required.").notEmpty(),
  check(
    "related_parts",
    "The related_parts is required (a comma separated list)."
  ).notEmpty(),
  check("description", "The description is required.").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { url, title, related_parts, description } = req.body;
      const videoFields = {}; //{ url, title, related_parts, description};
      videoFields.url = url;
      videoFields.title = title;
      videoFields.related_parts = related_parts
        .split(",")
        .map((related_parts) => related_parts.trim().toLowerCase());
      videoFields.related_parts.sort();
      videoFields.description = description;

      const video = new Video(videoFields);

      await video.save();

      res.json(video);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

/**
 * @route video api/videos
 * @description Get all videos in database
 * @access Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/**
 * @route   video api/videos/:video_id
 * @description    Get video by id
 * @access  Private
*/
router.get(
  "/:id",
  auth,
  async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);

      if (!video) {
        return res.status(404).json({ msg: "Video not found" });
      }

      res.json(video);

    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Video not found" });
      }
      res.status(500).send("Server error");
    }
  }
)

module.exports = router;
